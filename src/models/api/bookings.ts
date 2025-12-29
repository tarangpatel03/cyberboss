export type apiBookingBillCount = {
  hours: number;
  consultant_id: string;
};

export type apiBookingHistoryModel = {
  id: string;
  user_id: string;
  consultant_id: string;
  user_name: string;
  user_profile_picture: number | { uri: string } | undefined;
  booking_date: string;
  status: string;
  category_name: string;
  grand_total: string;
  booking_id: string;
  hours: number;
};

export type apiBookingDetailsModel = {
  id: string;
  consultant_name: string;
  consultant_profile_picture: number | { uri: string } | undefined;
  booking_date: string;
  category_name: string;
  grand_total: string;
  booking_id: string;
  status: string;
  hours: number;
  hourly_rate: string;
  total: number;
  platform_fee: number;
  tax: number;
  expertise: {
    id: string;
    name: string;
    image: string | null;
    description: string | null;
  };
};

export type apiHomeBookingModel = {
  id: string;
  consultant_name: string;
  consultant_profile_picture: string;
  booking_date: string;
  category_name: string;
  grand_total: string;
};
