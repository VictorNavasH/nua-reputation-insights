
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Calendar, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GoalsList from '../components/goals/GoalsList';
import GoalEditForm from '../components/goals/GoalEditForm';
import GoalHistoryDialog from '../components/goals/GoalHistoryDialog';
import GoalSummaryCards from '../components/goals/GoalSummaryCards';
import GoalFilters from '../components/goals/GoalFilters';
import { currentYear, availableYears, quarters, months, defaultGoals, historicalSummary } from '../components/goals/GoalData';

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

  // Filter goals based on period and year
  const getFilteredGoals = () => {
    if (selectedPeriod === 'monthly') {
      return goals.filter(goal => goal.month === month && goal.year === selectedYear);
    } else {
      const quartersMonths = getMonthsForQuarter(selectedQuarter);
      return goals.filter(goal => quartersMonths.includes(goal.month) && goal.year === selectedYear);
    }
  };

  // Calculate completion rate for a set of goals
  const calculateCompletionRate = (goals: any[]) => {
    if (goals.length === 0) return 0;
    
    const completedGoals = goals.filter(goal => {
      const progress = calculateProgress(goal.current, goal.target, goal.inverted);
      return progress >= 100;
    });
    
    return Math.round((completedGoals.length / goals.length) * 100);
  };

  // Get filtered goals
  const filteredGoals = getFilteredGoals();

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
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
            <GoalFilters 
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              availableYears={availableYears}
            />
          </div>

          <Card className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <GoalSummaryCards 
              filteredGoals={filteredGoals}
              calculateCompletionRate={calculateCompletionRate}
              calculateProgress={calculateProgress}
              period={selectedPeriod === 'monthly' 
                ? `${month.charAt(0).toUpperCase() + month.slice(1)}` 
                : selectedQuarter}
              year={selectedYear}
            />
          </Card>
          
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
                <GoalsList 
                  goals={filteredGoals}
                  onEditGoal={handleEditGoal}
                  onDuplicateGoal={handleDuplicateGoal}
                  onAddNewGoal={handleAddNewGoal}
                  selectedMonth={month.charAt(0).toUpperCase() + month.slice(1)}
                  selectedYear={selectedYear}
                />
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
                <GoalsList 
                  goals={filteredGoals}
                  onEditGoal={handleEditGoal}
                  onDuplicateGoal={handleDuplicateGoal}
                  onAddNewGoal={handleAddNewGoal}
                  selectedQuarter={selectedQuarter}
                  selectedYear={selectedYear}
                />
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
          <GoalEditForm
            editingGoal={editingGoal}
            setEditingGoal={setEditingGoal}
            onSave={handleSaveGoal}
            onCancel={() => setIsDialogOpen(false)}
            months={months}
            availableYears={availableYears}
          />
        </DialogContent>
      </Dialog>
      
      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <GoalHistoryDialog 
          historicalSummary={historicalSummary}
          onClose={() => setIsHistoryDialogOpen(false)}
        />
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Goals;
