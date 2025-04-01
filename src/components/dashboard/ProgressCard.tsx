
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressCard = () => {
  const totalReviews = 32;
  const goalReviews = 50;
  const percentage = Math.round((totalReviews / goalReviews) * 100);
  
  return (
    <Card className="overflow-hidden rounded-2xl border-none shadow-md bg-white mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
          Progreso objetivo mensual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#2F2F4C]/70">Reseñas obtenidas</span>
            <span className="text-sm font-semibold text-[#2F2F4C]">{totalReviews}/{goalReviews}</span>
          </div>
          
          <div className="h-3 bg-[#E8EDF3] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#02B1C4] to-[#02F2D2] transition-all duration-1000 ease-in-out"
              style={{ 
                width: `${percentage}%`,
                "--progress-value": `${percentage}%` 
              } as React.CSSProperties}
            />
          </div>
          
          <div className="mt-3 flex justify-between items-center text-xs">
            <span className="font-medium text-[#02B1C4]">{percentage}% completado</span>
            <span className="font-medium text-[#2F2F4C]/70">Faltan {goalReviews - totalReviews} reseñas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
