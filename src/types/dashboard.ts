
// Tipos comunes para todo el dashboard

export interface ReviewData {
  id: string;
  author: string;
  date: string;
  text: string;
  rating: number;
  source: string;
  replied: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
  emoji?: string;
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface KpiData {
  averageRating: number;
  totalReviews: number;
  monthlyReviews: number;
  positivePercentage: number;
  monthlyTarget: number;
  comparedToPrevious: {
    averageRating: {
      value: number;
      trend: 'up' | 'down' | 'stable';
    };
    totalReviews: {
      value: number;
      trend: 'up' | 'down' | 'stable';
    };
    monthlyReviews: {
      value: number;
      trend: 'up' | 'down' | 'stable';
    };
    positivePercentage: {
      value: number;
      trend: 'up' | 'down' | 'stable';
    };
  };
}

export interface ProgressData {
  current: number;
  target: number;
  percentage: number;
}

export interface TimeSeriesPoint {
  date: string;
  reviews: number;
  rating?: number;
}

export interface ReviewChartData {
  thirtyDays: TimeSeriesPoint[];
  threeMonths: TimeSeriesPoint[];
  year?: TimeSeriesPoint[];
}

export interface GoalData {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category: string;
  color: string;
}

export interface WordCloudItem {
  text: string;
  value: number;
}

export interface ApiConfig {
  name: string;
  enabled: boolean;
  apiKey?: string;
  endpoint?: string;
  lastSync?: string;
}
