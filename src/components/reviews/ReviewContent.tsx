
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReviewsTable from './ReviewsTable';
import ReviewsCards from './ReviewsCards';
import { Review } from '@/types/reviews';

interface ReviewContentProps {
  isLoading: boolean;
  error: string | null;
  viewType: 'table' | 'cards';
  filteredReviews: Review[];
  onOpenResponseDialog: (review: Review) => void;
}

const ReviewContent = ({
  isLoading,
  error,
  viewType,
  filteredReviews,
  onOpenResponseDialog
}: ReviewContentProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#02B1C4]" />
        <span className="ml-3 text-[#2F2F4C]">Cargando reseñas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6 text-center text-red-500">
          {error}
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {viewType === 'table' ? (
        <ReviewsTable 
          reviews={filteredReviews} 
          onOpenResponseDialog={onOpenResponseDialog} 
        />
      ) : (
        <ReviewsCards 
          reviews={filteredReviews} 
          onOpenResponseDialog={onOpenResponseDialog} 
        />
      )}
    </>
  );
};

export default ReviewContent;
