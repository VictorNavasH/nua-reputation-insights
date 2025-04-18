
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewsKPI from '../components/dashboard/ReviewsKPI';
import SentimentCards from '../components/dashboard/SentimentCards';
import ProgressCard from '../components/dashboard/ProgressCard';
import FeaturedReviews from '../components/dashboard/FeaturedReviews';
import CustomReviewChart from '../components/dashboard/CustomReviewChart';
import SentimentAnalysis from '../components/dashboard/SentimentAnalysis';
import RatingGoalCard from '../components/dashboard/RatingGoalCard';
import { Separator } from '@/components/ui/separator';
import { useDashboard } from '@/contexts/DashboardContext';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isLoading, refreshData } = useDashboard();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Brand Logo and Refresh Button */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#2F2F4C]">Dashboard de Reseñas</h1>
            </div>
            
            <Button 
              variant="outline" 
              onClick={refreshData} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              <span>{isLoading ? "Actualizando..." : "Actualizar datos"}</span>
            </Button>
          </div>
          
          {/* KPI Cards */}
          <ReviewsKPI />
          
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProgressCard />
            <RatingGoalCard />
          </div>
          
          {/* Custom Review Chart */}
          <CustomReviewChart />
          
          <Separator className="my-6" />
          
          {/* Sentiment Analysis Cards */}
          <SentimentCards />
          
          {/* Sentiment Analysis Detail */}
          <SentimentAnalysis />
          
          {/* Featured Reviews */}
          <FeaturedReviews />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
