export const getDate = (date: string) => {
  const dateVal = new Date(date);
  const formattedDate = dateVal.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  return formattedDate;
};

export const getFullDate = (date: string) => {
  const dateVal = new Date(date);
  const formattedDate = dateVal.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
};

export const getTime = (date: string) => {
  const dateVal = new Date(date);
  const formattedDate = dateVal.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateVal.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${formattedDate} at ${formattedTime}`;
};

export const formatBooking = (booking_count: number) => {
  if (booking_count === 1) {
    return `${booking_count} Booking`;
  } else {
    return `${booking_count} Bookings`;
  }
};
