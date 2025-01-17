import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  totalPosts: number;
  totalEvents: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [postsCount] = await Promise.all([
          supabase.from('posts').select('id', { count: 'exact' }),
          // We'll add events count when we create the events table
        ]);

        setStats({
          totalPosts: postsCount.count || 0,
          totalEvents: 0, // We'll update this when we add events
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.totalPosts}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.totalEvents}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-medium mb-2">Create New Blog Post</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Write and publish a new blog post to share updates with your audience.
            </p>
            <a
              href="/admin/blog/new"
              className="text-sm text-blue-600 hover:underline"
            >
              Create Post →
            </a>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-2">Schedule Event</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add a new event to your calendar and manage registrations.
            </p>
            <a
              href="/admin/events/new"
              className="text-sm text-blue-600 hover:underline"
            >
              Add Event →
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
} 