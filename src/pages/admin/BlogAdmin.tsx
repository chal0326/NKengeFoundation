import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const { user, signOut } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      let imageUrl;
      if (image) {
        imageUrl = await api.uploadImage(image);
      }

      await api.createPost({
        title: values.title,
        content: values.content,
        image_url: imageUrl,
      });

      form.reset();
      setImage(null);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.deletePost(id);
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            Logged in as {user?.email}
          </span>
          <Button
            variant="outline"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[200px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </FormControl>
              </FormItem>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Create Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <time className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.content}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 