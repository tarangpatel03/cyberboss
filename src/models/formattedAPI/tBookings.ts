import {
  ApiBookingBillCount,
  ApiBookingHistoryModel,
  ApiBookingDetailsModel,
  ApiHomeBookingModel,
  ApiBookingExpertise,
  ApiReviewModel,
} from '@models/api/bookings';

export type TBookingBillCount = {
  hours: number;
  consultantId: string;
};

export type TBookingHistoryModel = {
  id: string;
  bookingId: string;
  userId: string;
  consultantId?: string;
  userName: string;
  userProfilePicture: number | string | { uri: string } | undefined;
  platformPercentage: number;
  platformPercentageConsultant: number;
  bookingDate: string;
  status: string;
  categoryName: string;
  discountAmount: number;
  total: string;
  grandTotal: number;
  hours: number;
};

export type THomeBookingModel = {
  id: string;
  bookingId: string;
  userId: string;
  consultantId?: string;
  userName: string;
  userProfilePicture: number | string | { uri: string } | undefined;
  platformPercentage: number;
  platformPercentageConsultant: number;
  bookingDate: string;
  status: string;
  categoryName: string;
  discountAmount: number;
  total: string;
  grandTotal: number;
};

export type TBookingDetailsModel = {
  id: string;
  bookingId: string;
  userId: string;
  consultantId: string;
  userName: string;
  userProfilePicture: string | number | { uri: string } | undefined;
  platformPercentage: number;
  platformPercentageConsultant: number;
  bookingDate: string;
  status: string;
  categoryName: string;
  discountAmount: number;
  total: string;
  grandTotal: number;
  hours: number;
  hourlyRate: string;
  platformFee: string;
  tax: string;
  expertise: TBookingExpertise;
};

export type TReviewModel = {
  id: string;
  bookingId: string;
  rating: string;
  reviews: string;
  createdAt: string;
};

export type TBookingExpertise = {
  id: string;
  name: string;
  image: string | number | { uri: string } | undefined;
  description: string;
  rate: number;
  bookingCount: number | null;
};

export const transformBookingBillCount: (
  data: ApiBookingBillCount,
) => TBookingBillCount = (data: ApiBookingBillCount) => {
  return {
    consultantId: data.consultant_id,
    hours: data.hours,
  };
};

export const transformHomeBookingModel: (
  data: ApiHomeBookingModel,
) => THomeBookingModel = (data: ApiHomeBookingModel) => {
  return {
    id: data.id,
    total: data.total,
    status: data.status,
    userId: data.user_id,
    userName: data.user_name,
    bookingId: data.booking_id,
    grandTotal: data.grand_total,
    bookingDate: data.booking_date,
    categoryName: data.category_name,
    consultantId: data.consultant_id,
    discountAmount: data.discount_amount,
    platformPercentage: data.platform_percentage,
    userProfilePicture: data.user_profile_picture,
    platformPercentageConsultant: data.platform_percentage_consultant,
  };
};

export const transformBookingHistoryModel: (
  data: ApiBookingHistoryModel,
) => TBookingHistoryModel = (data: ApiBookingHistoryModel) => {
  return {
    id: data.id,
    hours: data.hours,
    total: data.total,
    status: data.status,
    userId: data.user_id,
    userName: data.user_name,
    bookingId: data.booking_id,
    grandTotal: data.grand_total,
    bookingDate: data.booking_date,
    categoryName: data.category_name,
    consultantId: data.consultant_id,
    discountAmount: data.discount_amount,
    platformPercentage: data.platform_percentage,
    userProfilePicture: data.user_profile_picture,
    platformPercentageConsultant: data.platform_percentage_consultant,
  };
};

const transformExpertise: (data: ApiBookingExpertise) => TBookingExpertise = (
  data: ApiBookingExpertise,
) => {
  return {
    bookingCount: data.booking_count,
    description: data.description,
    id: data.id,
    image: data.image,
    name: data.name,
    rate: data.rate,
  };
};

export const transformReviewModel: (data: ApiReviewModel) => TReviewModel = (
  data: ApiReviewModel,
) => {
  return {
    bookingId: data.booking_id,
    createdAt: data.created_at,
    id: data.id,
    rating: data.rating,
    reviews: data.reviews,
  };
};

export const transformBookingDetailsModel: (
  data: ApiBookingDetailsModel,
) => TBookingDetailsModel = (data: ApiBookingDetailsModel) => {
  return {
    bookingDate: data.booking_date,
    bookingId: data.booking_id,
    categoryName: data.category_name,
    grandTotal: data.grand_total,
    hours: data.hours,
    id: data.id,
    status: data.status,
    expertise: transformExpertise(data.expertise),
    hourlyRate: data.hourly_rate,
    platformFee: data.platform_fee,
    tax: data.tax,
    total: data.total,
    consultantId: data.consultant_id,
    discountAmount: data.discount_amount,
    platformPercentage: data.platform_percentage,
    platformPercentageConsultant: data.platform_percentage_consultant,
    userId: data.user_id,
    userName: data.user_name,
    userProfilePicture: data.user_profile_picture,
  };
};
