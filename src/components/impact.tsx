import { Card, CardContent } from '@/components/ui/card';
import { 
  PersonIcon, 
  BookmarkIcon, 
  HomeIcon, 
  StarIcon 
} from '@radix-ui/react-icons';

export function Impact() {
  const stats = [
    {
      icon: PersonIcon,
      number: '10,000+',
      label: 'Lives Impacted',
    },
    {
      icon: BookmarkIcon,
      number: '1,000+',
      label: 'Scholarships Awarded',
    },
    {
      icon: HomeIcon,
      number: '15',
      label: 'Community Centers',
    },
    {
      icon: StarIcon,
      number: '95%',
      label: 'Program Success Rate',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
          The N'Kenge Foundation has made a meaningful impact through its initiatives that amplify untold stories and uplift communities. With productions like "Dorothy Dandridge! The Musical," they bring inspiring narratives to both stage and screen. Their educational programs offer workshops, mentorship, and internships to cultivate the next generation of artists. In partnership with Healing Tree, they implement community-focused mental health programs that use the arts as a tool for therapy and empowerment, while expanding their reach across various media to ensure these important stories are shared with diverse audiences.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-transparent border-primary-foreground/20">
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}