
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart } from 'lucide-react';
import { ThirtyDaysChart, ThreeMonthsChart } from './ReviewCharts';
import { useReviews } from '@/hooks/useReviews';

// Main component that wraps the chart in a card
const CustomReviewChart = () => {
  const { reviewStats, isLoading } = useReviews();
  
  console.log("Review stats in CustomReviewChart:", reviewStats);
  
  return (
    <Card className="overflow-hidden rounded-2xl border-none shadow-md mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <AreaChart className="h-5 w-5 mr-2 text-[#02B1C4]" />
          <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
            Evolución de reseñas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30days">
          <TabsList className="mb-4">
            <TabsTrigger value="30days">Últimos 30 días</TabsTrigger>
            <TabsTrigger value="3months">Últimos 3 meses</TabsTrigger>
          </TabsList>
          <p className="text-sm text-[#2F2F4C]/70 mb-4">Cantidad de reseñas diarias recibidas</p>
          {isLoading ? (
            <div className="h-[300px] w-full flex items-center justify-center">
              <p>Cargando datos...</p>
            </div>
          ) : (
            <>
              <TabsContent value="30days">
                <div className="h-[300px] w-full relative">
                  {reviewStats.thirtyDays.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      No hay datos disponibles para este período
                    </div>
                  ) : (
                    <ThirtyDaysChart data={reviewStats.thirtyDays} />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="3months">
                <div className="h-[300px] w-full relative">
                  {reviewStats.threeMonths.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      No hay datos disponibles para este período
                    </div>
                  ) : (
                    <ThreeMonthsChart data={reviewStats.threeMonths} />
                  )}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomReviewChart;
