
import React from 'react';
import { Star, ArrowUp, ArrowDown, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ReviewsSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Reseñas</p>
              <h3 className="text-2xl font-bold mt-1 text-nua-navy">143</h3>
            </div>
            <div className="p-2 bg-nua-blue-lighter rounded-full">
              <MessageSquare className="text-nua-blue-light" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <ArrowUp size={14} />
            <span className="ml-1">12% más que el mes anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Media de Puntuación</p>
              <div className="flex items-center mt-1">
                <h3 className="text-2xl font-bold text-nua-navy">4.6</h3>
                <Star className="ml-2 text-yellow-400 fill-yellow-400" size={18} />
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-full">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <ArrowUp size={14} />
            <span className="ml-1">0.2 más que el mes anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reseñas Este Mes</p>
              <h3 className="text-2xl font-bold mt-1 text-nua-navy">30</h3>
            </div>
            <div className="p-2 bg-nua-teal bg-opacity-10 rounded-full">
              <MessageSquare className="text-nua-teal" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-red-500">
            <ArrowDown size={14} />
            <span className="ml-1">5% menos que el mes anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reseñas Positivas</p>
              <h3 className="text-2xl font-bold mt-1 text-nua-navy">78%</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-full">
              <ThumbsUp className="text-green-500" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <ArrowUp size={14} />
            <span className="ml-1">3% más que el mes anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-nua-teal to-nua-blue2 text-white shadow-sm">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <p className="text-sm font-medium text-white text-opacity-90">Acción Rápida</p>
          <Button className="mt-4 bg-white text-nua-navy hover:bg-opacity-90">
            Responder Reseñas
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsSummary;
