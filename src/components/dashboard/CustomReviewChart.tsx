
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Custom ReviewChart component using SVG for stylized visualization
const ReviewChart = () => {
  return (
    <div className="relative h-full w-full">
      {/* Background grid for the chart */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="border-b border-r border-[#2F2F4C]/10"></div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute -left-8 top-0 flex h-full flex-col justify-between py-2 text-xs text-[#2F2F4C]/70">
        <div>10</div>
        <div>8</div>
        <div>6</div>
        <div>4</div>
        <div>2</div>
        <div>0</div>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute -bottom-6 left-0 flex w-full justify-between px-2 text-xs text-[#2F2F4C]/70">
        <div>1 Jun</div>
        <div>6 Jun</div>
        <div>11 Jun</div>
        <div>16 Jun</div>
        <div>21 Jun</div>
        <div>26 Jun</div>
        <div>30 Jun</div>
      </div>
      
      {/* Chart line using SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Area under the curve with gradient fill */}
        <path
          d="M0,80 C10,70 15,75 20,60 C25,45 30,55 35,50 C40,45 45,30 50,35 C55,40 60,20 65,25 C70,30 75,15 80,20 C85,25 90,10 95,15 L95,100 L0,100 Z"
          fill="url(#gradient)"
          fillOpacity="0.2"
          stroke="none"
        />
        {/* Main line with gradient */}
        <path
          d="M0,80 C10,70 15,75 20,60 C25,45 30,55 35,50 C40,45 45,30 50,35 C55,40 60,20 65,25 C70,30 75,15 80,20 C85,25 90,10 95,15"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#02B1C4" />
            <stop offset="100%" stopColor="#FF4797" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#02B1C4" />
            <stop offset="100%" stopColor="#FF4797" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Data points */}
      {[
        { x: 0, y: 80 },
        { x: 20, y: 60 },
        { x: 35, y: 50 },
        { x: 50, y: 35 },
        { x: 65, y: 25 },
        { x: 80, y: 20 },
        { x: 95, y: 15 },
      ].map((point, i) => (
        <div
          key={i}
          className="absolute h-3 w-3 rounded-full bg-white shadow-md"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            border: '2px solid',
            borderImage: 'linear-gradient(to right, #02B1C4, #FF4797) 1',
          }}
        />
      ))}
    </div>
  );
};

// Main component that wraps the chart in a card
const CustomReviewChart = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-none shadow-md mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-[#2F2F4C]">
          Evolución de reseñas en los últimos 30 días
        </CardTitle>
        <CardDescription className="text-[#2F2F4C]/70">
          Tendencia de reseñas diarias
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ReviewChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomReviewChart;
