import { format, parseISO, isValid, addWeeks } from 'date-fns';

export const datetimeDisplay = (date: any) => {
  if (!date || typeof date !== 'string') return '-';
  const parsedDate = parseISO(date);
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
  const now = new Date();
  const messageTime = new Date(createdAt);

  if (isNaN(messageTime.getTime())) return 'Invalid date';

  const diffInMinutes = Math.floor(
    (now.getTime() - messageTime.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d`;
  }
};
