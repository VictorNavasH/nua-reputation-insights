
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
