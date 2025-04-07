
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';
import { Review, ReviewStatsTimeSeries } from '@/types/reviews';
import { generateReviewStats } from '@/utils/reviewStatsGenerator';

// Use 'export type' to re-export the type correctly with isolatedModules enabled
export type { Review } from '@/types/reviews';

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewStats, setReviewStats] = useState<ReviewStatsTimeSeries>({
    thirtyDays: [],
    threeMonths: [],
    year: []
  });

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
        
        console.log("Raw data from Supabase:", data);
        
        // Transform the data to match the Review interface
        const formattedReviews = data.map((item: any, index: number) => ({
          id: item.UUID || index + 1,
          UUID: item.UUID || '',
          customer: item.nombre || 'Cliente anónimo',
          date: item.fecha ? new Date(item.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : '',
          rating: item.puntuacion || 0,
          review: item.reseña || '',
          sentiment: determineSentiment(item.puntuacion || 0),
          responded: false, // Podemos actualizarlo en el futuro
          profile_url: item.url_perfil || '',
          photo: item.foto_autor || '',
          idioma: item.idioma || 'es',
          traducida: item.traducida === 'true',
          reseña_traducida: item.reseña_traducida || ''
        }));
        
        console.log("Formatted reviews:", formattedReviews);
        
        // Generate stats for charts
        const stats = generateReviewStats(formattedReviews);
        setReviewStats(stats);
        
        setReviews(formattedReviews);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setError('No se pudieron cargar las reseñas. Por favor, inténtelo de nuevo.');
        toast({
          title: "Error",
          description: "Error al cargar las reseñas de Google"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  // Determinar sentimiento basado en puntuación
  const determineSentiment = (rating: number): 'positive' | 'neutral' | 'negative' => {
    if (rating >= 4) return 'positive';
    if (rating >= 3) return 'neutral';
    return 'negative';
  };

  return { reviews, isLoading, error, reviewStats };
}
