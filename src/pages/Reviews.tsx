
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Loader2 } from 'lucide-react';
import ReviewResponseDialog from '@/components/reviews/ReviewResponseDialog';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewsTable from '@/components/reviews/ReviewsTable';
import ReviewsCards from '@/components/reviews/ReviewsCards';
import { useReviews, Review } from '@/hooks/useReviews';

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<null | Review>(null);
  
  // Use our custom hook to fetch reviews
  const { reviews, isLoading, error } = useReviews();

  // Filter reviews based on search query and filters
  const filteredReviews = reviews.filter(review => {
    // Filter by search query
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      review.review.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by rating
    const matchesRating = 
      ratingFilter === 'all' || 
      review.rating === parseInt(ratingFilter);
    
    // For this example, we'll just apply the search and rating filters
    return matchesSearch && matchesRating;
  });

  // Function to handle opening the response dialog
  const handleOpenResponseDialog = (review: Review) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  // Function to handle responding to a review
  const handleRespond = (id: number, response: string) => {
    // In the future, here we could save the response in Supabase
    const updatedReviews = reviews.map(review => 
      review.id === id ? { ...review, responded: true } : review
    );
    // This would be updated to use a state update function from the hook
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Reseñas de clientes</h1>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Exportar CSV
            </Button>
          </div>
          
          {/* Filters section */}
          <ReviewFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#02B1C4]" />
              <span className="ml-3 text-[#2F2F4C]">Cargando reseñas...</span>
            </div>
          )}
          
          {/* Error state */}
          {error && (
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
          )}
          
          {/* Reviews display */}
          {!isLoading && !error && (
            <Tabs defaultValue="table">
              <TabsList className="hidden">
                <TabsTrigger value="table">Vista tabla</TabsTrigger>
                <TabsTrigger value="cards">Vista tarjetas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table">
                <ReviewsTable 
                  reviews={filteredReviews} 
                  onOpenResponseDialog={handleOpenResponseDialog} 
                />
              </TabsContent>

              <TabsContent value="cards">
                <ReviewsCards 
                  reviews={filteredReviews} 
                  onOpenResponseDialog={handleOpenResponseDialog} 
                />
              </TabsContent>
            </Tabs>
          )}

          {/* Response Dialog */}
          <ReviewResponseDialog 
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            review={selectedReview}
            onRespond={handleRespond}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
