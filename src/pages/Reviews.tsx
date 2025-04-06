
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewResponseDialog from '@/components/reviews/ReviewResponseDialog';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewHeader from '@/components/reviews/ReviewHeader';
import ReviewContent from '@/components/reviews/ReviewContent';
import { useReviews, Review } from '@/hooks/useReviews';

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewType, setViewType] = useState<'table' | 'cards'>('table');
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
    
    // Filter by date
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const reviewDate = new Date(review.date.split(' ').slice(-1)[0] + '-' + 
                               getMonthNumber(review.date.split(' ')[1]) + '-' + 
                               review.date.split(' ')[0]);
      const today = new Date();
      
      switch(dateFilter) {
        case 'today':
          matchesDate = reviewDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          matchesDate = reviewDate >= weekAgo;
          break;
        case 'month':
          matchesDate = reviewDate.getMonth() === today.getMonth() && 
                       reviewDate.getFullYear() === today.getFullYear();
          break;
        case 'quarter':
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(today.getMonth() - 3);
          matchesDate = reviewDate >= threeMonthsAgo;
          break;
      }
    }
    
    return matchesSearch && matchesRating && matchesDate;
  });

  // Helper function to convert Spanish month abbreviation to number
  function getMonthNumber(monthAbbr: string): string {
    const monthMap: {[key: string]: string} = {
      'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
      'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
      'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
    };
    return monthMap[monthAbbr.toLowerCase()] || '01';
  }

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

  // Update the view type based on tab selection
  useEffect(() => {
    setViewType(type => type);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <ReviewHeader />
          
          {/* Filters section */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <ReviewFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              viewType={viewType}
              setViewType={setViewType}
            />
          </div>
          
          <ReviewContent 
            isLoading={isLoading}
            error={error}
            viewType={viewType}
            filteredReviews={filteredReviews}
            onOpenResponseDialog={handleOpenResponseDialog}
          />

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
