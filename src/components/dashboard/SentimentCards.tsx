
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const SentimentCards = () => {
  const { sentimentData } = useDashboard();
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#2F2F4C] mb-4">Análisis de sentimiento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Positive Sentiment */}
        <Card className="overflow-hidden rounded-xl border-none shadow-md p-4 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-[#17C3B220]">
                  <ThumbsUp className="h-6 w-6 text-[#17C3B2]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">👍</div>
                  <p className="text-sm text-[#2F2F4C]/70">Positivas</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#17C3B2]">
                {sentimentData.positive}%
              </span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 bg-[#E8EDF3] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-in-out animate-progress-fill"
                  style={{ 
                    width: `${sentimentData.positive}%`,
                    backgroundColor: "#17C3B2",
                    "--progress-value": `${sentimentData.positive}%` 
                  } as React.CSSProperties}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Neutral Sentiment */}
        <Card className="overflow-hidden rounded-xl border-none shadow-md p-4 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-[#FFCB7720]">
                  <Minus className="h-6 w-6 text-[#FFCB77]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">😐</div>
                  <p className="text-sm text-[#2F2F4C]/70">Neutras</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#FFCB77]">
                {sentimentData.neutral}%
              </span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 bg-[#E8EDF3] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-in-out animate-progress-fill"
                  style={{ 
                    width: `${sentimentData.neutral}%`,
                    backgroundColor: "#FFCB77",
                    "--progress-value": `${sentimentData.neutral}%` 
                  } as React.CSSProperties}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Negative Sentiment */}
        <Card className="overflow-hidden rounded-xl border-none shadow-md p-4 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-[#FF479720]">
                  <ThumbsDown className="h-6 w-6 text-[#FF4797]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">👎</div>
                  <p className="text-sm text-[#2F2F4C]/70">Negativas</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#FF4797]">
                {sentimentData.negative}%
              </span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 bg-[#E8EDF3] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-in-out animate-progress-fill"
                  style={{ 
                    width: `${sentimentData.negative}%`,
                    backgroundColor: "#FF4797",
                    "--progress-value": `${sentimentData.negative}%` 
                  } as React.CSSProperties}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentCards;
