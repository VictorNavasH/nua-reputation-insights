
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewsKPI from '../components/dashboard/ReviewsKPI';
import SentimentCards from '../components/dashboard/SentimentCards';
import ProgressCard from '../components/dashboard/ProgressCard';
import ReviewsTimeline from '../components/dashboard/ReviewsTimeline';
import FeaturedReviews from '../components/dashboard/FeaturedReviews';
import CustomReviewChart from '../components/dashboard/CustomReviewChart';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI Cards */}
          <ReviewsKPI />
          
          {/* Progress Card */}
          <ProgressCard />
          
          {/* Reviews Timeline Graph */}
          <ReviewsTimeline />
          
          {/* Custom Review Chart */}
          <CustomReviewChart />
          
          <Separator className="my-6" />
          
          {/* Sentiment Analysis Cards */}
          <SentimentCards />
          
          {/* Featured Reviews */}
          <FeaturedReviews />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
