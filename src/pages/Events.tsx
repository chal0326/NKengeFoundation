import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string | null;
  image_url: string | null;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('published', true)
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden">
            {event.image_url && (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <div className="text-sm text-muted-foreground mb-4">
                <div>{format(new Date(event.date), 'MMMM d, yyyy h:mm a')}</div>
                {event.location && <div>{event.location}</div>}
              </div>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </Card>
        ))}

        {events.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No upcoming events at this time.
          </div>
        )}
      </div>
    </div>
  );
} 