export const parseDate = (dateStr: string): Date | undefined => {
  if (!dateStr) return undefined;
  
  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  const match = dateStr.match(regex);
  
  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  return undefined;
};

export const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return '';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
};