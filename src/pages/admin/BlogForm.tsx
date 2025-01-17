import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostInsert } from '@/types';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostInsert>({
    title: '',
    content: '',
    image_url: null,
    published: false,
    user_id: null,
  });

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  async function fetchPost(postId: string) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      if (data) setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        const { error } = await supabase
          .from('posts')
          .update(post)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('posts').insert([post]);
        if (error) throw error;
      }

      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  }

  function handlePublishedChange(checked: boolean) {
    setPost(prev => ({ ...prev, published: checked }));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {id ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            name="image_url"
            value={post.image_url || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={post.published}
            onCheckedChange={handlePublishedChange}
          />
          <Label htmlFor="published">Published</Label>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
} 