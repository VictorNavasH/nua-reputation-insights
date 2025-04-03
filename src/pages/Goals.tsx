
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Clock, Heart, ThumbsUp, MessageSquare, Star, Edit, Copy, Plus, Save, X, Calendar, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Updates to include more years and quarters
const currentYear = new Date().getFullYear();
const availableYears = [currentYear, currentYear - 1, currentYear - 2];
const quarters = ["Q1 (Ene-Mar)", "Q2 (Abr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dic)"];
const months = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// Updated mock data to include year
const defaultGoals = [{
  id: 1,
  title: 'Reseñas mensuales',
  description: 'Número total de reseñas a conseguir este mes',
  current: 32,
  target: 50,
  unit: 'reseñas',
  icon: <MessageSquare className="h-5 w-5" />,
  month: 'junio',
  year: 2023
}, {
  id: 2,
  title: 'Sentimiento positivo',
  description: 'Porcentaje de reseñas positivas',
  current: 78,
  target: 85,
  unit: '%',
  icon: <ThumbsUp className="h-5 w-5" />,
  month: 'junio',
  year: 2023
}, {
  id: 3,
  title: 'Puntuación media',
  description: 'Calificación media de las reseñas',
  current: 4.6,
  target: 4.8,
  unit: 'estrellas',
  icon: <Star className="h-5 w-5" />,
  month: 'junio',
  year: 2023
}, {
  id: 4,
  title: 'Tiempo de respuesta',
  description: 'Tiempo medio para responder a las reseñas',
  current: 8,
  target: 5,
  unit: 'horas',
  icon: <Clock className="h-5 w-5" />,
  month: 'junio',
  year: 2023,
  inverted: true // Lower is better for this goal
}, {
  id: 5,
  title: 'Reseñas mensuales',
  description: 'Número total de reseñas a conseguir este mes',
  current: 40,
  target: 50,
  unit: 'reseñas',
  icon: <MessageSquare className="h-5 w-5" />,
  month: 'julio',
  year: 2023
}, {
  id: 6,
  title: 'Puntuación media',
  description: 'Calificación media de las reseñas',
  current: 4.7,
  target: 4.8,
  unit: 'estrellas',
  icon: <Star className="h-5 w-5" />,
  month: 'enero',
  year: 2024
}];

// Historical summary data by year and quarter
const historicalSummary = [
  { year: 2023, quarter: "Q1", goalsCompleted: 8, totalGoals: 12 },
  { year: 2023, quarter: "Q2", goalsCompleted: 10, totalGoals: 12 },
  { year: 2023, quarter: "Q3", goalsCompleted: 7, totalGoals: 12 },
  { year: 2023, quarter: "Q4", goalsCompleted: 9, totalGoals: 12 },
  { year: 2024, quarter: "Q1", goalsCompleted: 5, totalGoals: 9 }
];

