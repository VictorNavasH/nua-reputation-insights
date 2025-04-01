
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, 
  MessageSquare, 
  ThumbsUp, 
  Star, 
  Clock, 
  Heart, 
  Plus, 
  Edit, 
  Trash2,
  Copy
} from 'lucide-react';

// Mock data for goals templates
const goalTemplates = [
  {
    id: 1,
    title: 'Reseñas mensuales',
    description: 'Número total de reseñas a conseguir este mes',
    target: 50,
    unit: 'reseñas',
    icon: <MessageSquare className="h-5 w-5" />,
    category: 'essential'
  },
  {
    id: 2,
    title: 'Sentimiento positivo',
    description: 'Porcentaje de reseñas positivas',
    target: 85,
    unit: '%',
    icon: <ThumbsUp className="h-5 w-5" />,
    category: 'essential'
  },
  {
    id: 3,
    title: 'Puntuación media',
    description: 'Calificación media de las reseñas',
    target: 4.8,
    unit: 'estrellas',
    icon: <Star className="h-5 w-5" />,
    category: 'essential'
  },
  {
    id: 4,
    title: 'Tiempo de respuesta',
    description: 'Tiempo medio para responder a las reseñas',
    target: 5,
    unit: 'horas',
    icon: <Clock className="h-5 w-5" />,
    inverted: true,
    category: 'essential'
  },
  {
    id: 5,
    title: 'Tasa de fidelización',
    description: 'Porcentaje de clientes que vuelven',
    target: 40,
    unit: '%',
    icon: <Heart className="h-5 w-5" />,
    category: 'advanced'
  },
];

// Mock data for active goals
const defaultActiveGoals = [
  {
    id: 1,
    title: 'Reseñas mensuales',
    description: 'Número total de reseñas a conseguir este mes',
    current: 32,
    target: 50,
    unit: 'reseñas',
    icon: <MessageSquare className="h-5 w-5" />,
    month: 'Junio 2023'
  },
  {
    id: 2,
    title: 'Sentimiento positivo',
    description: 'Porcentaje de reseñas positivas',
    current: 78,
    target: 85,
    unit: '%',
    icon: <ThumbsUp className="h-5 w-5" />,
    month: 'Junio 2023'
  },
  {
    id: 3,
    title: 'Tiempo de respuesta',
    description: 'Tiempo medio para responder a las reseñas',
    current: 8,
    target: 5,
    unit: 'horas',
    icon: <Clock className="h-5 w-5" />,
    inverted: true,
    month: 'Julio 2023'
  },
];

