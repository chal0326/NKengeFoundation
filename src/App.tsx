import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { Board } from './pages/Board';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Events } from './pages/Events';
import { DashboardLayout } from './pages/DashboardLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { BlogPosts } from './pages/admin/BlogPosts';
import { BlogForm } from './pages/admin/BlogForm';
import { Layout } from './components/Layout';
import { AuthProvider } from './components/AuthProvider';
import { PrivateRoute } from './components/PrivateRoute';
import { Toaster } from './components/ui/toast';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/board" element={<Board />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="blog" element={<BlogPosts />} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/edit/:id" element={<BlogForm />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}
