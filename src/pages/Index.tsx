
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewsSummary from '../components/dashboard/ReviewsSummary';
import SentimentAnalysis from '../components/dashboard/SentimentAnalysis';
import ReviewTimeline from '../components/dashboard/ReviewTimeline';
import GoalsProgress from '../components/dashboard/GoalsProgress';
import HighlightedMentions from '../components/dashboard/HighlightedMentions';
import FranchiseComparison from '../components/dashboard/FranchiseComparison';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <ReviewsSummary />
          <SentimentAnalysis />
          <ReviewTimeline />
          <GoalsProgress />
          <HighlightedMentions />
          <FranchiseComparison />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