export const GoalsConfiguration = () => {
  const [activeGoals, setActiveGoals] = useState(defaultActiveGoals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('Junio 2023');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [editingGoal, setEditingGoal] = useState<any>(null);

  const monthOptions = ['Junio 2023', 'Julio 2023', 'Agosto 2023', 'Septiembre 2023'];

  // Filter goals by selected month
  const filteredGoals = activeGoals.filter(goal => goal.month === currentMonth);

  // Handle adding a new goal from template
  const handleAddGoal = () => {
    if (selectedTemplate) {
      const template = goalTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        const newGoal = {
          ...template,
          id: Math.max(...activeGoals.map(g => g.id), 0) + 1,
          current: 0,
          month: currentMonth
        };
        setActiveGoals([...activeGoals, newGoal]);
        setIsAddDialogOpen(false);
        setSelectedTemplate(null);
      }
    }
  };

  // Handle editing a goal
  const handleEditGoal = (goal: any) => {
    setEditingGoal({ ...goal });
    setIsEditDialogOpen(true);
  };

  // Save edited goal
  const handleSaveEditedGoal = () => {
    if (editingGoal) {
      setActiveGoals(activeGoals.map(g => 
        g.id === editingGoal.id ? editingGoal : g
      ));
      setIsEditDialogOpen(false);
      setEditingGoal(null);
    }
  };

  // Handle duplicate goal
  const handleDuplicateGoal = (goal: any) => {
    const targetMonth = goal.month === 'Junio 2023' ? 'Julio 2023' : 'Junio 2023';
    const newGoal = {
      ...goal,
      id: Math.max(...activeGoals.map(g => g.id), 0) + 1,
      month: targetMonth,
      title: `${goal.title} (Copia)`
    };
    setActiveGoals([...activeGoals, newGoal]);
  };

  // Handle delete goal
  const handleDeleteGoal = (goalId: number) => {
    setActiveGoals(activeGoals.filter(g => g.id !== goalId));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Configuración de objetivos</CardTitle>
          <CardDescription>
            Define y gestiona los objetivos para tu negocio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <Select value={currentMonth} onValueChange={setCurrentMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un mes" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map(month => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Añadir objetivo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Añadir nuevo objetivo</DialogTitle>
                  <DialogDescription>
                    Selecciona una plantilla de objetivo para {currentMonth}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <Tabs defaultValue="essential">
                    <TabsList className="mb-4">
                      <TabsTrigger value="essential">Esenciales</TabsTrigger>
                      <TabsTrigger value="advanced">Avanzados</TabsTrigger>
                      <TabsTrigger value="custom">Personalizado</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="essential">
                      <div className="space-y-4">
                        {goalTemplates
                          .filter(temp => temp.category === 'essential')
                          .map(template => (
                            <div 
                              key={template.id} 
                              className={`p-4 border rounded-lg cursor-pointer ${
                                selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''
                              }`}
                              onClick={() => setSelectedTemplate(template.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                  {template.icon}
                                </div>
                                <div>
                                  <h3 className="font-medium">{template.title}</h3>
                                  <p className="text-sm text-muted-foreground">{template.description}</p>
                                  <p className="text-sm font-medium mt-1">
                                    Objetivo: {template.target} {template.unit}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advanced">
                      <div className="space-y-4">
                        {goalTemplates
                          .filter(temp => temp.category === 'advanced')
                          .map(template => (
                            <div 
                              key={template.id} 
                              className={`p-4 border rounded-lg cursor-pointer ${
                                selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''
                              }`}
                              onClick={() => setSelectedTemplate(template.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                  {template.icon}
                                </div>
                                <div>
                                  <h3 className="font-medium">{template.title}</h3>
                                  <p className="text-sm text-muted-foreground">{template.description}</p>
                                  <p className="text-sm font-medium mt-1">
                                    Objetivo: {template.target} {template.unit}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="custom">
                      <div className="space-y-4">
                        <div className="grid gap-3">
                          <Label htmlFor="custom-title">Título del objetivo</Label>
                          <Input id="custom-title" placeholder="Ej: Incremento de ventas" />
                        </div>
                        
                        <div className="grid gap-3">
                          <Label htmlFor="custom-description">Descripción</Label>
                          <Input id="custom-description" placeholder="Descripción breve del objetivo" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="custom-target">Valor objetivo</Label>
                            <Input id="custom-target" type="number" placeholder="100" />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="custom-unit">Unidad</Label>
                            <Input id="custom-unit" placeholder="Ej: ventas, %, €" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="custom-inverted" />
                          <label
                            htmlFor="custom-inverted"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Métrica invertida (valores más bajos son mejores)
                          </label>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddGoal} disabled={!selectedTemplate && true}>
                    Añadir objetivo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Separator />

          {filteredGoals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="w-[100px]">Progreso</TableHead>
                  <TableHead className="w-[150px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGoals.map(goal => (
                  <TableRow key={goal.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {goal.icon}
                        </div>
                        {goal.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        <p className="text-sm font-medium mt-1">
                          {goal.current}/{goal.target} {goal.unit}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {goal.inverted ? (
                        <Badge variant={goal.current <= goal.target ? "success" : "destructive"}>
                          {goal.current <= goal.target ? 'Cumplido' : 'No cumplido'}
                        </Badge>
                      ) : (
                        <Badge variant={goal.current >= goal.target ? "success" : "destructive"}>
                          {goal.current >= goal.target ? 'Cumplido' : 'No cumplido'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDuplicateGoal(goal)}>
                          <Copy size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Target className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-500 mb-1">No hay objetivos configurados</h3>
              <p className="text-gray-400 mb-4">
                Crea objetivos para hacer seguimiento del rendimiento de tu negocio
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>Crear objetivo</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar objetivo</DialogTitle>
            <DialogDescription>
              Modifica los parámetros del objetivo
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Título del objetivo</Label>
              <Input
                id="edit-title"
                value={editingGoal?.title || ''}
                onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Input
                id="edit-description"
                value={editingGoal?.description || ''}
                onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-current">Valor actual</Label>
                <Input
                  id="edit-current"
                  type="number"
                  value={editingGoal?.current || 0}
                  onChange={(e) => setEditingGoal({ 
                    ...editingGoal, 
                    current: parseFloat(e.target.value) 
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-target">Valor objetivo</Label>
                <Input
                  id="edit-target"
                  type="number"
                  value={editingGoal?.target || 0}
                  onChange={(e) => setEditingGoal({ 
                    ...editingGoal, 
                    target: parseFloat(e.target.value) 
                  })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-unit">Unidad de medida</Label>
              <Input
                id="edit-unit"
                value={editingGoal?.unit || ''}
                onChange={(e) => setEditingGoal({ ...editingGoal, unit: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="edit-inverted"
                checked={editingGoal?.inverted || false}
                onCheckedChange={(checked) => 
                  setEditingGoal({ ...editingGoal, inverted: checked === true })
                }
              />
              <label
                htmlFor="edit-inverted"
                className="text-sm font-medium leading-none"
              >
                Métrica invertida (valores más bajos son mejores)
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditedGoal}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
