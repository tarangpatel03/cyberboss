import {
  ApiBookingBillCount,
  ApiBookingHistoryModel,
  ApiBookingDetailsModel,
} from '../formattedAPI/tBookings';

export type IBookingBillCount = {
  hours: number;
  consultantId: string;
};

export type IBookingHistoryModel = {
  id: string;
  userId: string;
  consultantId: string;
  userName: string;
  userProfilePicture: number | { uri: string } | undefined;
  bookingDate: string;
  status: string;
  categoryName: string;
  grandTotal: string;
  bookingId: string;
  hours: number;
};

export type IBookingDetailsModel = {
  id: string;
  consultantName: string;
  consultantProfilePicture: number | { uri: string } | undefined;
  bookingDate: string;
  categoryName: string;
  grandTotal: string;
  bookingId: string;
  status: string;
  hours: number;
  hourlyRate: string;
  total: number;
  platformFee: number;
  tax: number;
  expertise: {
    id: string;
    name: string;
    image: string | null;
    description: string | null;
  };
};

export const transformBookingBillCount: (
  data: ApiBookingBillCount,
) => IBookingBillCount = (data: ApiBookingBillCount) => {
  return {
    consultantId: data.consultant_id,
    hours: data.hours,
  };
};

export const transformBookingHistoyModel: (
  data: ApiBookingHistoryModel,
) => IBookingHistoryModel = (data: ApiBookingHistoryModel) => {
  return {
    bookingDate: data.booking_date,
    bookingId: data.booking_id,
    categoryName: data.category_name,
    consultantId: data.consultant_id,
    grandTotal: data.grand_total,
    hours: data.hours,
    id: data.id,
    status: data.status,
    userId: data.user_id,
    userName: data.user_name,
    userProfilePicture: data.user_profile_picture,
  };
};

export const transformBookingDetailsModel: (
  data: ApiBookingDetailsModel,
) => IBookingDetailsModel = (data: ApiBookingDetailsModel) => {
  return {
    bookingDate: data.booking_date,
    bookingId: data.booking_id,
    categoryName: data.category_name,
    grandTotal: data.grand_total,
    hours: data.hours,
    id: data.id,
    status: data.status,
    consultantName: data.consultant_name,
    consultantProfilePicture: data.consultant_profile_picture,
    expertise: data.expertise,
    hourlyRate: data.hourly_rate,
    platformFee: data.platform_fee,
    tax: data.tax,
    total: data.total,
  };
};
