
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, TrendingUp, BarChart3, ChevronUp, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const ReviewsKPI = () => {
  const { kpiData, isLoading } = useDashboard();
  const [showTrends, setShowTrends] = useState({
    averageRating: true,
    totalReviews: true,
    positivePercentage: true,
    monthlyTarget: true
  });
  
  // Función para alternar la visibilidad de la tendencia por tipo
  const toggleTrend = (type: keyof typeof showTrends) => {
    setShowTrends(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  // Función auxiliar para renderizar la tendencia
  const renderTrend = (value: number, trend: 'up' | 'down' | 'stable', isVisible: boolean) => {
    if (!isVisible) return null;
    
    if (trend === 'up') {
      return (
        <div className="flex items-center text-xs text-green-600">
          <ArrowUp size={14} />
          <span className="ml-1">{value}% más que el mes anterior</span>
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center text-xs text-red-500">
          <ArrowDown size={14} />
          <span className="ml-1">{value}% menos que el mes anterior</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-xs text-gray-500">
          <span className="ml-1">Sin cambios respecto al mes anterior</span>
        </div>
      );
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Media de Reseñas */}
      <Card className="overflow-hidden rounded-2xl border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#02F2D2] to-[#02B1C4] pb-2">
          <CardTitle className="text-lg font-medium text-white">Media de Reseñas</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EDF3]">
                <Star className="h-6 w-6 text-[#FFCE85] fill-[#FFCE85]" />
              </div>
              <div>
                <p className="text-sm text-[#2F2F4C]/70">Calificación</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-[#2F2F4C]">{kpiData.averageRating} ⭐</p>
                </div>
              </div>
            </div>
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#b2f7ef] transition-colors"
              onClick={() => toggleTrend('averageRating')}
            >
              {showTrends.averageRating ? (
                <ChevronUp className="h-5 w-5 text-[#02B1C4]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#02B1C4]" />
              )}
            </div>
          </div>
          {renderTrend(
            kpiData.comparedToPrevious.averageRating.value,
            kpiData.comparedToPrevious.averageRating.trend,
            showTrends.averageRating
          )}
        </CardContent>
      </Card>

      {/* Total de Reseñas */}
      <Card className="overflow-hidden rounded-2xl border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#FFCE85] to-[#FFCB77] pb-2">
          <CardTitle className="text-lg font-medium text-white">Total de Reseñas</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EDF3]">
                <MessageSquare className="h-6 w-6 text-[#FFCB77]" />
              </div>
              <div>
                <p className="text-sm text-[#2F2F4C]/70">Este mes</p>
                <p className="text-2xl font-bold text-[#2F2F4C]">
                  {isLoading ? "..." : kpiData.totalReviews}
                </p>
              </div>
            </div>
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#b2f7ef] transition-colors"
              onClick={() => toggleTrend('totalReviews')}
            >
              {showTrends.totalReviews ? (
                <ChevronUp className="h-5 w-5 text-[#FFCB77]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#FFCB77]" />
              )}
            </div>
          </div>
          {renderTrend(
            kpiData.comparedToPrevious.totalReviews.value,
            kpiData.comparedToPrevious.totalReviews.trend,
            showTrends.totalReviews
          )}
        </CardContent>
      </Card>

      {/* Sentimiento Positivo */}
      <Card className="overflow-hidden rounded-2xl border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#02B1C4] to-[#364F6B] pb-2">
          <CardTitle className="text-lg font-medium text-white">Sentimiento Positivo</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EDF3]">
                <TrendingUp className="h-6 w-6 text-[#02B1C4]" />
              </div>
              <div>
                <p className="text-sm text-[#2F2F4C]/70">Porcentaje</p>
                <p className="text-2xl font-bold text-[#2F2F4C]">
                  {isLoading ? "..." : kpiData.positivePercentage}%
                </p>
              </div>
            </div>
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#b2f7ef] transition-colors"
              onClick={() => toggleTrend('positivePercentage')}
            >
              {showTrends.positivePercentage ? (
                <ChevronUp className="h-5 w-5 text-[#02B1C4]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#02B1C4]" />
              )}
            </div>
          </div>
          {renderTrend(
            kpiData.comparedToPrevious.positivePercentage.value,
            kpiData.comparedToPrevious.positivePercentage.trend,
            showTrends.positivePercentage
          )}
        </CardContent>
      </Card>

      {/* Meta Mensual */}
      <Card className="overflow-hidden rounded-2xl border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#FF4797] to-[#FE6D73] pb-2">
          <CardTitle className="text-lg font-medium text-white">Meta Mensual</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EDF3]">
                <BarChart3 className="h-6 w-6 text-[#FF4797]" />
              </div>
              <div>
                <p className="text-sm text-[#2F2F4C]/70">Objetivo</p>
                <p className="text-2xl font-bold text-[#2F2F4C]">{kpiData.monthlyTarget}</p>
              </div>
            </div>
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#b2f7ef] transition-colors"
              onClick={() => toggleTrend('monthlyTarget')}
            >
              {showTrends.monthlyTarget ? (
                <ChevronUp className="h-5 w-5 text-[#FF4797]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#FF4797]" />
              )}
            </div>
          </div>
          {renderTrend(
            kpiData.comparedToPrevious.monthlyReviews.value,
            kpiData.comparedToPrevious.monthlyReviews.trend,
            showTrends.monthlyTarget
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsKPI;
