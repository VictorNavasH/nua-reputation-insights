
import { MessageSquareIcon, ThumbsUpIcon, StarIcon, ClockIcon } from './GoalIcons';

// Updates to include years back to 2020
export const currentYear = new Date().getFullYear();
export const availableYears = [
  currentYear, 
  currentYear - 1, 
  currentYear - 2,
  currentYear - 3,
  currentYear - 4,
  currentYear - 5
];
export const quarters = ["Q1 (Ene-Mar)", "Q2 (Abr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dic)"];
export const months = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// Updated mock data to include year and icon names instead of JSX elements
export const defaultGoals = [{
  id: 1,
  title: 'Reseñas mensuales',
  description: 'Número total de reseñas a conseguir este mes',
  current: 32,
  target: 50,
  unit: 'reseñas',
  iconName: 'MessageSquare',
  month: 'junio',
  year: 2023
}, {
  id: 2,
  title: 'Sentimiento positivo',
  description: 'Porcentaje de reseñas positivas',
  current: 78,
  target: 85,
  unit: '%',
  iconName: 'ThumbsUp',
  month: 'junio',
  year: 2023
}, {
  id: 3,
  title: 'Puntuación media',
  description: 'Calificación media de las reseñas',
  current: 4.6,
  target: 4.8,
  unit: 'estrellas',
  iconName: 'Star',
  month: 'junio',
  year: 2023
}, {
  id: 4,
  title: 'Tiempo de respuesta',
  description: 'Tiempo medio para responder a las reseñas',
  current: 8,
  target: 5,
  unit: 'horas',
  iconName: 'Clock',
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
  iconName: 'MessageSquare',
  month: 'julio',
  year: 2023
}, {
  id: 6,
  title: 'Puntuación media',
  description: 'Calificación media de las reseñas',
  current: 4.7,
  target: 4.8,
  unit: 'estrellas',
  iconName: 'Star',
  month: 'enero',
  year: 2024
}];

// Historical summary data by year and quarter - expanded to include more years
export const historicalSummary = [
  // 2020 data
  { year: 2020, quarter: "Q1", goalsCompleted: 6, totalGoals: 10 },
  { year: 2020, quarter: "Q2", goalsCompleted: 7, totalGoals: 10 },
  { year: 2020, quarter: "Q3", goalsCompleted: 8, totalGoals: 10 },
  { year: 2020, quarter: "Q4", goalsCompleted: 9, totalGoals: 10 },
  
  // 2021 data
  { year: 2021, quarter: "Q1", goalsCompleted: 7, totalGoals: 10 },
  { year: 2021, quarter: "Q2", goalsCompleted: 8, totalGoals: 11 },
  { year: 2021, quarter: "Q3", goalsCompleted: 9, totalGoals: 11 },
  { year: 2021, quarter: "Q4", goalsCompleted: 10, totalGoals: 11 },
  
  // 2022 data
  { year: 2022, quarter: "Q1", goalsCompleted: 8, totalGoals: 11 },
  { year: 2022, quarter: "Q2", goalsCompleted: 9, totalGoals: 12 },
  { year: 2022, quarter: "Q3", goalsCompleted: 8, totalGoals: 12 },
  { year: 2022, quarter: "Q4", goalsCompleted: 11, totalGoals: 12 },
  
  // 2023 data
  { year: 2023, quarter: "Q1", goalsCompleted: 8, totalGoals: 12 },
  { year: 2023, quarter: "Q2", goalsCompleted: 10, totalGoals: 12 },
  { year: 2023, quarter: "Q3", goalsCompleted: 7, totalGoals: 12 },
  { year: 2023, quarter: "Q4", goalsCompleted: 9, totalGoals: 12 },
  
  // 2024 data
  { year: 2024, quarter: "Q1", goalsCompleted: 5, totalGoals: 9 }
];
