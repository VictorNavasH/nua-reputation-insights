
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface GoalCardProps {
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  percentage: number;
  color: string;
  inverted?: boolean;
}

const GoalCard = ({ title, description, current, target, unit, percentage, color, inverted }: GoalCardProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold text-nua-navy">
            {title}
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progreso</span>
            <span className="text-sm font-semibold">{current}/{target} {unit}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: color
              }} 
            />
          </div>
        </div>
        <div className="mt-3 text-xs font-medium" style={{ color }}>
          {percentage}% completado
          {inverted && current > target && " (Objetivo no alcanzado)"}
          {inverted && current <= target && " (Objetivo alcanzado)"}
          {!inverted && current >= target && " (Objetivo alcanzado)"}
        </div>
      </CardContent>
    </Card>
  );
};

const GoalsProgress = () => {
  const navigate = useNavigate();
  
  const handleNavigateToGoals = () => {
    navigate('/goals');
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-nua-navy">Objetivos y Progreso</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1"
          onClick={handleNavigateToGoals}
        >
          <Settings size={16} />
          <span className="ml-1 text-xs">Configurar objetivos</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GoalCard
          title="Reseñas Mensuales"
          description="Obtener 50 reseñas este mes"
          current={25}
          target={50}
          unit="reseñas"
          percentage={50}
          color="#02B1C4"
        />
        
        <GoalCard
          title="Media de Valoración"
          description="Alcanzar una media de 4.7★ o superior"
          current={4.6}
          target={4.7}
          unit="★"
          percentage={98}
          color="#FFCE85"
        />
        
        <GoalCard
          title="Respuesta a Reseñas"
          description="Responder al 100% de reseñas"
          current={87}
          target={100}
          unit="%"
          percentage={87}
          color="#FF4797"
        />
        
        <GoalCard
          title="Tiempo de Respuesta"
          description="Mantener tiempo de respuesta bajo 5 horas"
          current={8}
          target={5}
          unit="horas"
          percentage={62}
          color="#17C3B2"
          inverted={true}
        />
      </div>
    </div>
  );
};

export default GoalsProgress;
