import {
  ApiClientHomeModel,
  ConsultantHomeBookingModel,
  ConsultantHomeNotificationModel,
  ApiConsultantHomeModel,
} from '../api/home';
import {
  IExpertiesModel,
  IWorkshopModel,
  transformExpertiesModel,
  transformWorkshopModel,
} from './tConsultant';

export type IClientHomeModel = {
  isSubscriber: boolean;
  bookings: any[];
  expertises: IExpertiesModel[];
  workshops: IWorkshopModel[];
};

export type IConsultantHomeBookingModel = {
  id: string;
  consultantName: string;
  consultantProfilePicture: string | null;
  bookingDate: string;
  categoryName: string;
  grandTotal: string;
};

export type IConsultantHomeNotificationModel = {
  id: string;
  title: string;
  body: string | null;
  createdAt: string;
};

export type IConsultantHomeModel = {
  totalEarnings: string;
  walletBalance: number;
  averageRating: number;
  bookings: IConsultantHomeBookingModel[];
  notification: IConsultantHomeNotificationModel[];
};

export const transformClientHomeModal: (
  data: ApiClientHomeModel,
) => IClientHomeModel = (data: ApiClientHomeModel) => {
  return {
    bookings: data.bookings.map(r => r) ?? [],
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
  data: ConsultantHomeBookingModel,
) => IConsultantHomeBookingModel = (data: ConsultantHomeBookingModel) => {
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
  data: ConsultantHomeNotificationModel,
) => IConsultantHomeNotificationModel = (
  data: ConsultantHomeNotificationModel,
) => {
  return {
    id: data.id,
    body: data.body,
    title: data.title,
    createdAt: data.created_at,
  };
};

export const transformConsultantHomeModel: (
  data: ApiConsultantHomeModel,
) => IConsultantHomeModel = (data: ApiConsultantHomeModel) => {
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
