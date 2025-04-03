
import { MessageSquare, ThumbsUp, Star, Clock } from 'lucide-react';
import React from 'react';

// Updates to include more years and quarters
export const currentYear = new Date().getFullYear();
export const availableYears = [currentYear, currentYear - 1, currentYear - 2];
export const quarters = ["Q1 (Ene-Mar)", "Q2 (Abr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dic)"];
export const months = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// Updated mock data to include year
export const defaultGoals = [{
  id: 1,
  title: 'Reseñas mensuales',
  description: 'Número total de reseñas a conseguir este mes',
  current: 32,
  target: 50,
  unit: 'reseñas',
  icon: <MessageSquare className="h-5 w-5" />,
  month: 'junio',
  year: 2023
}, {
  id: 2,
  title: 'Sentimiento positivo',
  description: 'Porcentaje de reseñas positivas',
  current: 78,
  target: 85,
  unit: '%',
  icon: <ThumbsUp className="h-5 w-5" />,
  month: 'junio',
  year: 2023
}, {
  id: 3,
  title: 'Puntuación media',
  description: 'Calificación media de las reseñas',
  current: 4.6,
  target: 4.8,
  unit: 'estrellas',
  icon: <Star className="h-5 w-5" />,
  month: 'junio',
  year: 2023
}, {
  id: 4,
  title: 'Tiempo de respuesta',
  description: 'Tiempo medio para responder a las reseñas',
  current: 8,
  target: 5,
  unit: 'horas',
  icon: <Clock className="h-5 w-5" />,
  month: 'junio',
  year: 2023,
  inverted: true // Lower is better for this goal
}, {
  id: 5,
  title: 'Reseñas mensuales',
  description: 'Número total de reseñas a conseguir este mes',
  current: 40,
  target: 50,
  unit: 'reseñas',
  icon: <MessageSquare className="h-5 w-5" />,
  month: 'julio',
  year: 2023
}, {
  id: 6,
  title: 'Puntuación media',
  description: 'Calificación media de las reseñas',
  current: 4.7,
  target: 4.8,
  unit: 'estrellas',
  icon: <Star className="h-5 w-5" />,
  month: 'enero',
  year: 2024
}];

// Historical summary data by year and quarter
export const historicalSummary = [
  { year: 2023, quarter: "Q1", goalsCompleted: 8, totalGoals: 12 },
  { year: 2023, quarter: "Q2", goalsCompleted: 10, totalGoals: 12 },
  { year: 2023, quarter: "Q3", goalsCompleted: 7, totalGoals: 12 },
  { year: 2023, quarter: "Q4", goalsCompleted: 9, totalGoals: 12 },
  { year: 2024, quarter: "Q1", goalsCompleted: 5, totalGoals: 9 }
];
