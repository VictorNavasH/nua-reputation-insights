
import React from 'react';
import { GoalsConfiguration } from '@/components/settings/GoalsConfiguration';
import { RatingGoalConfiguration } from '@/components/settings/RatingGoalConfiguration';

const GoalsTab = () => {
  return (
    <div className="space-y-6">
      <RatingGoalConfiguration />
      <GoalsConfiguration />
    </div>
  );
};

export default GoalsTab;
