
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Loader2, Languages } from 'lucide-react';
import ReviewResponseDialog from '@/components/reviews/ReviewResponseDialog';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewsTable from '@/components/reviews/ReviewsTable';
import ReviewsCards from '@/components/reviews/ReviewsCards';
import { useReviews, Review } from '@/hooks/useReviews';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
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
    
    // Filter by language
    const matchesLanguage =
      languageFilter === 'all' ||
      review.idioma === languageFilter;
    
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
    
    return matchesSearch && matchesRating && matchesLanguage && matchesDate;
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

  // Get unique languages from reviews for the filter
  const languages = ['all', ...new Set(reviews.map(review => review.idioma || 'es'))];
  
  // Language names mapping
  const languageNames: {[key: string]: string} = {
    'all': 'Todos los idiomas',
    'es': 'Español',
    'en': 'Inglés',
    'fr': 'Francés',
    'de': 'Alemán',
    'it': 'Italiano',
    'pt': 'Portugués'
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Reseñas de clientes</h1>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Exportar CSV
            </Button>
          </div>
          
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
            
            {/* Language filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 h-9 px-3"
                >
                  <Languages size={16} />
                  {languageNames[languageFilter] || languageFilter}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2">
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang}
                      variant={languageFilter === lang ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setLanguageFilter(lang)}
                    >
                      {languageNames[lang] || lang}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
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
            viewType === 'table' ? (
              <ReviewsTable 
                reviews={filteredReviews} 
                onOpenResponseDialog={handleOpenResponseDialog} 
              />
            ) : (
              <ReviewsCards 
                reviews={filteredReviews} 
                onOpenResponseDialog={handleOpenResponseDialog} 
              />
            )
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
