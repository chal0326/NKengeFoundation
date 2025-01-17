import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

export function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(id: string) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link to="/admin/blog/new">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map(post => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      post.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    to={`/admin/blog/edit/${post.id}`}
                    className="inline-flex items-center justify-center h-8 w-8 text-gray-600 hover:text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => post.id && deletePost(post.id)}
                    className="inline-flex items-center justify-center h-8 w-8 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
} 