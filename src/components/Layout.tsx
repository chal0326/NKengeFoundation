import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

export function Layout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="nkenge-theme">
      <div className="min-h-screen bg-background dark:bg-dark">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
} 