
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, TrendingUp, BarChart3, ChevronUp } from 'lucide-react';

const ReviewsKPI = () => {
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
                <p className="text-2xl font-bold text-[#2F2F4C]">4.6 ⭐</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#E0E5EB] transition-colors">
              <ChevronUp className="h-5 w-5 text-[#02B1C4]" />
            </div>
          </div>
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
                <p className="text-2xl font-bold text-[#2F2F4C]">32</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#E0E5EB] transition-colors">
              <ChevronUp className="h-5 w-5 text-[#FFCB77]" />
            </div>
          </div>
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
                <p className="text-2xl font-bold text-[#2F2F4C]">78%</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#E0E5EB] transition-colors">
              <ChevronUp className="h-5 w-5 text-[#02B1C4]" />
            </div>
          </div>
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
                <p className="text-2xl font-bold text-[#2F2F4C]">50</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF3] cursor-pointer hover:bg-[#E0E5EB] transition-colors">
              <ChevronUp className="h-5 w-5 text-[#FF4797]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsKPI;
