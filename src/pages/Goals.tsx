
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Clock, 
  Heart, 
  ThumbsUp, 
  MessageSquare, 
  Star, 
  Edit, 
  Copy, 
  Plus, 
  Save, 
  X 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for goals
const defaultGoals = [
  {
    id: 1,
    title: 'Reseñas mensuales',
    description: 'Número total de reseñas a conseguir este mes',
    current: 32,
    target: 50,
    unit: 'reseñas',
    icon: <MessageSquare className="h-5 w-5" />,
    month: 'junio'
  },
  {
    id: 2,
    title: 'Sentimiento positivo',
    description: 'Porcentaje de reseñas positivas',
    current: 78,
    target: 85,
    unit: '%',
    icon: <ThumbsUp className="h-5 w-5" />,
    month: 'junio'
  },
  {
    id: 3,
    title: 'Puntuación media',
    description: 'Calificación media de las reseñas',
    current: 4.6,
    target: 4.8,
    unit: 'estrellas',
    icon: <Star className="h-5 w-5" />,
    month: 'junio'
  },
  {
    id: 4,
    title: 'Tiempo de respuesta',
    description: 'Tiempo medio para responder a las reseñas',
    current: 8,
    target: 5,
    unit: 'horas',
    icon: <Clock className="h-5 w-5" />,
    month: 'junio',
    inverted: true // Lower is better for this goal
  }
];

const Goals = () => {
  const [month, setMonth] = useState('junio');
  const [goals, setGoals] = useState(defaultGoals);
  const [editingGoal, setEditingGoal] = useState<null | any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle edit goal
  const handleEditGoal = (goal: any) => {
    setEditingGoal({ ...goal });
    setIsDialogOpen(true);
  };

  // Handle save edited goal
  const handleSaveGoal = () => {
    if (editingGoal) {
      if (editingGoal.id) {
        // Update existing goal
        setGoals(goals.map(g => g.id === editingGoal.id ? editingGoal : g));
      } else {
        // Add new goal
        const newGoal = {
          ...editingGoal,
          id: Math.max(...goals.map(g => g.id)) + 1,
          month
        };
        setGoals([...goals, newGoal]);
      }
      setIsDialogOpen(false);
      setEditingGoal(null);
    }
  };

  // Handle duplicate goal
  const handleDuplicateGoal = (goal: any) => {
    const newGoal = {
      ...goal,
      id: Math.max(...goals.map(g => g.id)) + 1,
      title: `${goal.title} (Copia)`,
      month: month === 'junio' ? 'julio' : 'junio' // Duplicate to the other month
    };
    setGoals([...goals, newGoal]);
  };

  // Add new goal
  const handleAddNewGoal = () => {
    setEditingGoal({
      title: '',
      description: '',
      current: 0,
      target: 0,
      unit: '',
      icon: <Target className="h-5 w-5" />,
      month
    });
    setIsDialogOpen(true);
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number, inverted = false) => {
    if (inverted) {
      // For inverted metrics (where lower is better)
      return Math.max(0, Math.min(100, ((target / current) * 100)));
    }
    return Math.max(0, Math.min(100, ((current / target) * 100)));
  };

  // Get the progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-[#FE6D73] to-[#FE6D73]/80';
    if (percentage < 80) return 'from-[#FFCB77] to-[#FFCB77]/80';
    return 'from-[#02F2D2] to-[#02F2D2]/80';
  };

  // Filter goals by selected month
  const filteredGoals = goals.filter(goal => goal.month === month);

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Objetivos y Metas</h1>
            <Button onClick={handleAddNewGoal} className="gap-2">
              <Plus size={16} />
              Nuevo objetivo
            </Button>
          </div>
          
          <Tabs defaultValue="junio" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="junio" onClick={() => setMonth('junio')}>Junio 2023</TabsTrigger>
              <TabsTrigger value="julio" onClick={() => setMonth('julio')}>Julio 2023</TabsTrigger>
            </TabsList>
            
            <TabsContent value={month}>
              <div className="grid grid-cols-1 gap-6">
                {filteredGoals.map((goal) => {
                  const progressPercentage = calculateProgress(goal.current, goal.target, goal.inverted);
                  const progressColor = getProgressColor(progressPercentage);
                  
                  return (
                    <Card key={goal.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EDF3] mr-3">
                              {goal.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-[#2F2F4C]">{goal.title}</h3>
                              <p className="text-sm text-gray-500">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditGoal(goal)}>
                              <Edit size={16} />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDuplicateGoal(goal)}>
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
                            <div 
                              className={`h-full bg-gradient-to-r ${progressColor}`}
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <div className="mt-2 flex justify-between text-xs">
                            <span className="font-medium text-[#2F2F4C]">{Math.round(progressPercentage)}% completado</span>
                            {goal.inverted ? (
                              <span className="text-[#2F2F4C]/70">
                                {goal.current > goal.target 
                                  ? `${Math.abs(goal.current - goal.target)} ${goal.unit} por encima del objetivo`
                                  : `Objetivo alcanzado`}
                              </span>
                            ) : (
                              <span className="text-[#2F2F4C]/70">
                                {goal.current < goal.target 
                                  ? `Faltan ${goal.target - goal.current} ${goal.unit}`
                                  : `Objetivo alcanzado`}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {filteredGoals.length === 0 && (
                  <div className="text-center py-10">
                    <Target className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-500 mb-1">No hay objetivos para este mes</h3>
                    <p className="text-gray-400 mb-4">Crea nuevos objetivos para empezar a hacer seguimiento</p>
                    <Button onClick={handleAddNewGoal}>Crear objetivo</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Edit Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingGoal?.id ? 'Editar objetivo' : 'Nuevo objetivo'}</DialogTitle>
            <DialogDescription>
              {editingGoal?.id 
                ? 'Modifica los detalles del objetivo existente.'
                : 'Crea un nuevo objetivo para hacer seguimiento.'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título del objetivo</Label>
              <Input
                id="title"
                value={editingGoal?.title || ''}
                onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                placeholder="Ej: Reseñas mensuales"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={editingGoal?.description || ''}
                onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
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
                  onChange={(e) => setEditingGoal({ ...editingGoal, current: parseFloat(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Valor objetivo</Label>
                <Input
                  id="target"
                  type="number"
                  value={editingGoal?.target || 0}
                  onChange={(e) => setEditingGoal({ ...editingGoal, target: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unidad de medida</Label>
              <Input
                id="unit"
                value={editingGoal?.unit || ''}
                onChange={(e) => setEditingGoal({ ...editingGoal, unit: e.target.value })}
                placeholder="Ej: reseñas, %, estrellas"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="inverted">
                <input 
                  type="checkbox"
                  id="inverted"
                  checked={editingGoal?.inverted || false}
                  onChange={(e) => setEditingGoal({ ...editingGoal, inverted: e.target.checked })}
                  className="mr-2"
                />
                Métrica invertida (valores más bajos son mejores)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveGoal}>
              {editingGoal?.id ? 'Guardar cambios' : 'Crear objetivo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Goals;
