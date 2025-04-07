
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useDashboard } from '@/contexts/DashboardContext';

const SentimentCards = () => {
  const { sentimentData, kpiData } = useDashboard();
  
  // Calculamos la cantidad de reseñas por categoría
  const positiveReviews = Math.round(kpiData.totalReviews * sentimentData.positive / 100);
  const neutralReviews = Math.round(kpiData.totalReviews * sentimentData.neutral / 100);
  const negativeReviews = Math.round(kpiData.totalReviews * sentimentData.negative / 100);
  
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-bold text-[#2F2F4C]">Análisis de Sentimiento</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Tarjeta de Sentimiento Positivo */}
        <Card className="overflow-hidden rounded-2xl border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#02F2D2]/20">
                <span className="text-4xl">👍</span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-[#2F2F4C]">Positivas</h3>
              <p className="text-3xl font-bold text-[#02F2D2]">{sentimentData.positive}%</p>
              <p className="mt-2 text-sm text-[#2F2F4C]/70">{positiveReviews} reseñas</p>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Sentimiento Neutro */}
        <Card className="overflow-hidden rounded-2xl border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFCB77]/20">
                <span className="text-4xl">😐</span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-[#2F2F4C]">Neutras</h3>
              <p className="text-3xl font-bold text-[#FFCB77]">{sentimentData.neutral}%</p>
              <p className="mt-2 text-sm text-[#2F2F4C]/70">{neutralReviews} reseñas</p>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Sentimiento Negativo */}
        <Card className="overflow-hidden rounded-2xl border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FE6D73]/20">
                <span className="text-4xl">👎</span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-[#2F2F4C]">Negativas</h3>
              <p className="text-3xl font-bold text-[#FE6D73]">{sentimentData.negative}%</p>
              <p className="mt-2 text-sm text-[#2F2F4C]/70">{negativeReviews} reseñas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentCards;
