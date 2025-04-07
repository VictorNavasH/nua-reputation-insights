
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, TrendingUp } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const RatingGoalCard = () => {
  const { kpiData, isLoading } = useDashboard();
  const currentRating = kpiData.averageRating;
  const targetRating = 4.5; // Objetivo fijo para la puntuación media
  const totalReviews = kpiData.totalReviews;
  
  // Calcular cuántas reseñas de 5 estrellas se necesitan para alcanzar el objetivo
  const calculateReviewsNeeded = () => {
    if (currentRating >= targetRating) return 0;
    
    // Fórmula: (targetRating * (totalReviews + x) - currentRating * totalReviews) / 5 = x
    // Donde x es el número de reseñas de 5 estrellas necesarias
    const reviewsNeeded = Math.ceil(
      (targetRating * totalReviews - currentRating * totalReviews) / 
      (5 - targetRating)
    );
    
    return reviewsNeeded > 0 ? reviewsNeeded : 0;
  };
  
  const reviewsNeeded = calculateReviewsNeeded();
  const percentage = Math.min(100, Math.round((currentRating / targetRating) * 100));
  
  return (
    <Card className="overflow-hidden rounded-2xl border-none shadow-md bg-white h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-[#FF4797]" />
          <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
            Objetivo de Puntuación Media
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#2F2F4C]/70">Puntuación actual</span>
            <div className="flex items-center">
              <span className="text-xl font-bold text-[#2F2F4C] mr-2">
                {isLoading ? "..." : currentRating.toFixed(1)}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={
                      star <= Math.floor(currentRating) 
                        ? "text-[#FFCE85] fill-[#FFCE85]" 
                        : star <= currentRating 
                          ? "text-[#FFCE85] fill-[#FFCE85] opacity-50" 
                          : "text-gray-300"
                    } 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="h-3 bg-[#E8EDF3] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF4797] to-[#FF4797]/80"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="font-medium text-[#2F2F4C]">Objetivo: {targetRating.toFixed(1)}★</span>
            {isLoading ? (
              <span className="text-sm text-[#2F2F4C]/70">Cargando...</span>
            ) : reviewsNeeded > 0 ? (
              <span className="text-sm text-[#2F2F4C]/70">
                Necesitas <span className="font-semibold text-[#FF4797]">{reviewsNeeded}</span> reseñas de 5★ para alcanzar el objetivo
              </span>
            ) : (
              <span className="text-sm font-medium text-[#02F2D2]">
                ¡Objetivo alcanzado!
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingGoalCard;
