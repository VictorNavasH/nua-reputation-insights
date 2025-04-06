
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
  const [featuredReviews, setFeaturedReviews] = useState<ReviewData[]>([
    {
      id: 1,
      author: 'María García',
      date: '23 Jun 2023',
      text: 'La atención fue excelente y la comida deliciosa. La tecnología de autoservicio es una maravilla, ¡nunca había visto algo así en un restaurante!',
      rating: 5,
      source: 'Google',
      replied: true,
      sentiment: 'positive',
      emoji: '🤩'
    },
    {
      id: 2,
      author: 'Carlos Pérez',
      date: '18 Jun 2023',
      text: 'La fusión de sabores es increíble. El ambiente es muy moderno y agradable. Definitivamente volveré con amigos.',
      rating: 4,
      source: 'TripAdvisor',
      replied: false,
      sentiment: 'positive',
      emoji: '😊'
    },
    {
      id: 3,
      author: 'Laura Sánchez',
      date: '15 Jun 2023',
      text: 'Me encantó el concepto del restaurante. La comida está bien, pero el servicio podría mejorar un poco. Aún así, recomendable.',
      rating: 3,
      source: 'Yelp',
      replied: false,
      sentiment: 'neutral',
      emoji: '🙂'
    }
  ]);
  
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

  // Simulación de carga inicial de datos
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        // Aquí iría la lógica para cargar datos desde API/Supabase
        // Por ahora solo simulamos un delay
        await new Promise(resolve => setTimeout(resolve, 800));
        // Los datos iniciales ya están configurados en los estados
        setIsLoading(false);
      } catch (err) {
        setError('Error loading dashboard data');
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Función para actualizar datos
  const refreshData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Aquí iría la lógica para recargar datos desde API/Supabase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Por ahora solo actualizamos algunos valores aleatorios para simular
      setKpiData(prev => ({
        ...prev,
        monthlyReviews: prev.monthlyReviews + Math.floor(Math.random() * 5),
        comparedToPrevious: {
          ...prev.comparedToPrevious,
          monthlyReviews: { 
            value: 3 + Math.floor(Math.random() * 3), 
            trend: Math.random() > 0.5 ? 'up' : 'down' 
          }
        }
      }));

      setIsLoading(false);
    } catch (err) {
      setError('Error refreshing dashboard data');
      setIsLoading(false);
    }
  };

  // Función para actualizar configuración de API
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
      isLoading,
      error,
      refreshData,
      updateApiConfig
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
