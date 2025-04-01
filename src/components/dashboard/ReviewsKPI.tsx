
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, MessageCircle, ThumbsUp, Target } from 'lucide-react';

const ReviewsKPI = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Average Rating KPI */}
      <KPICard 
        title="Media de Reseñas" 
        labelText="Calificación"
        value="4.6" 
        suffix="★" 
        icon={<Star className="text-[#FFCE85] fill-[#FFCE85]" size={24} />} 
        headerBg="#02F2D2"
        iconBg="#f5f5f5"
        arrowColor="#02B1C4"
      />
      
      {/* Total Reviews KPI */}
      <KPICard 
        title="Total de Reseñas" 
        labelText="Este mes"
        value="32" 
        icon={<MessageCircle className="text-[#FFCB77]" size={24} />} 
        headerBg="#FFCB77"
        iconBg="#f5f5f5"
        arrowColor="#FFCB77"
      />
      
      {/* Positive Sentiment KPI */}
      <KPICard 
        title="Sentimiento Positivo" 
        labelText="Porcentaje"
        value="78" 
        suffix="%" 
        icon={<ThumbsUp className="text-[#227C9D]" size={24} />} 
        headerBg="#227C9D"
        iconBg="#f5f5f5"
        arrowColor="#227C9D"
      />
      
      {/* Monthly Goal KPI */}
      <KPICard 
        title="Meta Mensual" 
        labelText="Objetivo"
        value="50" 
        icon={<Target className="text-[#FF4797]" size={24} />} 
        headerBg="#FF4797"
        iconBg="#f5f5f5"
        arrowColor="#FF4797"
      />
    </div>
  );
};

interface KPICardProps {
  title: string;
  labelText: string;
  value: string;
  suffix?: string;
  icon: React.ReactNode;
  headerBg: string;
  iconBg: string;
  arrowColor: string;
}

const KPICard = ({ 
  title, 
  labelText,
  value, 
  suffix = '', 
  icon, 
  headerBg, 
  iconBg,
  arrowColor
}: KPICardProps) => {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      {/* Header with background color */}
      <div className="p-4 text-white font-medium" style={{ backgroundColor: headerBg }}>
        {title}
      </div>
      
      {/* Content area */}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">{labelText}</p>
            <div className="flex items-center mt-1">
              <span className="text-3xl font-bold text-[#2F2F4C]">{value}</span>
              {suffix && (
                <span className="text-lg ml-1 font-medium text-[#2F2F4C]">
                  {suffix === '★' ? (
                    <span className="text-[#FFCE85]">★</span>
                  ) : suffix}
                </span>
              )}
            </div>
          </div>
          
          <div className="rounded-full p-3" style={{ backgroundColor: iconBg }}>
            {icon}
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <div 
            className="rounded-full p-2 cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: `${iconBg}` }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={arrowColor} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewsKPI;
