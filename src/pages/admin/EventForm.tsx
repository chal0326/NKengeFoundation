import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Event } from '@/types';

export function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    location: '',
    image_url: '',
    published: false,
  });

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  async function fetchEvent(eventId: string) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      if (data) setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        const { error } = await supabase
          .from('events')
          .update(event)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('events').insert([event]);
        if (error) throw error;
      }

      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input name="title" value={event.title} onChange={handleChange} required />
      <Textarea name="description" value={event.description || ''} onChange={handleChange} required />
      <Input name="date" type="datetime-local" value={event.date || ''} onChange={handleChange} required />
      <Input name="location" value={event.location || ''} onChange={handleChange} />
      <Input name="image_url" value={event.image_url || ''} onChange={handleChange} />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Event'}
      </Button>
    </form>
  );
}
