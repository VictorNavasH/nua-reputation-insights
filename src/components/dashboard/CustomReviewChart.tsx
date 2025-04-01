
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart } from 'lucide-react';

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

// Sample data for 3 months view
const ThreeMonthsChart = () => {
  return (
    <div className="relative h-full w-full">
      {/* Background grid for the chart */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="border-b border-r border-[#2F2F4C]/10"></div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute -left-8 top-0 flex h-full flex-col justify-between py-2 text-xs text-[#2F2F4C]/70">
        <div>40</div>
        <div>30</div>
        <div>20</div>
        <div>10</div>
        <div>0</div>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute -bottom-6 left-0 flex w-full justify-between px-2 text-xs text-[#2F2F4C]/70">
        <div>Abril</div>
        <div>Mayo</div>
        <div>Junio</div>
      </div>
      
      {/* Chart line using SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Area under the curve with gradient fill */}
        <path
          d="M10,60 C25,40 40,50 50,30 C60,45 75,30 90,40 L90,100 L10,100 Z"
          fill="url(#gradient)"
          fillOpacity="0.2"
          stroke="none"
        />
        {/* Main line with gradient */}
        <path
          d="M10,60 C25,40 40,50 50,30 C60,45 75,30 90,40"
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
        { x: 10, y: 60 },
        { x: 50, y: 30 },
        { x: 90, y: 40 },
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
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <AreaChart className="h-5 w-5 mr-2 text-[#02B1C4]" />
          <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
            Evolución de reseñas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30days">
          <TabsList className="mb-4">
            <TabsTrigger value="30days">Últimos 30 días</TabsTrigger>
            <TabsTrigger value="3months">Últimos 3 meses</TabsTrigger>
          </TabsList>
          <p className="text-sm text-[#2F2F4C]/70 mb-4">Cantidad de reseñas diarias recibidas</p>
          <TabsContent value="30days">
            <div className="h-[300px] w-full">
              <ReviewChart />
            </div>
          </TabsContent>
          <TabsContent value="3months">
            <div className="h-[300px] w-full">
              <ThreeMonthsChart />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomReviewChart;
