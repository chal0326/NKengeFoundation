import { Card, CardContent } from '@/components/ui/card';
import { BookmarkIcon, HeartIcon, PersonIcon } from '@radix-ui/react-icons';

export function About() {
  const values = [
    {
      icon: BookmarkIcon,
      title: 'Education First',
      description: 'We believe education is the key to breaking cycles of poverty and creating lasting change.',
    },
    {
      icon: PersonIcon,
      title: 'Community-Driven',
      description: 'Our initiatives are developed with and for the communities we serve.',
    },
    {
      icon: HeartIcon,
      title: 'Sustainable Impact',
      description: 'We focus on creating long-term solutions that empower communities to thrive.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
          Our mission is to educate, mentor, inspire, and uplift through the arts by magnifying BIPOC stories in educational initiatives as well as community engagement programs focused on mental health and healing through the arts. We want to ensure that these powerful narratives are assessable through all multimedia efforts. This is a great space to share the impact of our work in the community and how we strive to make a difference through various artistic initiatives. We believe in the transformative power of the arts and are dedicated to creating opportunities for individuals to express themselves creatively.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card key={value.title} className="border-none">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <value.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
