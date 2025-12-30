import { apiHomeBookingModel } from './bookings';
import { apiExpertiseModel, apiWorkshopModel } from './consultant';

export type apiClientHomeModel = {
  is_subscriber: boolean;
  bookings: apiHomeBookingModel[];
  expertises: apiExpertiseModel[];
  workshops: apiWorkshopModel[];
};

export type consultantHomeBookingModel = {
  id: string;
  consultant_name: string;
  consultant_profile_picture: string | null;
  booking_date: string;
  category_name: string;
  grand_total: string;
};

export type consultantHomeNotificationModel = {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
};

export type apiConsultantHomeModel = {
  total_earnings: string;
  wallet_balance: number;
  average_rating: number;
  bookings: consultantHomeBookingModel[];
  notification: consultantHomeNotificationModel[];
};
