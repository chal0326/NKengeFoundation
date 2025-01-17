import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

interface BoardMember {
  id: string;
  name: string;
  role: string;
  image_url?: string;
  bio: string;
  display_order: number;
}

function TruncatedBio({ bio }: { bio: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const shouldTruncate = bio.length > maxLength;
  
  const displayText = isExpanded ? bio : bio.slice(0, maxLength) + (shouldTruncate ? '...' : '');

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-center">{displayText}</p>
      {shouldTruncate && (
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </Button>
      )}
    </div>
  );
}

function BoardMemberSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-6 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  );
}

export function Board() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBoardMembers() {
      try {
        const { data, error } = await supabase
          .from('board_members_with_images')
          .select('*')
          .order('display_order');

        if (error) throw error;

        setBoardMembers(data || []);
      } catch (err) {
        console.error('Error fetching board members:', err);
        setError('Failed to load board members');
      } finally {
        setLoading(false);
      }
    }

    fetchBoardMembers();
  }, []);

  if (error) {
    return (
      <div className="container py-12 text-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Board</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array(6).fill(0).map((_, i) => <BoardMemberSkeleton key={i} />)
        ) : (
          boardMembers.map((member) => (
            <Card key={member.id} className="flex flex-col">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                  {member.image_url ? (
                    <AvatarImage src={member.image_url} alt={member.name} />
                ) : (
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle>{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardHeader>
            <CardContent>
              <TruncatedBio bio={member.bio} />
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
}
