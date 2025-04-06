
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Star, Save, Target } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const RatingGoalConfiguration = () => {
  const { toast } = useToast();
  const [targetRating, setTargetRating] = useState(4.8);
  const [isActive, setIsActive] = useState(true);

  // Ajusta la puntuación al cambiar el slider
  const handleSliderChange = (value: number[]) => {
    setTargetRating(value[0]);
  };

  // Maneja la entrada manual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setTargetRating(value);
    }
  };

  // Guarda la configuración
  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: `El objetivo de puntuación ha sido establecido en ${targetRating.toFixed(1)} estrellas.`,
    });
  };

  return (
    <Card className="overflow-hidden mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-[#FF4797]" />
          <CardTitle>Objetivo de Puntuación Media</CardTitle>
        </div>
        <CardDescription>
          Establece la puntuación media que deseas alcanzar en tus reseñas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="rating-goal">Puntuación objetivo</Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                id="rating-active"
              />
              <span className="text-sm text-muted-foreground">
                {isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
          
          <div className="flex items-end space-x-4">
            <div className="flex-1 space-y-4">
              <Slider
                value={[targetRating]}
                min={1}
                max={5}
                step={0.1}
                onValueChange={handleSliderChange}
                disabled={!isActive}
              />
              
              <div className="flex justify-between">
                <span className="text-sm">1.0</span>
                <span className="text-sm">2.0</span>
                <span className="text-sm">3.0</span>
                <span className="text-sm">4.0</span>
                <span className="text-sm">5.0</span>
              </div>
            </div>
            
            <div className="w-20">
              <Input
                type="number"
                value={targetRating}
                onChange={handleInputChange}
                min={1}
                max={5}
                step={0.1}
                disabled={!isActive}
                className="text-center"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">{targetRating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={20} 
                    className={
                      star <= Math.floor(targetRating) 
                        ? "text-[#FFCE85] fill-[#FFCE85]" 
                        : star <= targetRating 
                          ? "text-[#FFCE85] fill-[#FFCE85] opacity-50" 
                          : "text-gray-300"
                    } 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating-info">Información sobre el objetivo</Label>
          <div className="text-sm text-muted-foreground">
            <p>
              El objetivo de puntuación te ayuda a monitorizar la satisfacción general de tus clientes.
              Alcanzar una puntuación de {targetRating.toFixed(1)} es {
                targetRating >= 4.5 ? "excelente" : 
                targetRating >= 4 ? "muy bueno" : 
                targetRating >= 3.5 ? "bueno" : 
                "un buen punto de partida"
              }.
            </p>
            
            <p className="mt-2">
              <strong>Consejo:</strong> Monitoriza tus reviews frecuentemente y responde a los clientes para mejorar tu puntuación.
            </p>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleSave}
          disabled={!isActive}
        >
          <Save className="mr-2 h-4 w-4" />
          Guardar configuración
        </Button>
      </CardContent>
    </Card>
  );
};
