import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  LogOut,
} from 'lucide-react';

export function DashboardLayout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/blog"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <FileText className="w-5 h-5" />
            Blog Posts
          </Link>
          <Link
            to="/admin/events"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <Calendar className="w-5 h-5" />
            Events
          </Link>
        </nav>

        <div className="absolute bottom-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-800"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 