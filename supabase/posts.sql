-- Create posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  image_url text,
  published boolean default false,
  user_id uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table posts enable row level security;

-- Create policies
create policy "Public can view published posts" on posts
  for select using (published = true);

create policy "Authenticated users can create posts" on posts
  for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own posts" on posts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own posts" on posts
  for delete using (auth.uid() = user_id);

-- Create function to automatically update updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_posts_updated_at
  before update on posts
  for each row
  execute function handle_updated_at(); 