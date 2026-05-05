import { format, isValid } from 'date-fns';

export const datetimeDisplay = (date: any) => {
  if (!date) return '-';
  const parsed = new Date(date);
  if (!isValid(parsed)) {
    return '-';
  }
  return format(parsed, 'dd/MM/yyyy'); // or 'dd/MM/yyyy HH:mm:ss'
};
