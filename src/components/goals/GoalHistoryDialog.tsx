
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface HistorySummaryItem {
  year: number;
  quarter: string;
  goalsCompleted: number;
  totalGoals: number;
}

interface GoalHistoryDialogProps {
  historicalSummary: HistorySummaryItem[];
  onClose: () => void;
}

const GoalHistoryDialog = ({ historicalSummary, onClose }: GoalHistoryDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Histórico de Objetivos</DialogTitle>
        <DialogDescription>
          Historial de cumplimiento de objetivos por año y trimestre
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left text-sm font-medium">Año</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Trimestre</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Objetivos</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Cumplimiento</th>
              </tr>
            </thead>
            <tbody>
              {historicalSummary.map((period, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3 text-sm">{period.year}</td>
                  <td className="px-4 py-3 text-sm">{period.quarter}</td>
                  <td className="px-4 py-3 text-center text-sm">{period.goalsCompleted}/{period.totalGoals}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      (period.goalsCompleted / period.totalGoals) >= 0.75
                        ? 'bg-green-100 text-green-800'
                        : (period.goalsCompleted / period.totalGoals) >= 0.5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {Math.round((period.goalsCompleted / period.totalGoals) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="outline">
          Exportar datos
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default GoalHistoryDialog;
