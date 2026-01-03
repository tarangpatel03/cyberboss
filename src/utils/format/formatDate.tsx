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
    hour12: true,
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

export const formatFirebaseTimestamp = (timestamp: any) => {
  if (!timestamp?._seconds) return '';

  const date = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6,
  );

  const messageDate = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const now = new Date();

  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (msgDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString('en-GB', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    });
  } else if (msgDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }

  return messageDate;
};
