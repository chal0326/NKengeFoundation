import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, HandHeart, Share2 } from 'lucide-react';

export function GetInvolved() {
  const ways = [
    {
      icon: Heart,
      title: 'Make a Donation',
      description: 'Support our mission with a one-time or recurring donation.',
      action: 'Donate Now',
    },
    {
      icon: HandHeart,
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers making a difference.',
      action: 'Join Us',
    },
    {
      icon: Share2,
      title: 'Spread the Word',
      description: 'Share our mission with your network and help us grow.',
      action: 'Share',
    },
  ];

  return (
    <section id="get-involved" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            There are many ways to support our mission and make a difference. 
            Choose the path that best suits you and join us in creating positive change.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ways.map((way) => (
            <Card key={way.title} className="text-center">
              <CardHeader>
                <way.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>{way.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{way.description}</p>
                <Button className="w-full">{way.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}