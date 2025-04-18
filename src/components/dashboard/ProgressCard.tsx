
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDashboard } from '@/contexts/DashboardContext';
import { TrendingUp, AlertCircle } from 'lucide-react';

const ProgressCard = () => {
  const { progressData, isLoading } = useDashboard();
  
  // Determinar el color según el porcentaje de avance
  const getProgressColor = () => {
    if (progressData.percentage < 50) return 'from-[#FE6D73] to-[#FE6D73]/80';
    if (progressData.percentage < 80) return 'from-[#FFCB77] to-[#FFCB77]/80';
    return 'from-[#02F2D2] to-[#02F2D2]/80';
  };
  
  const hasData = progressData.current > 0 || progressData.target > 0;
  
  return (
    <Card className="overflow-hidden rounded-2xl border-none shadow-md bg-white h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-[#02B1C4]" />
          <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
            Progreso hacia el objetivo de este mes
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-[#02B1C4] border-t-transparent rounded-full"></div>
          </div>
        ) : !hasData ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-[#FFCB77] mb-2" />
            <p className="text-[#2F2F4C] font-medium">No hay datos de reseñas disponibles</p>
            <p className="text-[#2F2F4C]/70 text-sm mt-1">
              No se encontraron reseñas en la base de datos
            </p>
          </div>
        ) : (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#2F2F4C]/70">Reseñas obtenidas</span>
              <span className="text-sm font-semibold text-[#2F2F4C]">
                {`${progressData.current}/${progressData.target}`}
              </span>
            </div>
            
            <div className="h-3 bg-[#E8EDF3] rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getProgressColor()} animate-progress-fill`}
                style={{ 
                  width: `${progressData.percentage}%`,
                  "--progress-value": `${progressData.percentage}%` 
                } as React.CSSProperties}
              />
            </div>
            
            <div className="mt-3 flex justify-between items-center text-xs">
              <span className="font-medium text-[#2F2F4C]">{progressData.percentage}% completado</span>
              <span className="font-medium text-[#2F2F4C]/70">
                {progressData.current >= progressData.target 
                  ? "¡Objetivo alcanzado!" 
                  : `Faltan ${progressData.target - progressData.current} reseñas para alcanzar el objetivo`
                }
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
