
/**
 * Maps Spanish month abbreviations to their numeric values
 */
export const monthMap: { [key: string]: number } = {
  'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
  'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
};

/**
 * Parses a date string in the format "5 abr 2024" into a Date object
 */
export const parseSpanishDateString = (dateString: string): Date | null => {
  try {
    const dateParts = dateString.split(' ');
    if (dateParts.length >= 3) {
      const day = parseInt(dateParts[0]);
      const month = monthMap[dateParts[1].toLowerCase()];
      const year = parseInt(dateParts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  } catch (err) {
    console.error('Error parsing date:', err);
    return null;
  }
};
