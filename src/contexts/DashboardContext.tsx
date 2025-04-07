import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ReviewData, 
  SentimentData, 
  KpiData, 
  ProgressData, 
  ReviewChartData, 
  GoalData, 
  WordCloudItem, 
  ApiConfig 
} from '../types/dashboard';
import { supabase } from "@/integrations/supabase/client";
import { useReviews } from '@/hooks/useReviews';
import { toast } from '@/components/ui/use-toast';

// Datos de ejemplo para estado inicial
const initialKpiData: KpiData = {
  averageRating: 4.6,
  totalReviews: 32,
  positivePercentage: 78,
  monthlyReviews: 30,
  monthlyTarget: 50,
  comparedToPrevious: {
    averageRating: { value: 0.2, trend: 'up' },
    totalReviews: { value: 12, trend: 'up' },
    positivePercentage: { value: 3, trend: 'up' },
    monthlyReviews: { value: 5, trend: 'down' }
  }
};

const initialSentimentData: SentimentData = {
  positive: 78,
  neutral: 14,
  negative: 8
};

const initialProgressData: ProgressData = {
  current: 32,
  target: 50,
  percentage: 64
};

// Datos de ejemplo para gráficos
const initialChartData: ReviewChartData = {
  thirtyDays: Array.from({ length: 30 }).map((_, i) => ({
    date: `${i + 1} Jun`,
    reviews: Math.floor(Math.random() * 5),
    rating: 4 + Math.random()
  })),
  threeMonths: [
    { date: 'Abril', reviews: 34, rating: 4.3 },
    { date: 'Mayo', reviews: 42, rating: 4.5 },
    { date: 'Junio', reviews: 35, rating: 4.6 }
  ],
  year: [] // Added to match the interface
};

