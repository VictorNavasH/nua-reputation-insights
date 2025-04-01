
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ExternalLink } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  date: string;
  text: string;
  rating: number;
  emoji: string;
  source: string;
}

const ReviewCard = ({ name, date, text, rating, emoji, source }: ReviewCardProps) => {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-0 rounded-xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-[#2F2F4C]">{name}</h3>
            <p className="text-xs text-gray-500">{date} • {source}</p>
          </div>
          <div className="text-2xl">{emoji}</div>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
        
        <p className="text-sm text-[#2F2F4C] line-clamp-3">{text}</p>
        
        <div className="mt-3 flex justify-end">
          <a href="#" className="text-[#02B1C4] hover:text-[#FF4797] transition-colors">
            <ExternalLink size={16} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedReviews = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#2F2F4C] mb-4">Reseñas destacadas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <ReviewCard
          name="María García"
          date="23 Jun 2023"
          text="La atención fue excelente y la comida deliciosa. La tecnología de autoservicio es una maravilla, ¡nunca había visto algo así en un restaurante!"
          rating={5}
          emoji="🤩"
          source="Google"
        />
        
        <ReviewCard
          name="Carlos Pérez"
          date="18 Jun 2023"
          text="La fusión de sabores es increíble. El ambiente es muy moderno y agradable. Definitivamente volveré con amigos."
          rating={4}
          emoji="😊"
          source="TripAdvisor"
        />
        
        <ReviewCard
          name="Laura Sánchez"
          date="15 Jun 2023"
          text="Me encantó el concepto del restaurante. La comida está bien, pero el servicio podría mejorar un poco. Aún así, recomendable."
          rating={3}
          emoji="🙂"
          source="Yelp"
        />
      </div>
    </div>
  );
};

export default FeaturedReviews;
