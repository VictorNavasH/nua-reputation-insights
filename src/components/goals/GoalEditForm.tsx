
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from '@/components/ui/dialog';

interface GoalEditFormProps {
  editingGoal: any;
  setEditingGoal: (goal: any) => void;
  onSave: () => void;
  onCancel: () => void;
  months: string[];
  availableYears: number[];
}

const GoalEditForm = ({ 
  editingGoal, 
  setEditingGoal, 
  onSave, 
  onCancel,
  months,
  availableYears
}: GoalEditFormProps) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Título del objetivo</Label>
          <Input 
            id="title" 
            value={editingGoal?.title || ''} 
            onChange={e => setEditingGoal({
              ...editingGoal,
              title: e.target.value
            })} 
            placeholder="Ej: Reseñas mensuales" 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Input 
            id="description" 
            value={editingGoal?.description || ''} 
            onChange={e => setEditingGoal({
              ...editingGoal,
              description: e.target.value
            })} 
            placeholder="Ej: Número total de reseñas a conseguir este mes" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current">Valor actual</Label>
            <Input 
              id="current" 
              type="number" 
              value={editingGoal?.current || 0} 
              onChange={e => setEditingGoal({
                ...editingGoal,
                current: parseFloat(e.target.value)
              })} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="target">Valor objetivo</Label>
            <Input 
              id="target" 
              type="number" 
              value={editingGoal?.target || 0} 
              onChange={e => setEditingGoal({
                ...editingGoal,
                target: parseFloat(e.target.value)
              })} 
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="unit">Unidad de medida</Label>
          <Input 
            id="unit" 
            value={editingGoal?.unit || ''} 
            onChange={e => setEditingGoal({
              ...editingGoal,
              unit: e.target.value
            })} 
            placeholder="Ej: reseñas, %, estrellas" 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="period">Periodo</Label>
          <Select
            value={editingGoal?.month || ''}
            onValueChange={(value) => setEditingGoal({...editingGoal, month: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Año</Label>
          <Select
            value={String(editingGoal?.year || '')}
            onValueChange={(value) => setEditingGoal({...editingGoal, year: Number(value)})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="inverted">
            <input 
              type="checkbox" 
              id="inverted" 
              checked={editingGoal?.inverted || false} 
              onChange={e => setEditingGoal({
                ...editingGoal,
                inverted: e.target.checked
              })} 
              className="mr-2" 
            />
            Métrica invertida (valores más bajos son mejores)
          </Label>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave}>
          {editingGoal?.id ? 'Guardar cambios' : 'Crear objetivo'}
        </Button>
      </DialogFooter>
    </>
  );
};

export default GoalEditForm;
