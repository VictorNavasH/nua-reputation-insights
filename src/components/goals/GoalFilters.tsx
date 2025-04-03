
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GoalFiltersProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  availableYears: number[];
}

const GoalFilters = ({ 
  selectedPeriod, 
  setSelectedPeriod, 
  selectedYear, 
  setSelectedYear,
  availableYears
}: GoalFiltersProps) => {
  return (
    <div className="flex items-center gap-4">
      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Periodo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Mensual</SelectItem>
          <SelectItem value="quarterly">Trimestral</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={String(selectedYear)} onValueChange={(year) => setSelectedYear(Number(year))}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Año" />
        </SelectTrigger>
        <SelectContent>
          {availableYears.map((year) => (
            <SelectItem key={year} value={String(year)}>{year}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GoalFilters;
