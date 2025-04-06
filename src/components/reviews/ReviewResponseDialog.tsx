
import React, { useState } from 'react';
import { MessageSquare, Sparkles, Languages } from 'lucide-react';
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
    idioma?: string;
    reseña_traducida?: string;
  } | null;
  onRespond: (id: number, response: string) => void;
}

const ReviewResponseDialog = ({ isOpen, onClose, review, onRespond }: ReviewResponseDialogProps) => {
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTranslated, setShowTranslated] = useState(false);

  // Function to check if the review is in Spanish or Catalan
  const isNonSpanishOrCatalan = () => {
    if (!review?.idioma) return false;
    const lang = review.idioma.toLowerCase();
    return lang !== 'es' && lang !== 'ca';
  };

  // Function to toggle between original and translated review
  const toggleTranslation = () => {
    setShowTranslated(prev => !prev);
    toast.success(showTranslated ? 'Mostrando reseña original' : 'Mostrando reseña traducida');
  };

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

  // For debugging - log the review object to see its contents
  console.log('Review in dialog:', review);
  console.log('Is non-Spanish/Catalan:', isNonSpanishOrCatalan());
  console.log('Has translation:', Boolean(review.reseña_traducida));

  const hasTranslation = Boolean(review.reseña_traducida);
  const shouldShowTranslationButton = isNonSpanishOrCatalan() && hasTranslation;
  
  // Debug the translation button conditions
  console.log('Should show translation button:', shouldShowTranslationButton);

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
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-medium">Reseña original:</h4>
              
              {shouldShowTranslationButton && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleTranslation}
                  className="flex items-center gap-1 text-xs"
                >
                  <Languages size={14} />
                  {showTranslated ? 'Ver original' : 'Traducir'}
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {shouldShowTranslationButton && showTranslated 
                ? review.reseña_traducida 
                : review.review}
            </p>
            {isNonSpanishOrCatalan() && (
              <div className="mt-1 text-xs text-gray-400 flex items-center">
                <Languages size={12} className="mr-1" />
                {review.idioma?.toUpperCase() || 'Idioma desconocido'}
              </div>
            )}
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
