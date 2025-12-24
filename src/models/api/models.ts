export type ApiNotificationModel = {
  id: string;
  title: string;
  body: string;
  notifiable_id: string;
  created_at: string;
  image: string;
};

export type ApiExpertiesModel = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: string;
  booking_count: number | null;
};

export type ApiWorkshopModel = {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  link: string;
};

export type ApiConsultantModel = {
  id: string;
  name: string;
  experience_year: string;
  profile_picture: string | undefined;
  rating: number;
  bookings: number;
};

export type ApiClientHomeModel = {
  is_subscriber: boolean;
  bookings: any[];
  expertises: ApiExpertiesModel[];
  workshops: ApiWorkshopModel[];
};

export type ApiConsultantDetailsModel = {
  id: string;
  name: string;
  profile_picture: string | undefined;
  bio: string;
  experience_year: string;
  rate: string;
  bookings_count: number;
  expertises: Expertises[];
  services: Services[];
  total_ratings: number;
  average_ratings: number;
  rating_reviews: any[];
};

export type Services = {
  id: string;
  name: string;
};

export type Expertises = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: number;
  booking_count: number | null;
};

export type ApiBillDetailsModel = {
  hourly_rate: number;
  hours: number;
  total: number;
  platform_fee: number;
  platform_percentage: number;
  tax: number;
  grand_total: number;
};

export type ApiChatBotChatModel = {
  session_id: string;
  request: string;
  response: string;
  created_at: string;
};

export type ApiProfileModel = {
  id: string;
  name: string;
  email: string;
  phone_number: number | null;
  profile_picture: number | { uri: string } | undefined;
  role: 'client' | 'consultant';
  bio: string | null;
  experience_year: string | number | null;
  rate: number | null;
  expertises: Expertises[];
  services: Services[];
  is_verified: boolean | null;
  login_type: string;
  profile_setup: boolean;
};

export type ApiBookingBillCount = {
  hours: number;
  consultant_id: string;
};

export type ApiUpdateProfile = {
  name: string;
  profile_picture: number | { uri: string } | undefined;
};

export type ApiBookingHistoryModel = {
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

export type ApiBookingDetailsModel = {
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

export type ConsultantHomeBookingModel = {
  id: string;
  consultant_name: string;
  consultant_profile_picture: string | null;
  booking_date: string;
  category_name: string;
  grand_total: string;
};

export type ConsultantHomeNotificationModel = {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
};

export type ApiConsultantHomeModel = {
  total_earnings: string;
  wallet_balance: number;
  average_rating: number;
  bookings: ConsultantHomeBookingModel[];
  notification: ConsultantHomeNotificationModel[];
};
