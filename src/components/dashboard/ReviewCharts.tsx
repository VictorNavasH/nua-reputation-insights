
import React from 'react';
import { TimeSeriesPoint } from '@/types/dashboard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChartProps {
  data: TimeSeriesPoint[];
}

// Chart component for 30 days view
export const ThirtyDaysChart: React.FC<ChartProps> = ({ data }) => {
  console.log("30 Days data in chart:", data);
  
  // Extract data points for mapping to SVG positions
  const dataPoints = React.useMemo(() => {
    // Select representative points to show on the chart
    const points = [];
    
    // Make sure there are data points to show
    if (data.length > 0) {
      // Find the maximum review count for scaling
      const maxReviews = Math.max(...data.map(item => item.reviews));
      // Use at least 10 as the max scale or the actual maximum if higher
      const yScale = maxReviews < 10 ? 10 : maxReviews;
      
      // Add the first point
      points.push({
        x: 0,
        y: 100 - ((data[0].reviews / yScale) * 100), // Convert to Y position (inverted for SVG)
        value: data[0].reviews,
        date: data[0].date,
        rating: data[0].rating || 0
      });
      
      // Add intermediate points
      const step = Math.floor(data.length / 5);
      for (let i = 1; i < 5; i++) {
        const index = i * step;
        if (index < data.length) {
          points.push({
            x: (index / (data.length - 1)) * 100,
            y: 100 - ((data[index].reviews / yScale) * 100),
            value: data[index].reviews,
            date: data[index].date,
            rating: data[index].rating || 0
          });
        }
      }
      
      // Add the last point
      const lastIndex = data.length - 1;
      points.push({
        x: 100,
        y: 100 - ((data[lastIndex].reviews / yScale) * 100),
        value: data[lastIndex].reviews,
        date: data[lastIndex].date,
        rating: data[lastIndex].rating || 0
      });
    }
    
    return points;
  }, [data]);
  
  console.log("Calculated dataPoints for chart:", dataPoints);
  
  // Create SVG path for the line and area
  const linePath = React.useMemo(() => {
    if (dataPoints.length < 2) return "";
    return dataPoints.map((point, i) => 
      (i === 0 ? `M${point.x},${point.y}` : ` C${point.x - 10},${dataPoints[i-1].y} ${point.x - 10},${point.y} ${point.x},${point.y}`)
    ).join("");
  }, [dataPoints]);
  
  const areaPath = React.useMemo(() => {
    if (dataPoints.length < 2) return "";
    return linePath + ` L${dataPoints[dataPoints.length-1].x},100 L0,100 Z`;
  }, [linePath, dataPoints]);
  
  // Get the y-axis labels based on the data
  const yAxisLabels = React.useMemo(() => {
    if (data.length === 0) return [0, 2, 4, 6, 8, 10];
    
    // Find the maximum number of reviews
    const maxReviews = Math.max(...data.map(item => item.reviews));
    // Round up to a nice number
    const maxScale = maxReviews < 10 ? 10 : Math.ceil(maxReviews / 5) * 5;
    
    // Create 6 evenly spaced labels
    return Array.from({ length: 6 }, (_, i) => Math.round((5 - i) * maxScale / 5));
  }, [data]);
  
  return (
    <div className="relative h-full w-full pl-8">
      {/* Background grid for the chart */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="border-b border-r border-[#2F2F4C]/10"></div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute -left-6 top-0 flex h-full flex-col justify-between py-2 text-xs text-[#2F2F4C]/70">
        {yAxisLabels.map((value, index) => (
          <div key={index} className="w-6 text-right">{value}</div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="absolute -bottom-6 left-0 flex w-full justify-between px-2 text-xs text-[#2F2F4C]/70">
        {data.length > 0 && (
          <>
            <div>{data[0].date}</div>
            <div>{data[Math.floor(data.length / 5)].date}</div>
            <div>{data[Math.floor(data.length * 2/5)].date}</div>
            <div>{data[Math.floor(data.length * 3/5)].date}</div>
            <div>{data[Math.floor(data.length * 4/5)].date}</div>
            <div>{data[data.length - 1].date}</div>
          </>
        )}
      </div>
      
      {/* Chart line using SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Area under the curve with gradient fill */}
        <path
          d={areaPath}
          fill="url(#gradient)"
          fillOpacity="0.2"
          stroke="none"
        />
        {/* Main line with gradient */}
        <path
          d={linePath}
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
      
      {/* Data points with tooltips */}
      <TooltipProvider>
        {dataPoints.map((point, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className="absolute h-3 w-3 rounded-full bg-white shadow-md cursor-pointer"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -50%)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(to right, #02B1C4, #FF4797) 1',
                }}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white p-2 rounded-md shadow-lg border border-gray-200 text-sm">
              <div className="font-medium">{point.date}</div>
              <div className="text-[#02B1C4]">{point.value} {point.value === 1 ? 'reseña' : 'reseñas'}</div>
              {point.rating > 0 && (
                <div className="text-[#FF4797]">Puntuación: {point.rating.toFixed(1)}</div>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

// Chart component for 3 months view
export const ThreeMonthsChart: React.FC<ChartProps> = ({ data }) => {
  console.log("3 Months data in chart:", data);
  
  // For the 3-month view, points are simpler
  const dataPoints = React.useMemo(() => {
    // Find the maximum review count for scaling
    const maxReviews = data.length > 0 ? Math.max(...data.map(item => item.reviews)) : 50;
    // Use at least 50 as the max scale or the actual maximum if higher
    const yScale = maxReviews < 50 ? 50 : maxReviews;
    
    return data.map((item, index) => ({
      x: (index / Math.max(1, data.length - 1)) * 100, // Avoid division by zero
      y: 100 - ((item.reviews / yScale) * 100), // Scale reviews value to percentage
      value: item.reviews,
      date: item.date,
      rating: item.rating || 0
    }));
  }, [data]);
  
  // Create SVG path for the line and area
  const linePath = React.useMemo(() => {
    if (dataPoints.length < 2) return "";
    return dataPoints.map((point, i) => 
      (i === 0 ? `M${point.x},${point.y}` : ` C${point.x - 15},${dataPoints[i-1].y} ${point.x - 15},${point.y} ${point.x},${point.y}`)
    ).join("");
  }, [dataPoints]);
  
  const areaPath = React.useMemo(() => {
    if (dataPoints.length < 2) return "";
    return linePath + ` L${dataPoints[dataPoints.length-1].x},100 L0,100 Z`;
  }, [linePath, dataPoints]);
  
  // Get the y-axis labels based on the data
  const yAxisLabels = React.useMemo(() => {
    if (data.length === 0) return [0, 10, 20, 30, 40, 50];
    
    // Find the maximum number of reviews
    const maxReviews = Math.max(...data.map(item => item.reviews));
    // Round up to a nice number
    const maxScale = maxReviews < 50 ? 50 : Math.ceil(maxReviews / 10) * 10;
    
    // Create 6 evenly spaced labels
    return Array.from({ length: 6 }, (_, i) => Math.round((5 - i) * maxScale / 5));
  }, [data]);
  
  return (
    <div className="relative h-full w-full pl-8">
      {/* Background grid for the chart */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="border-b border-r border-[#2F2F4C]/10"></div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute -left-6 top-0 flex h-full flex-col justify-between py-2 text-xs text-[#2F2F4C]/70">
        {yAxisLabels.map((value, index) => (
          <div key={index} className="w-6 text-right">{value}</div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="absolute -bottom-6 left-0 flex w-full justify-between px-2 text-xs text-[#2F2F4C]/70">
        {data.map((item, index) => (
          <div key={index}>{item.date}</div>
        ))}
      </div>
      
      {/* Chart line using SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Area under the curve with gradient fill */}
        <path
          d={areaPath}
          fill="url(#gradient)"
          fillOpacity="0.2"
          stroke="none"
        />
        {/* Main line with gradient */}
        <path
          d={linePath}
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
      
      {/* Data points with tooltips */}
      <TooltipProvider>
        {dataPoints.map((point, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className="absolute h-3 w-3 rounded-full bg-white shadow-md cursor-pointer"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -50%)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(to right, #02B1C4, #FF4797) 1',
                }}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white p-2 rounded-md shadow-lg border border-gray-200 text-sm">
              <div className="font-medium">{point.date}</div>
              <div className="text-[#02B1C4]">{point.value} {point.value === 1 ? 'reseña' : 'reseñas'}</div>
              {point.rating > 0 && (
                <div className="text-[#FF4797]">Puntuación media: {point.rating.toFixed(1)}</div>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};
