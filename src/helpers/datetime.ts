import { format, parseISO, isValid, addWeeks, addHours, parse } from 'date-fns';

export const datetimeAvailable = (date: any) => {
  if (!date || typeof date !== 'string') return '-';

  try {
    const parsedDate = parseISO(date);
    if (!isValid(parsedDate)) return '-';
    return format(parsedDate, 'dd/MM/yyyy');
  } catch {
    return '-';
  }
};

export const datetimeDisplay = (date: any) => {
  if (!date || typeof date !== 'string') return '-';
  const parsedDate = parse(date, 'MM/dd/yyyy HH:mm:ss', new Date());

  if (!isValid(parsedDate)) return '-';
  return format(parsedDate, 'dd/MM/yyyy');
};

export const datetime1week = () => {
  const startDate = new Date();
  const endDate = addWeeks(startDate, 1);

  const start = format(startDate, 'dd-MM-yyyy');
  const end = format(endDate, 'dd-MM-yyyy');

  return {
    start,
    end
  };
};

export const datetime2week = () => {
  const startDate = new Date();
  const endDate = addWeeks(startDate, 2);

  const start = format(startDate, 'dd-MM-yyyy');
  const end = format(endDate, 'dd-MM-yyyy');

  return {
    start,
    end
  };
};

export const datatimeMessenger = (createdAt: string) => {
  if (!createdAt || typeof createdAt !== 'string') return '-';

  const parsedDate = parseISO(createdAt);
  if (!isValid(parsedDate)) return '-';

  const adjustedDate = addHours(parsedDate, 7);
  return format(adjustedDate, 'hh:mm:ss a');
};
