
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface GoalSummaryCardsProps {
  filteredGoals: any[];
  calculateCompletionRate: (goals: any[]) => number;
  calculateProgress: (current: number, target: number, inverted?: boolean) => number;
  period: string;
  year: number;
}

const GoalSummaryCards = ({ 
  filteredGoals, 
  calculateCompletionRate,
  calculateProgress,
  period,
  year
}: GoalSummaryCardsProps) => {
  const calculateAverageProgress = () => {
    if (filteredGoals.length === 0) return 0;
    
    return Math.round(filteredGoals.reduce((acc, goal) => 
      acc + calculateProgress(goal.current, goal.target, goal.inverted), 0) / filteredGoals.length);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#F6F9FC] border-none">
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-sm font-medium text-[#2F2F4C]/70">Objetivos en curso</h3>
            <p className="text-2xl font-bold text-[#2F2F4C] mt-1">{filteredGoals.length}</p>
          </div>
          <p className="text-xs text-[#2F2F4C]/50 mt-4">{period} {year}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-[#F6F9FC] border-none">
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-sm font-medium text-[#2F2F4C]/70">Tasa de cumplimiento</h3>
            <p className="text-2xl font-bold text-[#02F2D2] mt-1">{calculateCompletionRate(filteredGoals)}%</p>
          </div>
          <p className="text-xs text-[#2F2F4C]/50 mt-4">
            Basado en {filteredGoals.length} objetivos activos
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-[#F6F9FC] border-none">
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-sm font-medium text-[#2F2F4C]/70">Avance promedio</h3>
            <p className="text-2xl font-bold text-[#FFCB77] mt-1">{calculateAverageProgress()}%</p>
          </div>
          <p className="text-xs text-[#2F2F4C]/50 mt-4">
            Progreso medio de todos los objetivos
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSummaryCards;
