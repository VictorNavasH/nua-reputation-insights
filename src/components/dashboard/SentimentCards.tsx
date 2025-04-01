
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';

const SentimentCards = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#2F2F4C] mb-4">Análisis de sentimiento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Positive Sentiment */}
        <SentimentCard
          icon={<ThumbsUp className="text-green-500" size={24} />}
          emoji="👍"
          title="Positivas"
          percentage={78}
          color="#17C3B2"
          bgColor="#17C3B220"
        />
        
        {/* Neutral Sentiment */}
        <SentimentCard
          icon={<Minus className="text-yellow-500" size={24} />}
          emoji="😐"
          title="Neutras"
          percentage={15}
          color="#FFCB77"
          bgColor="#FFCB7720"
        />
        
        {/* Negative Sentiment */}
        <SentimentCard
          icon={<ThumbsDown className="text-red-500" size={24} />}
          emoji="👎"
          title="Negativas"
          percentage={7}
          color="#FE6D73"
          bgColor="#FE6D7320"
        />
      </div>
    </div>
  );
};

interface SentimentCardProps {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  percentage: number;
  color: string;
  bgColor: string;
}

const SentimentCard = ({ icon, emoji, title, percentage, color, bgColor }: SentimentCardProps) => {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: bgColor }}>
              {icon}
            </div>
            <div>
              <div className="text-2xl">{emoji}</div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
            </div>
          </div>
          <span className="text-2xl font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
        
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-in-out"
              style={{ 
                width: `${percentage}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentCards;
