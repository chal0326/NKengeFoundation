import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookmarkIcon, 
  HomeIcon, 
  HeartIcon,
  PersonIcon
} from '@radix-ui/react-icons';

export function Programs() {
  const programs = [
    {
      icon: BookmarkIcon,
      title: 'Scholarship Program',
      description: 'Supporting promising students with educational opportunities through comprehensive scholarships.',
    },
    {
      icon: PersonIcon,
      title: 'Literacy Initiative',
      description: 'Promoting literacy and learning through community libraries and educational resources.',
    },
    {
      icon: HomeIcon,
      title: 'Community Centers',
      description: 'Building and maintaining spaces for learning, gathering, and community development.',
    },
    {
      icon: HeartIcon,
      title: 'Mentorship Program',
      description: 'Connecting youth with mentors to guide their personal and professional development.',
    },
  ];

  return (
    <section id="programs" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Through our diverse programs, we create lasting impact in communities by 
            focusing on education, development, and sustainable growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <Card key={program.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <program.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}