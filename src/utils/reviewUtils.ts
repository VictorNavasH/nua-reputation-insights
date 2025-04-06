
/**
 * Formats a date string to local format
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Fecha desconocida';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
};

/**
 * Determines sentiment based on rating
 */
export const determineSentiment = (rating: number): 'positive' | 'neutral' | 'negative' => {
  if (rating >= 4) return 'positive';
  if (rating >= 3) return 'neutral';
  return 'negative';
};
