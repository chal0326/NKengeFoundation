-- Create events table
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  date timestamp with time zone not null,
  location text,
  image_url text,
  published boolean default false,
  user_id uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table events enable row level security;

-- Create policies
create policy "Public can view published events" on events
  for select using (published = true);

create policy "Authenticated users can create events" on events
  for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own events" on events
  for update using (auth.uid() = user_id);

create policy "Users can delete their own events" on events
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
create trigger handle_events_updated_at
  before update on events
  for each row
  execute function handle_updated_at(); 