const Goals = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly'); // 'monthly', 'quarterly'
  const [selectedQuarter, setSelectedQuarter] = useState('Q2 (Abr-Jun)');
  const [month, setMonth] = useState('junio');
  const [goals, setGoals] = useState(defaultGoals);
  const [editingGoal, setEditingGoal] = useState<null | any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  // Get current month name in Spanish
  useEffect(() => {
    if (selectedPeriod === 'monthly') {
      const currentMonthIndex = new Date().getMonth();
      const currentMonthName = months[currentMonthIndex];
      if (selectedYear === currentYear) {
        setMonth(currentMonthName);
      }
    }
  }, [selectedYear, selectedPeriod]);

  // Get quarter for current month
  const getCurrentQuarter = () => {
    const currentMonth = new Date().getMonth();
    if (currentMonth < 3) return "Q1 (Ene-Mar)";
    if (currentMonth < 6) return "Q2 (Abr-Jun)";
    if (currentMonth < 9) return "Q3 (Jul-Sep)";
    return "Q4 (Oct-Dic)";
  };

  useEffect(() => {
    if (selectedPeriod === 'quarterly' && selectedYear === currentYear) {
      setSelectedQuarter(getCurrentQuarter());
    }
  }, [selectedPeriod, selectedYear]);

  // Handle edit goal
  const handleEditGoal = (goal: any) => {
    setEditingGoal({
      ...goal
    });
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
          month,
          year: selectedYear
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
      month: getNextMonth(goal.month),
      year: goal.month === "diciembre" ? goal.year + 1 : goal.year
    };
    setGoals([...goals, newGoal]);
  };

  // Get next month
  const getNextMonth = (currentMonth: string) => {
    const monthIndex = months.indexOf(currentMonth);
    if (monthIndex === -1 || monthIndex === months.length - 1) {
      return months[0]; // Return January if current month is December or not found
    }
    return months[monthIndex + 1];
  };

  // Get months for a quarter
  const getMonthsForQuarter = (quarter: string): string[] => {
    switch (quarter) {
      case "Q1 (Ene-Mar)": return ["enero", "febrero", "marzo"];
      case "Q2 (Abr-Jun)": return ["abril", "mayo", "junio"];
      case "Q3 (Jul-Sep)": return ["julio", "agosto", "septiembre"];
      case "Q4 (Oct-Dic)": return ["octubre", "noviembre", "diciembre"];
      default: return [];
    }
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
      month,
      year: selectedYear
    });
    setIsDialogOpen(true);
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number, inverted = false) => {
    if (inverted) {
      // For inverted metrics (where lower is better)
      return Math.max(0, Math.min(100, target / current * 100));
    }
    return Math.max(0, Math.min(100, current / target * 100));
  };

  // Get the progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-[#FE6D73] to-[#FE6D73]/80';
    if (percentage < 80) return 'from-[#FFCB77] to-[#FFCB77]/80';
    return 'from-[#02F2D2] to-[#02F2D2]/80';
  };

  // Filter goals based on period and year
  const getFilteredGoals = () => {
    if (selectedPeriod === 'monthly') {
      return goals.filter(goal => goal.month === month && goal.year === selectedYear);
    } else {
      const quartersMonths = getMonthsForQuarter(selectedQuarter);
      return goals.filter(goal => quartersMonths.includes(goal.month) && goal.year === selectedYear);
    }
  };

  // Get filtered goals
  const filteredGoals = getFilteredGoals();

  // Calculate completion rate for a set of goals
  const calculateCompletionRate = (goals: any[]) => {
    if (goals.length === 0) return 0;
    
    const completedGoals = goals.filter(goal => {
      const progress = calculateProgress(goal.current, goal.target, goal.inverted);
      return progress >= 100;
    });
    
    return Math.round((completedGoals.length / goals.length) * 100);
  };

  return <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Objetivos y Metas</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setIsHistoryDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Calendar size={16} />
                Histórico
              </Button>
              <Button onClick={handleAddNewGoal} className="gap-2">
                <Plus size={16} />
                Nuevo objetivo
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
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
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#F6F9FC] border-none">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-sm font-medium text-[#2F2F4C]/70">Objetivos en curso</h3>
                    <p className="text-2xl font-bold text-[#2F2F4C] mt-1">{filteredGoals.length}</p>
                  </div>
                  <p className="text-xs text-[#2F2F4C]/50 mt-4">
                    {selectedPeriod === 'monthly' 
                      ? `${month.charAt(0).toUpperCase() + month.slice(1)} ${selectedYear}` 
                      : `${selectedQuarter} ${selectedYear}`}
                  </p>
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
                    <p className="text-2xl font-bold text-[#FFCB77] mt-1">
                      {filteredGoals.length > 0 
                        ? Math.round(filteredGoals.reduce((acc, goal) => 
                            acc + calculateProgress(goal.current, goal.target, goal.inverted), 0) / filteredGoals.length) 
                        : 0}%
                    </p>
                  </div>
                  <p className="text-xs text-[#2F2F4C]/50 mt-4">
                    Progreso medio de todos los objetivos
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {selectedPeriod === 'monthly' ? (
            <Tabs defaultValue={month} className="mb-6">
              <TabsList className="mb-4">
                {months.map((m) => (
                  <TabsTrigger key={m} value={m} onClick={() => setMonth(m)}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={month}>
                <div className="grid grid-cols-1 gap-6">
                  {filteredGoals.length > 0 ? (
                    filteredGoals.map(goal => {
                      const progressPercentage = calculateProgress(goal.current, goal.target, goal.inverted);
                      const progressColor = getProgressColor(progressPercentage);
                      return <Card key={goal.id} className="overflow-hidden">
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
                                  <div className={`h-full bg-gradient-to-r ${progressColor}`} style={{
                                width: `${progressPercentage}%`
                              }} />
                                </div>
                                <div className="mt-2 flex justify-between text-xs">
                                  <span className="font-medium text-[#2F2F4C]">{Math.round(progressPercentage)}% completado</span>
                                  {goal.inverted ? <span className="text-[#2F2F4C]/70">
                                      {goal.current > goal.target ? `${Math.abs(goal.current - goal.target)} ${goal.unit} por encima del objetivo` : `Objetivo alcanzado`}
                                    </span> : <span className="text-[#2F2F4C]/70">
                                      {goal.current < goal.target ? `Faltan ${goal.target - goal.current} ${goal.unit}` : `Objetivo alcanzado`}
                                    </span>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>;
                    })
                  ) : (
                    <div className="text-center py-10">
                      <Target className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-500 mb-1">No hay objetivos para {month} {selectedYear}</h3>
                      <p className="text-gray-400 mb-4">Crea nuevos objetivos para empezar a hacer seguimiento</p>
                      <Button onClick={handleAddNewGoal}>Crear objetivo</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            // Quarterly view
            <Tabs defaultValue={selectedQuarter} className="mb-6">
              <TabsList className="mb-4">
                {quarters.map((q) => (
                  <TabsTrigger key={q} value={q} onClick={() => setSelectedQuarter(q)}>
                    {q}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={selectedQuarter}>
                <div className="grid grid-cols-1 gap-6">
                  {filteredGoals.length > 0 ? (
                    filteredGoals.map(goal => {
                      const progressPercentage = calculateProgress(goal.current, goal.target, goal.inverted);
                      const progressColor = getProgressColor(progressPercentage);
                      return <Card key={goal.id} className="overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-3 bg-pink-100">
                                    {goal.icon}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg text-[#2F2F4C]">{goal.title}</h3>
                                    <p className="text-sm text-gray-500">
                                      {goal.description} • {goal.month.charAt(0).toUpperCase() + goal.month.slice(1)}
                                    </p>
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
                                  <div className={`h-full bg-gradient-to-r ${progressColor}`} style={{
                                width: `${progressPercentage}%`
                              }} />
                                </div>
                                <div className="mt-2 flex justify-between text-xs">
                                  <span className="font-medium text-[#2F2F4C]">{Math.round(progressPercentage)}% completado</span>
                                  {goal.inverted ? <span className="text-[#2F2F4C]/70">
                                      {goal.current > goal.target ? `${Math.abs(goal.current - goal.target)} ${goal.unit} por encima del objetivo` : `Objetivo alcanzado`}
                                    </span> : <span className="text-[#2F2F4C]/70">
                                      {goal.current < goal.target ? `Faltan ${goal.target - goal.current} ${goal.unit}` : `Objetivo alcanzado`}
                                    </span>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>;
                    })
                  ) : (
                    <div className="text-center py-10">
                      <Target className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-500 mb-1">No hay objetivos para {selectedQuarter} {selectedYear}</h3>
                      <p className="text-gray-400 mb-4">Crea nuevos objetivos para empezar a hacer seguimiento</p>
                      <Button onClick={handleAddNewGoal}>Crear objetivo</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      {/* Edit Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingGoal?.id ? 'Editar objetivo' : 'Nuevo objetivo'}</DialogTitle>
            <DialogDescription>
              {editingGoal?.id ? 'Modifica los detalles del objetivo existente.' : 'Crea un nuevo objetivo para hacer seguimiento.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título del objetivo</Label>
              <Input id="title" value={editingGoal?.title || ''} onChange={e => setEditingGoal({
              ...editingGoal,
              title: e.target.value
            })} placeholder="Ej: Reseñas mensuales" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" value={editingGoal?.description || ''} onChange={e => setEditingGoal({
              ...editingGoal,
              description: e.target.value
            })} placeholder="Ej: Número total de reseñas a conseguir este mes" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current">Valor actual</Label>
                <Input id="current" type="number" value={editingGoal?.current || 0} onChange={e => setEditingGoal({
                ...editingGoal,
                current: parseFloat(e.target.value)
              })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Valor objetivo</Label>
                <Input id="target" type="number" value={editingGoal?.target || 0} onChange={e => setEditingGoal({
                ...editingGoal,
                target: parseFloat(e.target.value)
              })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unidad de medida</Label>
              <Input id="unit" value={editingGoal?.unit || ''} onChange={e => setEditingGoal({
              ...editingGoal,
              unit: e.target.value
            })} placeholder="Ej: reseñas, %, estrellas" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="period">Periodo</Label>
              <Select
                value={editingGoal?.month || month}
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
                value={String(editingGoal?.year || selectedYear)}
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
                <input type="checkbox" id="inverted" checked={editingGoal?.inverted || false} onChange={e => setEditingGoal({
                ...editingGoal,
                inverted: e.target.checked
              })} className="mr-2" />
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
      
      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>
              Cerrar
            </Button>
            <Button variant="outline">
              Exportar datos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>;
};
export default Goals;
