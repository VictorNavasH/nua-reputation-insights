
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { formatDate, determineSentiment } from '@/utils/reviewUtils';
import { toast } from 'sonner';
import { TimeSeriesPoint } from '@/types/dashboard';

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
    thirtyDays: TimeSeriesPoint[];
    threeMonths: TimeSeriesPoint[];
    year: TimeSeriesPoint[];
  }>({
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
        
        console.log("Formatted reviews:", formattedReviews);
        
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
    const thirtyDaysData: TimeSeriesPoint[] = [];
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    console.log("Generating stats for 30 days from", thirtyDaysAgo, "to", now);
    
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
    
    console.log("Empty 30 days structure:", thirtyDaysData);
    
    // Count reviews for each day
    reviews.forEach(review => {
      try {
        // Parse the date string to a Date object
        // The format is expected to be like "5 abr 2024" from formatDate function
        console.log("Processing review date:", review.date);
        
        // Extract date parts from the review date
        const dateParts = review.date.split(' ');
        if (dateParts.length >= 3) {
          // Spanish month abbreviations to numbers
          const monthMap: { [key: string]: number } = {
            'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
          };
          
          const day = parseInt(dateParts[0]);
          const month = monthMap[dateParts[1].toLowerCase()];
          const year = parseInt(dateParts[2]);
          
          if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            const reviewDate = new Date(year, month, day);
            console.log("Parsed review date:", reviewDate);
            
            // Check if the date is within the last 30 days
            if (reviewDate >= thirtyDaysAgo && reviewDate <= now) {
              const formattedReviewDate = reviewDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
              console.log("Formatted review date for comparison:", formattedReviewDate);
              
              // Find matching day in our prepared array
              const dayIndex = thirtyDaysData.findIndex(day => day.date === formattedReviewDate);
              console.log("Found at index:", dayIndex);
              
              if (dayIndex !== -1) {
                thirtyDaysData[dayIndex].reviews += 1;
                thirtyDaysData[dayIndex].rating = thirtyDaysData[dayIndex].rating || 0;
                thirtyDaysData[dayIndex].rating += review.rating;
              }
            }
          }
        }
      } catch (err) {
        console.error('Error processing review date:', err, review.date);
      }
    });
    
    // Calculate average ratings
    thirtyDaysData.forEach(day => {
      if (day.reviews > 0) {
        day.rating = parseFloat((day.rating / day.reviews).toFixed(1));
      }
    });
    
    console.log("Final 30 days data:", thirtyDaysData);
    
    // Generate last 3 months data
    const threeMonthsData: TimeSeriesPoint[] = [];
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
        const dateParts = review.date.split(' ');
        if (dateParts.length >= 3) {
          // Spanish month abbreviations to numbers
          const monthMap: { [key: string]: number } = {
            'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
          };
          
          const month = monthMap[dateParts[1].toLowerCase()];
          const year = parseInt(dateParts[2]);
          
          if (month !== undefined && !isNaN(year)) {
            const reviewDate = new Date(year, month, 1);
            const monthsAgo = (now.getFullYear() - reviewDate.getFullYear()) * 12 + now.getMonth() - reviewDate.getMonth();
            
            if (monthsAgo >= 0 && monthsAgo < 3) {
              const monthIndex = 2 - monthsAgo; // Convert to index in our array
              threeMonthsData[monthIndex].reviews += 1;
              threeMonthsData[monthIndex].rating = threeMonthsData[monthIndex].rating || 0;
              threeMonthsData[monthIndex].rating += review.rating;
            }
          }
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
    
    console.log("Three months data:", threeMonthsData);
    
    // Generate yearly data (dummy data for now)
    const yearData: TimeSeriesPoint[] = monthNames.map(month => ({
      date: month,
      reviews: 0,
      rating: 0
    }));
    
    // Populate with actual data where available
    reviews.forEach(review => {
      try {
        const dateParts = review.date.split(' ');
        if (dateParts.length >= 3) {
          const monthMap: { [key: string]: number } = {
            'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
          };
          
          const month = monthMap[dateParts[1].toLowerCase()];
          
          if (month !== undefined) {
            yearData[month].reviews += 1;
            yearData[month].rating = yearData[month].rating || 0;
            yearData[month].rating += review.rating;
          }
        }
      } catch (err) {
        console.error('Error processing review date for yearly stats:', err);
      }
    });
    
    // Calculate average ratings for year
    yearData.forEach(month => {
      if (month.reviews > 0) {
        month.rating = parseFloat((month.rating / month.reviews).toFixed(1));
      }
    });
    
    console.log("Year data:", yearData);
    
    setReviewStats({
      thirtyDays: thirtyDaysData,
      threeMonths: threeMonthsData,
      year: yearData
    });
  };

  return { reviews, isLoading, error, reviewStats };
}
