import { ApiHomeBookingModel } from './bookings';
import { ApiExpertiseModel, ApiWorkshopModel } from './consultant';

export type ApiClientHomeModel = {
  is_subscriber: boolean;
  bookings: ApiHomeBookingModel[];
  expertises: ApiExpertiseModel[];
  workshops: ApiWorkshopModel[];
};

export type ConsultantHomeBookingModel = {
  id: string;
  consultant_name: string;
  consultant_profile_picture: string;
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
  bookings: ApiHomeBookingModel[];
  notification: ConsultantHomeNotificationModel[];
};
