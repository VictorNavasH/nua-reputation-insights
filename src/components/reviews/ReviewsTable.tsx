
import React, { useState } from 'react';
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Meh, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
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

interface ReviewsTableProps {
  reviews: Review[];
  onOpenResponseDialog: (review: Review) => void;
}

const ReviewsTable = ({ reviews, onOpenResponseDialog }: ReviewsTableProps) => {
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
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Puntuación</TableHead>
            <TableHead>Reseña</TableHead>
            <TableHead>Sentimiento</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No se encontraron reseñas que coincidan con los filtros aplicados
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {review.photo && (
                      <img 
                        src={review.photo} 
                        alt={review.customer} 
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    )}
                    {review.customer}
                  </div>
                </TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <div className="flex">{renderStars(review.rating)}</div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="relative">
                    <p className="truncate">
                      {translatedReviews[review.UUID] && review.reseña_traducida 
                        ? review.reseña_traducida 
                        : review.review}
                    </p>
                    
                    {/* Show translation button inside the review cell for non-Spanish reviews */}
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
                </TableCell>
                <TableCell>{renderSentiment(review.sentiment)}</TableCell>
                <TableCell>
                  <Button 
                    variant={review.responded ? "outline" : "default"} 
                    size="sm"
                    className="gap-2"
                    onClick={() => onOpenResponseDialog(review)}
                  >
                    <MessageCircle size={14} />
                    {review.responded ? "Respondida" : "Responder"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ReviewsTable;
