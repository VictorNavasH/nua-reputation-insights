
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
  idioma?: string;
  traducida?: boolean;
  reseña_traducida?: string;
}

export interface ReviewStats {
  date: string;
  reviews: number;
  rating: number;
}

export interface ReviewStatsTimeSeries {
  thirtyDays: TimeSeriesPoint[];
  threeMonths: TimeSeriesPoint[];
  year: TimeSeriesPoint[];
}
