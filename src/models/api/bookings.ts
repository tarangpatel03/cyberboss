export type apiBookingBillCount = {
  hours: number;
  consultant_id: string;
};

export type apiBookingHistoryModel = {
  id: string;
  booking_id: string;
  user_id: string;
  consultant_id: string;
  user_name: string;
  user_profile_picture: number | string | { uri: string } | undefined;
  platform_percentage: number;
  platform_percentage_consultant: number;
  booking_date: string;
  status: string;
  category_name: string;
  discount_amount: number;
  total: string;
  grand_total: number;
  hours: number;
};

export type apiBookingDetailsModel = {
  id: string;
  booking_id: string;
  user_id: string;
  consultant_id: string;
  user_name: string;
  user_profile_picture: string | number | { uri: string } | undefined;
  platform_percentage: number;
  platform_percentage_consultant: number;
  booking_date: string;
  status: string;
  category_name: string;
  discount_amount: number;
  total: string;
  grand_total: number;
  hours: number;
  hourly_rate: string;
  platform_fee: string;
  tax: string;
  expertise: apiBookingExpertise;
};

export type apiReviewModel = {
  id: string;
  booking_id: string;
  rating: string;
  reviews: string;
  created_at: string;
};

export type apiBookingExpertise = {
  id: string;
  name: string;
  image: string | number | { uri: string } | undefined;
  description: string;
  rate: number;
  booking_count: number | null;
};

export type apiHomeBookingModel = {
  id: string;
  consultant_name: string;
  consultant_profile_picture: string;
  booking_date: string;
  category_name: string;
  grand_total: string;
};
