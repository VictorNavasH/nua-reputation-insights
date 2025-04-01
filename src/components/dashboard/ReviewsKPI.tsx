
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, MessageCircle, ThumbsUp, Target } from 'lucide-react';

const ReviewsKPI = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Average Rating KPI */}
      <KPICard 
        title="Media de Reseñas" 
        value="4.6" 
        suffix="★" 
        icon={<Star className="text-[#FFCE85] fill-[#FFCE85]" size={24} />} 
        iconBg="#FFCE85" 
        change="+0.2"
        changeText="vs. mes anterior"
        positive
      />
      
      {/* Total Reviews KPI */}
      <KPICard 
        title="Reseñas este mes" 
        value="32" 
        icon={<MessageCircle className="text-[#02B1C4]" size={24} />} 
        iconBg="#02B1C4" 
        change="+8"
        changeText="vs. mes anterior"
        positive
      />
      
      {/* Positive Sentiment KPI */}
      <KPICard 
        title="Sentimiento positivo" 
        value="78" 
        suffix="%" 
        icon={<ThumbsUp className="text-[#02F2D2]" size={24} />} 
        iconBg="#02F2D2" 
        change="+5%"
        changeText="vs. mes anterior"
        positive
      />
      
      {/* Monthly Goal KPI */}
      <KPICard 
        title="Meta mensual" 
        value="50" 
        suffix=" reseñas" 
        icon={<Target className="text-[#FF4797]" size={24} />} 
        iconBg="#FF4797" 
        change="18"
        changeText="reseñas pendientes"
        positive={false}
        hideArrow
      />
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  suffix?: string;
  icon: React.ReactNode;
  iconBg: string;
  change: string;
  changeText: string;
  positive?: boolean;
  hideArrow?: boolean;
}

const KPICard = ({ title, value, suffix = '', icon, iconBg, change, changeText, positive = true, hideArrow = false }: KPICardProps) => {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-[#2F2F4C]">{value}</span>
              {suffix && <span className="text-lg ml-1 font-medium text-[#2F2F4C]">{suffix}</span>}
            </div>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${iconBg}20` }}>
            {icon}
          </div>
        </div>
        
        <div className={`flex items-center mt-3 text-xs font-medium ${positive ? 'text-green-500' : 'text-gray-500'}`}>
          {!hideArrow && (
            positive ? 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
          )}
          <span>{change} {changeText}</span>
        </div>
      </div>
    </Card>
  );
};

export default ReviewsKPI;
