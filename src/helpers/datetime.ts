import { format } from 'date-fns';

export const datetimeDisplay = (date: any) => {
  if (!date || isNaN(new Date(date).getTime())) return '-';
  date = new Date(date);
  return format(date, 'dd/MM/yyyy');
};