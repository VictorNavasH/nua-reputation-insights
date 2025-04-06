import React, { useState } from 'react';
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Meh, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

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
  const [translatedReviews, setTranslatedReviews] = useState<number[]>([]);
  
  const toggleTranslation = (reviewId: number) => {
    setTranslatedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId) 
        : [...prev, reviewId]
    );
  };

  const needsTranslation = (language?: string) => {
    return language && !['es', 'ca'].includes(language.toLowerCase());
  };

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
                      {translatedReviews.includes(review.id) && review.reseña_traducida 
                        ? review.reseña_traducida 
                        : review.review}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{renderSentiment(review.sentiment)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {needsTranslation(review.idioma) && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-2"
                        onClick={() => toggleTranslation(review.id)}
                      >
                        <Languages size={14} />
                        {translatedReviews.includes(review.id) ? "Ver original" : "Traducir"}
                      </Button>
                    )}
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
