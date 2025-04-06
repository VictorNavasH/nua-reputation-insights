import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Star, Circle } from 'lucide-react';
import { ThirtyDaysChart, ThreeMonthsChart } from './ReviewCharts';
import { useReviews } from '@/hooks/useReviews';
import { TimeSeriesPoint } from '@/types/dashboard';

// Main component that wraps the chart in a card
const CustomReviewChart = () => {
  const {
    reviewStats,
    isLoading
  } = useReviews();
  console.log("Review stats in CustomReviewChart:", reviewStats);
  return <Card className="overflow-hidden rounded-2xl border-none shadow-md mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <AreaChart className="h-5 w-5 mr-2 text-[#02B1C4]" />
          <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
            Evolución de reseñas
          </CardTitle>
        </div>
        <div className="flex items-center text-sm text-[#2F2F4C]/70">
          <div className="flex items-center mr-4">
            <Star size={16} className="text-[#FFCE85] fill-[#FFCE85] mr-1" />
            <span>Puntuación media</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#02B1C4] mr-1"></div>
            <span>Número de reseñas</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30days">
          <TabsList className="mb-4">
            <TabsTrigger value="30days">Últimos 30 días</TabsTrigger>
            <TabsTrigger value="3months">Últimos 3 meses</TabsTrigger>
          </TabsList>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm text-[#2F2F4C]/70">
              <Circle className="h-3 w-3 text-[#02B1C4] fill-[#02B1C4] mr-2" />
              <span>
            </span>
            </div>
            {!isLoading && reviewStats.thirtyDays.some(item => item.reviews > 0) && <div className="flex items-center gap-2">
                <Star size={14} className="text-[#FFCE85] fill-[#FFCE85]" />
                <span className="text-sm text-[#2F2F4C]/70">
                  Puntuación media: {calculateAverageRating(reviewStats.thirtyDays)}
                </span>
              </div>}
          </div>
          {isLoading ? <div className="h-[300px] w-full flex items-center justify-center">
              <p>Cargando datos...</p>
            </div> : <>
              <TabsContent value="30days">
                <div className="h-[300px] w-full relative py-2 px-4">
                  {reviewStats.thirtyDays.length === 0 || !reviewStats.thirtyDays.some(item => item.reviews > 0) ? <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      No hay datos disponibles para este período
                    </div> : <ThirtyDaysChart data={reviewStats.thirtyDays} />}
                </div>
              </TabsContent>
              <TabsContent value="3months">
                <div className="h-[300px] w-full relative py-2 px-4">
                  {reviewStats.threeMonths.length === 0 || !reviewStats.threeMonths.some(item => item.reviews > 0) ? <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      No hay datos disponibles para este período
                    </div> : <ThreeMonthsChart data={reviewStats.threeMonths} />}
                </div>
              </TabsContent>
            </>}
        </Tabs>
      </CardContent>
    </Card>;
};

// Helper function to calculate average rating, modified to handle optional rating property
const calculateAverageRating = (data: TimeSeriesPoint[]) => {
  const reviewsWithRatings = data.filter(item => item.reviews > 0 && item.rating !== undefined && item.rating > 0);
  if (reviewsWithRatings.length === 0) return "N/A";
  const totalRating = reviewsWithRatings.reduce((sum, item) => sum + (item.rating || 0), 0);
  const average = totalRating / reviewsWithRatings.length;
  return average.toFixed(1);
};
export default CustomReviewChart;