
import React, { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ReviewResponseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    id: number;
    customer: string;
    review: string;
  } | null;
  onRespond: (id: number, response: string) => void;
}

const ReviewResponseDialog = ({ isOpen, onClose, review, onRespond }: ReviewResponseDialogProps) => {
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = () => {
    if (!review) return;
    
    if (response.trim() === '') {
      toast.error('Por favor, escribe una respuesta antes de enviar.');
      return;
    }
    
    onRespond(review.id, response);
    setResponse('');
    onClose();
    toast.success('Respuesta enviada con éxito.');
  };

  const generateAIResponse = async () => {
    if (!review) return;
    
    setIsGenerating(true);
    
    try {
      // Simulación de respuesta de OpenAI (aquí iría la integración real)
      setTimeout(() => {
        const aiResponse = `Estimado/a ${review.customer}, gracias por compartir tu experiencia con nosotros. Valoramos enormemente tu opinión y nos complace que hayas dedicado tiempo a dejarnos esta reseña. Trabajamos constantemente para ofrecer la mejor experiencia posible a nuestros clientes. ¡Esperamos verte pronto de nuevo en NÜA!`;
        
        setResponse(aiResponse);
        setIsGenerating(false);
      }, 1500);
      
      // Aquí iría la llamada real a OpenAI
      /* 
      const response = await fetch('/api/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          review: review.review,
          customerName: review.customer 
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResponse(data.response);
      } else {
        throw new Error('Error al generar respuesta');
      }
      */
    } catch (error) {
      toast.error('No se pudo generar una respuesta. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Responder a {review.customer}</DialogTitle>
          <DialogDescription>
            Responde a la reseña de forma profesional y personalizada.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium mb-1">Reseña original:</h4>
            <p className="text-sm text-gray-600">{review.review}</p>
          </div>
          
          <Textarea
            placeholder="Escribe tu respuesta aquí..."
            className="min-h-[150px]"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="mt-2 sm:mt-0"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              <MessageSquare size={16} />
              Enviar respuesta
            </Button>
          </div>
          <Button
            variant="secondary"
            onClick={generateAIResponse}
            disabled={isGenerating}
            className="flex items-center gap-2 mb-2 sm:mb-0"
          >
            <Sparkles size={16} />
            {isGenerating ? 'Generando...' : 'Responder con IA'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewResponseDialog;
