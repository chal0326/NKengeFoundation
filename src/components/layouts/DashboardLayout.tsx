import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6">
        <div className="flex flex-col h-full">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-6">Admin Dashboard</h2>
            <nav className="space-y-2">
              <Link
                to="/admin"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <Link
                to="/admin/blog"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FileText className="w-5 h-5" />
                Blog Posts
              </Link>
              <Link
                to="/admin/events"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Calendar className="w-5 h-5" />
                Events
              </Link>
            </nav>
          </div>

          <div className="mt-auto">
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Signed in as {user?.email}
              </p>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
} 