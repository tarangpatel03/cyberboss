export type ApiNotificationModal = {
  id: string;
  title: string;
  body: string;
  notifiable_id: string;
  created_at: string;
  image: string;
};

export type ApiExpertiesModal = {
  id: string;
  name: string;
  image: string;
  description: null;
  rate: string;
  booking_count: number;
};

export type ApiWorkshopModal = {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  link: string;
};

export type ApiConsultantModal = {
  id: string;
  name: string;
  experience_year: string;
  profile_picture: string | undefined;
  rating: number;
  bookings: number;
};

export type ApiClientHomeModal = {
  is_subscriber: boolean;
  bookings: any[];
  expertises: ApiExpertiesModal[];
  workshops: ApiWorkshopModal[];
};

export type ApiConsultantDetailsModal = {
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
  description: null;
  rate: number;
  booking_count: null;
};

export type ApiBillDetailsModal = {
  hourly_rate: number;
  hours: number;
  total: number;
  platform_fee: number;
  platform_percentage: number;
  tax: number;
  grand_total: number;
};

export type ApiChatBotChatModal = {
  session_id: string;
  request: string;
  response: string;
  created_at: string;
};

export type ApiProfileModal = {
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
