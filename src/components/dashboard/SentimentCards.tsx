
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';

const SentimentCards = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#2F2F4C] mb-4">Análisis de sentimiento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Positive Sentiment */}
        <Card className="overflow-hidden rounded-2xl border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#17C3B220]">
                  <ThumbsUp className="h-6 w-6 text-[#17C3B2]" />
                </div>
                <div>
                  <div className="text-2xl">👍</div>
                  <p className="text-sm text-[#2F2F4C]/70">Positivas</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#17C3B2]">
                78%
              </span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 bg-[#E8EDF3] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{ 
                    width: "78%",
                    backgroundColor: "#17C3B2"
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Neutral Sentiment */}
        <Card className="overflow-hidden rounded-2xl border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FFCB7720]">
                  <Minus className="h-6 w-6 text-[#FFCB77]" />
                </div>
                <div>
                  <div className="text-2xl">😐</div>
                  <p className="text-sm text-[#2F2F4C]/70">Neutras</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#FFCB77]">
                15%
              </span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 bg-[#E8EDF3] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{ 
                    width: "15%",
                    backgroundColor: "#FFCB77"
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Negative Sentiment */}
        <Card className="overflow-hidden rounded-2xl border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FE6D7320]">
                  <ThumbsDown className="h-6 w-6 text-[#FE6D73]" />
                </div>
                <div>
                  <div className="text-2xl">👎</div>
                  <p className="text-sm text-[#2F2F4C]/70">Negativas</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#FE6D73]">
                7%
              </span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 bg-[#E8EDF3] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{ 
                    width: "7%",
                    backgroundColor: "#FE6D73"
                  }}
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
