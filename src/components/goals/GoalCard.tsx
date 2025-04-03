
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Copy } from 'lucide-react';

interface GoalCardProps {
  goal: {
    id: number;
    title: string;
    description: string;
    current: number;
    target: number;
    unit: string;
    icon: React.ReactNode;
    month: string;
    year: number;
    inverted?: boolean;
  };
  onEdit: (goal: any) => void;
  onDuplicate: (goal: any) => void;
}

const GoalCard = ({ goal, onEdit, onDuplicate }: GoalCardProps) => {
  const calculateProgress = (current: number, target: number, inverted = false) => {
    if (inverted) {
      // For inverted metrics (where lower is better)
      return Math.max(0, Math.min(100, target / current * 100));
    }
    return Math.max(0, Math.min(100, current / target * 100));
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-[#FE6D73] to-[#FE6D73]/80';
    if (percentage < 80) return 'from-[#FFCB77] to-[#FFCB77]/80';
    return 'from-[#02F2D2] to-[#02F2D2]/80';
  };

  const progressPercentage = calculateProgress(goal.current, goal.target, goal.inverted);
  const progressColor = getProgressColor(progressPercentage);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full mr-3 bg-pink-100">
              {goal.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#2F2F4C]">{goal.title}</h3>
              <p className="text-sm text-gray-500">{goal.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => onEdit(goal)}>
              <Edit size={16} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDuplicate(goal)}>
              <Copy size={16} />
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#2F2F4C]/70">Progreso actual</span>
            <span className="text-sm font-semibold text-[#2F2F4C]">
              {goal.current}/{goal.target} {goal.unit}
            </span>
          </div>
          <div className="h-3 bg-[#E8EDF3] rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${progressColor}`} style={{
              width: `${progressPercentage}%`
            }} />
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="font-medium text-[#2F2F4C]">{Math.round(progressPercentage)}% completado</span>
            {goal.inverted ? (
              <span className="text-[#2F2F4C]/70">
                {goal.current > goal.target ? 
                  `${Math.abs(goal.current - goal.target)} ${goal.unit} por encima del objetivo` : 
                  `Objetivo alcanzado`}
              </span>
            ) : (
              <span className="text-[#2F2F4C]/70">
                {goal.current < goal.target ? 
                  `Faltan ${goal.target - goal.current} ${goal.unit}` : 
                  `Objetivo alcanzado`}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
