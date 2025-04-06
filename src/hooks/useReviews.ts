
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { formatDate, determineSentiment } from '@/utils/reviewUtils';
import { toast } from 'sonner';

export interface Review {
  id: number;
  UUID: string;
  customer: string;
  date: string;
  rating: number;
  review: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  responded: boolean;
  profile_url?: string;
  photo?: string;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('reseñas_actuales')
          .select('*')
          .order('fecha', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Transform the data to match the Review interface
        const formattedReviews = data.map((item, index) => ({
          id: index + 1,
          UUID: item.UUID || '',
          customer: item.nombre || 'Cliente anónimo',
          date: formatDate(item.fecha),
          rating: item.puntuacion || 0,
          review: item.reseña || '',
          sentiment: determineSentiment(item.puntuacion || 0),
          responded: false, // Could have a column for this in the future
          profile_url: item.url_perfil || '',
          photo: item.foto_autor || '',
        }));
        
        setReviews(formattedReviews);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setError('No se pudieron cargar las reseñas. Por favor, inténtelo de nuevo.');
        toast.error('Error al cargar reseñas');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  return { reviews, isLoading, error };
}
