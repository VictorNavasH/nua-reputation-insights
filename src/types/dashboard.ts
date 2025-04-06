
// Define interfaces for reusable data structures across dashboard components

export interface TimeSeriesPoint {
  date: string;
  reviews: number;
  rating?: number;
}

export interface SentimentDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface RatingDistribution {
  [key: number]: number; // Map from rating (1-5) to count
}

export interface DashboardStats {
  averageRating: number;
  totalReviews: number;
  recentReviews: number;
  reviewsGrowth: number;
  sentimentDistribution: SentimentDistribution;
  ratingDistribution: RatingDistribution;
  timeSeriesData: {
    thirtyDays: TimeSeriesPoint[];
    threeMonths: TimeSeriesPoint[];
    year: TimeSeriesPoint[];
  };
}

export interface ReviewData {
  id: string | number;
  author: string;
  date: string;
  text: string;
  rating: number;
  emoji?: string;
  source: string;
  replied?: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface KpiData {
  averageRating: number;
  totalReviews: number;
  positivePercentage: number;
  monthlyReviews: number; // Added to match usage
  monthlyTarget: number;
  comparedToPrevious: {
    averageRating: { value: number; trend: 'up' | 'down' | 'stable' };
    totalReviews: { value: number; trend: 'up' | 'down' | 'stable' };
    positivePercentage: { value: number; trend: 'up' | 'down' | 'stable' };
    monthlyReviews: { value: number; trend: 'up' | 'down' | 'stable' };
  };
}

export interface ProgressData {
  current: number;
  target: number;
  percentage: number;
  color?: string;
  label?: string;
  currentValue?: number;
  targetValue?: number;
}

export interface ReviewChartData {
  thirtyDays: TimeSeriesPoint[];
  threeMonths: TimeSeriesPoint[];
  year: TimeSeriesPoint[];
}

export interface GoalData {
  id: string;
  title: string;
  description?: string; // Adding this property as it's used in context
  category: string;
  target: number;
  current: number;
  unit: string;
  dueDate: string;
  startDate: string;
  status?: 'in-progress' | 'completed' | 'at-risk';
  period?: string;
  color?: string;
}

export interface WordCloudItem {
  text: string;
  value: number;
}

export interface ApiConfig {
  name: string;
  isConnected: boolean;
  enabled?: boolean; // Added to match usage
  apiKey?: string; // Added to match usage
  endpoint?: string; // Added to match usage
  lastSync?: string;
}
