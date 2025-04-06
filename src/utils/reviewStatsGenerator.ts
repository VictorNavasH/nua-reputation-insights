
import { Review, ReviewStatsTimeSeries } from '@/types/reviews';
import { TimeSeriesPoint } from '@/types/dashboard';
import { parseSpanishDateString, monthMap } from '@/utils/dateUtils';

/**
 * Generates statistics for the last 30 days
 */
export const generateThirtyDaysStats = (reviews: Review[]): TimeSeriesPoint[] => {
  const thirtyDaysData: TimeSeriesPoint[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  
  console.log("Generating stats for 30 days from", thirtyDaysAgo, "to", now);
  
  // Create a map for each day in the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    
    thirtyDaysData.push({
      date: formattedDate,
      reviews: 0,
      rating: 0
    });
  }
  
  // Count reviews for each day
  reviews.forEach(review => {
    try {
      console.log("Processing review date:", review.date);
      
      const reviewDate = parseSpanishDateString(review.date);
      
      if (reviewDate && reviewDate >= thirtyDaysAgo && reviewDate <= now) {
        const formattedReviewDate = reviewDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        console.log("Formatted review date for comparison:", formattedReviewDate);
        
        // Find matching day in our prepared array
        const dayIndex = thirtyDaysData.findIndex(day => day.date === formattedReviewDate);
        console.log("Found at index:", dayIndex);
        
        if (dayIndex !== -1) {
          thirtyDaysData[dayIndex].reviews += 1;
          thirtyDaysData[dayIndex].rating = thirtyDaysData[dayIndex].rating || 0;
          thirtyDaysData[dayIndex].rating += review.rating;
        }
      }
    } catch (err) {
      console.error('Error processing review date:', err, review.date);
    }
  });
  
  // Calculate average ratings
  thirtyDaysData.forEach(day => {
    if (day.reviews > 0) {
      day.rating = parseFloat((day.rating / day.reviews).toFixed(1));
    }
  });
  
  return thirtyDaysData;
};

/**
 * Generates statistics for the last 3 months
 */
export const generateThreeMonthsStats = (reviews: Review[]): TimeSeriesPoint[] => {
  const threeMonthsData: TimeSeriesPoint[] = [];
  const now = new Date();
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  // Create last 3 months
  for (let i = 2; i >= 0; i--) {
    const monthDate = new Date();
    monthDate.setMonth(now.getMonth() - i);
    
    threeMonthsData.push({
      date: monthNames[monthDate.getMonth()],
      reviews: 0,
      rating: 0
    });
  }
  
  // Count reviews for each month
  reviews.forEach(review => {
    try {
      const dateParts = review.date.split(' ');
      if (dateParts.length >= 3) {
        const month = monthMap[dateParts[1].toLowerCase()];
        const year = parseInt(dateParts[2]);
        
        if (month !== undefined && !isNaN(year)) {
          const reviewDate = new Date(year, month, 1);
          const monthsAgo = (now.getFullYear() - reviewDate.getFullYear()) * 12 + now.getMonth() - reviewDate.getMonth();
          
          if (monthsAgo >= 0 && monthsAgo < 3) {
            const monthIndex = 2 - monthsAgo; // Convert to index in our array
            threeMonthsData[monthIndex].reviews += 1;
            threeMonthsData[monthIndex].rating = threeMonthsData[monthIndex].rating || 0;
            threeMonthsData[monthIndex].rating += review.rating;
          }
        }
      }
    } catch (err) {
      console.error('Error processing review date for monthly stats:', err);
    }
  });
  
  // Calculate average ratings for months
  threeMonthsData.forEach(month => {
    if (month.reviews > 0) {
      month.rating = parseFloat((month.rating / month.reviews).toFixed(1));
    }
  });
  
  return threeMonthsData;
};

/**
 * Generates statistics for the entire year
 */
export const generateYearStats = (reviews: Review[]): TimeSeriesPoint[] => {
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const yearData: TimeSeriesPoint[] = monthNames.map(month => ({
    date: month,
    reviews: 0,
    rating: 0
  }));
  
  // Populate with actual data where available
  reviews.forEach(review => {
    try {
      const dateParts = review.date.split(' ');
      if (dateParts.length >= 3) {
        const month = monthMap[dateParts[1].toLowerCase()];
        
        if (month !== undefined) {
          yearData[month].reviews += 1;
          yearData[month].rating = yearData[month].rating || 0;
          yearData[month].rating += review.rating;
        }
      }
    } catch (err) {
      console.error('Error processing review date for yearly stats:', err);
    }
  });
  
  // Calculate average ratings for year
  yearData.forEach(month => {
    if (month.reviews > 0) {
      month.rating = parseFloat((month.rating / month.reviews).toFixed(1));
    }
  });
  
  return yearData;
};

/**
 * Generates all time series statistics for reviews
 */
export const generateReviewStats = (reviews: Review[]): ReviewStatsTimeSeries => {
  const thirtyDaysData = generateThirtyDaysStats(reviews);
  const threeMonthsData = generateThreeMonthsStats(reviews);
  const yearData = generateYearStats(reviews);
  
  return {
    thirtyDays: thirtyDaysData,
    threeMonths: threeMonthsData,
    year: yearData
  };
};
