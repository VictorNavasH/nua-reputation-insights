
import React, { useState } from 'react';
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Meh, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

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
  const [translatedReviews, setTranslatedReviews] = useState<{[key: string]: boolean}>({});
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "text-[#FFCE85] fill-[#FFCE85]" : "text-gray-300"} 
      />
    ));
  };

  // Function to render sentiment emoji
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

  // Function to handle translation
  const handleTranslate = (reviewId: string) => {
    // Toggle translation state for this review
    setTranslatedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
    
    // Show toast notification
    toast.success("Reseña traducida correctamente", {
      description: "Se ha traducido la reseña al español",
      duration: 3000,
    });
  };

  // Check if a review needs translation button (is not in Spanish)
  const needsTranslation = (review: Review) => {
    return review.idioma && review.idioma !== 'es';
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
                  {/* Show translated text if available and translation is toggled on */}
                  <p className="text-sm">
                    {translatedReviews[review.UUID] && review.reseña_traducida 
                      ? review.reseña_traducida 
                      : review.review}
                  </p>
                  
                  {/* Show translation button inside the review area for non-Spanish reviews */}
                  {needsTranslation(review) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-0 right-0 h-7 text-xs flex items-center gap-1 text-[#02B1C4] hover:text-[#02B1C4]/80 hover:bg-[#02B1C4]/10"
                      onClick={() => handleTranslate(review.UUID)}
                    >
                      <Languages size={14} />
                      {translatedReviews[review.UUID] ? "Ver original" : "Traducir"}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">Sentimiento:</span>
                  {renderSentiment(review.sentiment)}
                </div>
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
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReviewsCards;
