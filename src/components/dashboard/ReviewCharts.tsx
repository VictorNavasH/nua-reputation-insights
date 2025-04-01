
import React from 'react';
import { TimeSeriesPoint } from '@/types/dashboard';

interface ChartProps {
  data: TimeSeriesPoint[];
}

// Chart component for 30 days view
export const ThirtyDaysChart: React.FC<ChartProps> = ({ data }) => {
  // Extraemos los puntos de datos clave para mapearlos a las posiciones de los puntos en el SVG
  const dataPoints = React.useMemo(() => {
    // Seleccionar puntos representativos para mostrar en el gráfico
    const points = [];
    
    // Asegúrate de incluir al menos algunos puntos para una visualización adecuada
    if (data.length > 0) {
      // Añadir el primer punto
      points.push({
        x: 0,
        y: 100 - (data[0].reviews * 10), // Convertir a posición Y (invertida para el SVG)
        value: data[0].reviews,
        date: data[0].date
      });
      
      // Añadir puntos intermedios
      const step = Math.floor(data.length / 5);
      for (let i = 1; i < 5; i++) {
        const index = i * step;
        if (index < data.length) {
          points.push({
            x: (index / (data.length - 1)) * 100,
            y: 100 - (data[index].reviews * 10),
            value: data[index].reviews,
            date: data[index].date
          });
        }
      }
      
      // Añadir el último punto
      const lastIndex = data.length - 1;
      points.push({
        x: 100,
        y: 100 - (data[lastIndex].reviews * 10),
        value: data[lastIndex].reviews,
        date: data[lastIndex].date
      });
    }
    
    return points;
  }, [data]);
  
  // Crear el path SVG para la línea y el área
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
      
      {/* Data points */}
      {dataPoints.map((point, i) => (
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
          title={`${point.date}: ${point.value} reseñas`}
        />
      ))}
    </div>
  );
};

// Chart component for 3 months view
export const ThreeMonthsChart: React.FC<ChartProps> = ({ data }) => {
  // Para la vista de 3 meses, los puntos son más simples
  const dataPoints = React.useMemo(() => {
    return data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - (item.reviews / 2), // Escala diferente para datos mensuales
      value: item.reviews,
      date: item.date
    }));
  }, [data]);
  
  // Crear el path SVG para la línea y el área
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
      
      {/* Data points */}
      {dataPoints.map((point, i) => (
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
          title={`${point.date}: ${point.value} reseñas`}
        />
      ))}
    </div>
  );
};
