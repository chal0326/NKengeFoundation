import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid gap-8 max-w-3xl mx-auto">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="text-sm text-muted-foreground mb-4">
                {post.created_at && (
                  <time>
                    {format(new Date(post.created_at), 'MMMM d, yyyy')}
                  </time>
                )}
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </Card>
        ))}

        {posts.length === 0 && (
          <div className="text-center text-muted-foreground">
            No blog posts available.
          </div>
        )}
      </div>
    </div>
  );
} 