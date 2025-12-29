import {
  apiClientHomeModel,
  consultantHomeBookingModel,
  consultantHomeNotificationModel,
  apiConsultantHomeModel,
} from '../api/home';
import { tHomeBookingModel, transformHomeBookingModel } from './tBookings';
import {
  tExpertiesModel,
  tWorkshopModel,
  transformExpertiesModel,
  transformWorkshopModel,
} from './tConsultant';

export type tClientHomeModel = {
  isSubscriber: boolean;
  bookings: tHomeBookingModel[];
  expertises: tExpertiesModel[];
  workshops: tWorkshopModel[];
};

export type tConsultantHomeBookingModel = {
  id: string;
  consultantName: string;
  consultantProfilePicture: string | null;
  bookingDate: string;
  categoryName: string;
  grandTotal: string;
};

export type tConsultantHomeNotificationModel = {
  id: string;
  title: string;
  body: string | null;
  createdAt: string;
};

export type tConsultantHomeModel = {
  totalEarnings: string;
  walletBalance: number;
  averageRating: number;
  bookings: tConsultantHomeBookingModel[];
  notification: tConsultantHomeNotificationModel[];
};

export const transformClientHomeModal: (
  data: apiClientHomeModel,
) => tClientHomeModel = (data: apiClientHomeModel) => {
  return {
    bookings: data.bookings.map(r => transformHomeBookingModel(r)) ?? [],
    expertises: data.expertises
      ? data.expertises.map(r => transformExpertiesModel(r))
      : [],
    isSubscriber: data.is_subscriber,
    workshops: data.workshops
      ? data.workshops.map(r => transformWorkshopModel(r))
      : [],
  };
};

export const transformConsultantHomeBookings: (
  data: consultantHomeBookingModel,
) => tConsultantHomeBookingModel = (data: consultantHomeBookingModel) => {
  return {
    id: data.id,
    grandTotal: data.grand_total,
    bookingDate: data.booking_date,
    categoryName: data.category_name,
    consultantName: data.consultant_name,
    consultantProfilePicture: data.consultant_profile_picture,
  };
};

export const transformConsultantHomeNotification: (
  data: consultantHomeNotificationModel,
) => tConsultantHomeNotificationModel = (
  data: consultantHomeNotificationModel,
) => {
  return {
    id: data.id,
    body: data.body,
    title: data.title,
    createdAt: data.created_at,
  };
};

export const transformConsultantHomeModel: (
  data: apiConsultantHomeModel,
) => tConsultantHomeModel = (data: apiConsultantHomeModel) => {
  return {
    walletBalance: data.wallet_balance,
    totalEarnings: data.total_earnings,
    averageRating: data.average_rating,
    bookings: data.bookings.map(r => transformConsultantHomeBookings(r)),
    notification: data.notification.map(r =>
      transformConsultantHomeNotification(r),
    ),
  };
};
