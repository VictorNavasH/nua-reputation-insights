
import React from 'react';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoalCard from './GoalCard';

interface GoalsListProps {
  goals: any[];
  onEditGoal: (goal: any) => void;
  onDuplicateGoal: (goal: any) => void;
  onAddNewGoal: () => void;
  selectedMonth?: string;
  selectedQuarter?: string;
  selectedYear: number;
}

const GoalsList = ({ 
  goals, 
  onEditGoal, 
  onDuplicateGoal, 
  onAddNewGoal,
  selectedMonth,
  selectedQuarter,
  selectedYear
}: GoalsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {goals.length > 0 ? (
        goals.map(goal => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onEdit={onEditGoal} 
            onDuplicate={onDuplicateGoal} 
          />
        ))
      ) : (
        <div className="text-center py-10">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-500 mb-1">
            No hay objetivos para {selectedMonth || selectedQuarter} {selectedYear}
          </h3>
          <p className="text-gray-400 mb-4">Crea nuevos objetivos para empezar a hacer seguimiento</p>
          <Button onClick={onAddNewGoal}>Crear objetivo</Button>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
