
export const calculateTotalRating = (rates?: { rating: string }[]): number => {
  if (!rates || rates.length === 0) return 0;
  return rates.reduce((sum, rate) => sum + parseFloat(rate.rating), 0);
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};