// Interfaz para el contexto
interface DashboardContextType {
  kpiData: KpiData;
  sentimentData: SentimentData;
  progressData: ProgressData;
  chartData: ReviewChartData;
  featuredReviews: ReviewData[];
  goals: GoalData[];
  wordCloudData: WordCloudItem[];
  apiConfigs: ApiConfig[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateApiConfig: (config: ApiConfig) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [kpiData, setKpiData] = useState<KpiData>(initialKpiData);
  const [sentimentData, setSentimentData] = useState<SentimentData>(initialSentimentData);
  const [progressData, setProgressData] = useState<ProgressData>(initialProgressData);
  const [chartData, setChartData] = useState<ReviewChartData>(initialChartData);
  const [featuredReviews, setFeaturedReviews] = useState<ReviewData[]>([]);
  
  const [goals, setGoals] = useState<GoalData[]>([
    {
      id: '1',
      title: 'Reseñas Mensuales',
      description: 'Obtener 50 reseñas este mes',
      current: 32,
      target: 50,
      unit: 'reseñas',
      period: 'monthly',
      category: 'reviews',
      color: '#02B1C4',
      startDate: '',
      dueDate: ''
    },
    {
      id: '2',
      title: 'Media de Valoración',
      description: 'Alcanzar una media de 4.7★ o superior',
      current: 4.6,
      target: 4.7,
      unit: '★',
      period: 'monthly',
      category: 'rating',
      color: '#FFCE85',
      startDate: '',
      dueDate: ''
    },
    {
      id: '3',
      title: 'Respuesta a Reseñas',
      description: 'Responder al 100% de reseñas',
      current: 87,
      target: 100,
      unit: '%',
      period: 'monthly',
      category: 'response',
      color: '#FF4797',
      startDate: '',
      dueDate: ''
    }
  ]);

  const [wordCloudData, setWordCloudData] = useState<WordCloudItem[]>([
    { text: 'Tecnología', value: 64 },
    { text: 'Servicio', value: 43 },
    { text: 'Comida', value: 59 },
    { text: 'Experiencia', value: 29 },
    { text: 'Ambiente', value: 25 },
    { text: 'Innovación', value: 37 },
    { text: 'Precio', value: 20 },
    { text: 'Atención', value: 31 },
    { text: 'Sabor', value: 28 },
    { text: 'Calidad', value: 33 },
    { text: 'Diseño', value: 22 },
    { text: 'Rapidez', value: 17 },
    { text: 'Personal', value: 15 },
    { text: 'Limpieza', value: 12 },
    { text: 'Local', value: 10 }
  ]);
  
  const [apiConfigs, setApiConfigs] = useState<ApiConfig[]>([
    { name: 'Google Reviews', isConnected: false, enabled: false },
    { name: 'TripAdvisor', isConnected: false, enabled: false },
    { name: 'Yelp', isConnected: false, enabled: false },
    { name: 'OpenAI Sentiment Analysis', isConnected: false, enabled: false },
    { name: 'Google NLP', isConnected: false, enabled: false }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { reviews, isLoading: reviewsLoading, error: reviewsError } = useReviews();

  const calculateSentiment = (rating: number): 'positive' | 'neutral' | 'negative' => {
    if (rating >= 4) return 'positive';
    if (rating >= 3) return 'neutral';
    return 'negative';
  };

  const transformReviews = (reviews: any[]): ReviewData[] => {
    return reviews.map(review => ({
      id: review.id,
      author: review.customer || 'Cliente anónimo',
      date: review.date,
      text: review.review || review.reseña || '',
      rating: review.rating || review.puntuacion || 0,
      source: 'Google',
      replied: review.responded || false,
      sentiment: calculateSentiment(review.rating || review.puntuacion || 0),
      emoji: review.rating >= 4 ? '😊' : review.rating >= 3 ? '🙂' : '😕'
    }));
  };

  useEffect(() => {
    if (reviews.length > 0 && !reviewsLoading) {
      const transformedReviews = transformReviews(reviews);
      setFeaturedReviews(transformedReviews.slice(0, 3));
      
      const totalReviews = transformedReviews.length;
      
      const totalRating = transformedReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / totalReviews;
      
      const sentiments = transformedReviews.map(review => calculateSentiment(review.rating));
      const positiveCount = sentiments.filter(s => s === 'positive').length;
      const neutralCount = sentiments.filter(s => s === 'neutral').length;
      const negativeCount = sentiments.filter(s => s === 'negative').length;
      
      const positivePercentage = Math.round((positiveCount / totalReviews) * 100);
      const neutralPercentage = Math.round((neutralCount / totalReviews) * 100);
      const negativePercentage = Math.round((negativeCount / totalReviews) * 100);

      setKpiData(prev => ({
        ...prev,
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews,
        positivePercentage,
        monthlyReviews: totalReviews
      }));
      
      setSentimentData({
        positive: positivePercentage,
        neutral: neutralPercentage,
        negative: negativePercentage
      });
      
      setProgressData(prev => ({
        ...prev,
        current: totalReviews,
        percentage: Math.min(100, Math.round((totalReviews / prev.target) * 100))
      }));
    }
  }, [reviews, reviewsLoading]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
      } catch (err) {
        setError('Error loading dashboard data');
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('reseñas_actuales')
        .select('*')
        .order('fecha', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const transformedReviews = transformReviews(data);
        setFeaturedReviews(transformedReviews.slice(0, 3));
        
        const totalReviews = transformedReviews.length;
        
        const totalRating = transformedReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / totalReviews;
        
        const sentiments = transformedReviews.map(review => calculateSentiment(review.rating));
        const positiveCount = sentiments.filter(s => s === 'positive').length;
        const neutralCount = sentiments.filter(s => s === 'neutral').length;
        const negativeCount = sentiments.filter(s => s === 'negative').length;
        
        const positivePercentage = Math.round((positiveCount / totalReviews) * 100);
        const neutralPercentage = Math.round((neutralCount / totalReviews) * 100);
        const negativePercentage = Math.round((negativeCount / totalReviews) * 100);

        setKpiData(prev => ({
          ...prev,
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalReviews,
          positivePercentage,
          monthlyReviews: totalReviews
        }));
        
        setSentimentData({
          positive: positivePercentage,
          neutral: neutralPercentage,
          negative: negativePercentage
        });
        
        setProgressData(prev => ({
          ...prev,
          current: totalReviews,
          percentage: Math.min(100, Math.round((totalReviews / prev.target) * 100))
        }));
        
        toast({
          title: "Datos actualizados",
          description: `Se han cargado ${data.length} reseñas.`,
        });
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Error refreshing dashboard data');
      toast({
        title: "Error",
        description: "No se pudieron actualizar los datos del dashboard.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const updateApiConfig = (config: ApiConfig) => {
    setApiConfigs(prev => 
      prev.map(c => c.name === config.name ? config : c)
    );
  };

  return (
    <DashboardContext.Provider value={{
      kpiData,
      sentimentData,
      progressData,
      chartData,
      featuredReviews,
      goals,
      wordCloudData,
      apiConfigs,
      isLoading: isLoading || reviewsLoading,
      error: error || reviewsError,
      refreshData,
      updateApiConfig
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
