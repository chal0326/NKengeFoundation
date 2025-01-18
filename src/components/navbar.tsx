import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon, DiscIcon } from '@radix-ui/react-icons';
import { useAuth } from '@/lib/auth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/Blog' },
    { title: 'Events', href: '/Events'},
    { title: 'Programs', href: '/programs' },
    { title: 'Impact', href: '/impact' },
    { title: 'Board', href: '/board' },
    { title: 'Get Involved', href: '/get-involved' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <DiscIcon className="h-6 w-6 text-primary" />
            <span className="text-xl text-primary font-bold">N'KENGE FOUNDATION</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href ? 'text-primary' : ''
              }`}
            >
              {item.title}
            </Link>
          ))}
          {user ? (
            <Link to="/admin/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Admin Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
          )}
          <Button asChild>
            <Link to="/get-involved">Donate Now</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary hover:bg-primary/10"
            >
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              {user ? (
                <Link to="/admin/dashboard" className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/login" className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
              <Button asChild className="mt-4">
                <Link to="/get-involved" onClick={() => setIsOpen(false)}>
                  Donate Now
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
