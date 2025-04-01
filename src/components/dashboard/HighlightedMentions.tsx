
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MentionCardProps {
  quote: string;
  author: string;
  date: string;
  rating: number;
  platform: string;
  category: string;
  color: string;
}

const MentionCard = ({ quote, author, date, rating, platform, category, color }: MentionCardProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3">
          <span 
            className="px-2 py-1 text-xs font-medium rounded-full" 
            style={{ 
              backgroundColor: `${color}20`,
              color: color 
            }}
          >
            {category}
          </span>
        </div>
        
        <div className="mb-3 flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
        
        <p className="text-sm text-nua-navy mb-4 italic">"{quote}"</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{platform} • {date}</p>
          </div>
          <Button variant="ghost" size="icon">
            <ExternalLink size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const HighlightedMentions = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-nua-navy mb-4">Menciones Destacadas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MentionCard
          quote="La tecnología de autoservicio es impresionante, ¡nunca había visto algo así en un restaurante!"
          author="María G."
          date="23 Jun 2023"
          rating={5}
          platform="Google"
          category="Tecnología"
          color="#02B1C4"
        />
        
        <MentionCard
          quote="La comida estaba deliciosa, especialmente el plato de fusión asiática. Definitivamente volveré."
          author="Carlos P."
          date="18 Jun 2023"
          rating={4}
          platform="TripAdvisor"
          category="Comida"
          color="#FF4797"
        />
        
        <MentionCard
          quote="El ambiente es muy agradable y moderno, perfecto para una cena informal con amigos."
          author="Laura S."
          date="15 Jun 2023"
          rating={5}
          platform="Yelp"
          category="Ambiente"
          color="#FFCE85"
        />
        
        <MentionCard
          quote="Tardaron un poco en atendernos aunque teníamos reserva, pero la comida compensó la espera."
          author="Jorge M."
          date="10 Jun 2023"
          rating={3}
          platform="Google"
          category="Servicio"
          color="#FE6D73"
        />
      </div>
    </div>
  );
};

export default HighlightedMentions;
