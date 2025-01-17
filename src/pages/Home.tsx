import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Programs } from '@/components/programs';
import { Impact } from '@/components/impact';
import { GetInvolved } from '@/components/get-involved';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Impact />
      <GetInvolved />
    </>
  );
} 