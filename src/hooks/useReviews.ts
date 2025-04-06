
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

export interface ReviewStats {
  date: string;
  reviews: number;
  rating: number;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewStats, setReviewStats] = useState<{
    thirtyDays: ReviewStats[];
    threeMonths: ReviewStats[];
  }>({
    thirtyDays: [],
    threeMonths: []
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
        
        // Generate stats for charts
        generateReviewStats(formattedReviews);
        
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

  // Helper function to generate stats for charts
  const generateReviewStats = (reviews: Review[]) => {
    // Generate last 30 days data
    const thirtyDaysData: ReviewStats[] = [];
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    // Create a map for each day in the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      
      thirtyDaysData.push({
        date: formattedDate,
        reviews: 0,
        rating: 0
      });
    }
    
    // Count reviews for each day
    reviews.forEach(review => {
      try {
        // Extract date parts from the review date
        const reviewDate = new Date(review.date.split(' ')[0]);
        const formattedReviewDate = reviewDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        
        // Find matching day in our prepared array
        const dayIndex = thirtyDaysData.findIndex(day => day.date === formattedReviewDate);
        if (dayIndex !== -1) {
          thirtyDaysData[dayIndex].reviews += 1;
          thirtyDaysData[dayIndex].rating += review.rating;
        }
      } catch (err) {
        console.error('Error processing review date:', err);
      }
    });
    
    // Calculate average ratings
    thirtyDaysData.forEach(day => {
      if (day.reviews > 0) {
        day.rating = parseFloat((day.rating / day.reviews).toFixed(1));
      }
    });
    
    // Generate last 3 months data
    const threeMonthsData: ReviewStats[] = [];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    // Create last 3 months
    for (let i = 2; i >= 0; i--) {
      const monthDate = new Date();
      monthDate.setMonth(now.getMonth() - i);
      
      threeMonthsData.push({
        date: monthNames[monthDate.getMonth()],
        reviews: 0,
        rating: 0
      });
    }
    
    // Count reviews for each month
    reviews.forEach(review => {
      try {
        const reviewDate = new Date(review.date.split(' ')[0]);
        const monthsAgo = (now.getFullYear() - reviewDate.getFullYear()) * 12 + now.getMonth() - reviewDate.getMonth();
        
        if (monthsAgo >= 0 && monthsAgo < 3) {
          const monthIndex = 2 - monthsAgo; // Convert to index in our array
          threeMonthsData[monthIndex].reviews += 1;
          threeMonthsData[monthIndex].rating += review.rating;
        }
      } catch (err) {
        console.error('Error processing review date for monthly stats:', err);
      }
    });
    
    // Calculate average ratings for months
    threeMonthsData.forEach(month => {
      if (month.reviews > 0) {
        month.rating = parseFloat((month.rating / month.reviews).toFixed(1));
      }
    });
    
    setReviewStats({
      thirtyDays: thirtyDaysData,
      threeMonths: threeMonthsData
    });
  };

  return { reviews, isLoading, error, reviewStats };
}
