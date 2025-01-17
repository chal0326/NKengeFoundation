import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
          alt="Children learning"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="container relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Communities Through Education
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            The Nkenge Foundation is dedicated to transforming lives through educational opportunities, community development, and sustainable initiatives.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold"
              asChild
            >
              <Link to="/programs">Our Programs</Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold"
              asChild
            >
              <Link to="/get-involved">Make a Donation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}