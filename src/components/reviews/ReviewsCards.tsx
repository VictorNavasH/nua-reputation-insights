import React from 'react';
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: number;
  UUID: string;
  customer: string;
  date: string;
  rating: number;
  review: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  responded: boolean;
  profile_url?: string;
  photo?: string;
  idioma?: string;
  traducida?: boolean;
  reseña_traducida?: string;
}

interface ReviewsCardsProps {
  reviews: Review[];
  onOpenResponseDialog: (review: Review) => void;
}

const ReviewsCards = ({ reviews, onOpenResponseDialog }: ReviewsCardsProps) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "text-[#FFCE85] fill-[#FFCE85]" : "text-gray-300"} 
      />
    ));
  };

  const renderSentiment = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp size={20} className="text-[#02F2D2]" />;
      case 'neutral':
        return <Meh size={20} className="text-[#FFCB77]" />;
      case 'negative':
        return <ThumbsDown size={20} className="text-[#FE6D73]" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No se encontraron reseñas que coincidan con los filtros aplicados
        </div>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center">
                    {review.photo && (
                      <img 
                        src={review.photo} 
                        alt={review.customer} 
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    )}
                    <h3 className="font-medium text-[#2F2F4C]">{review.customer}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex space-x-1">{renderStars(review.rating)}</div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <p className="text-sm">
                    {review.review}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">Sentimiento:</span>
                  {renderSentiment(review.sentiment)}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={review.responded ? "outline" : "default"} 
                    size="sm"
                    className="gap-2"
                    onClick={() => onOpenResponseDialog(review)}
                  >
                    <MessageCircle size={14} />
                    {review.responded ? "Respondida" : "Responder"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReviewsCards;
