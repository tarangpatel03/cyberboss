import {
  apiBookingBillCount,
  apiBookingHistoryModel,
  apiBookingDetailsModel,
  apiHomeBookingModel,
  apiBookingExpertise,
  apiReviewModel,
} from '../api/bookings';

export type tBookingBillCount = {
  hours: number;
  consultantId: string;
};

export type tBookingHistoryModel = {
  id: string;
  bookingId: string;
  userId: string;
  consultantId: string;
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

export type tHomeBookingModel = {
  id: string;
  consultantName: string;
  consultantProfilePicture: string;
  bookingDate: string;
  categoryName: string;
  grandTotal: string;
};

export type tBookingDetailsModel = {
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
  expertise: tBookingExpertise;
};

export type tReviewModel = {
  id: string;
  bookingId: string;
  rating: string;
  reviews: string;
  createdAt: string;
};

export type tBookingExpertise = {
  id: string;
  name: string;
  image: string | number | { uri: string } | undefined;
  description: string;
  rate: number;
  bookingCount: number | null;
};

export const transformBookingBillCount: (
  data: apiBookingBillCount,
) => tBookingBillCount = (data: apiBookingBillCount) => {
  return {
    consultantId: data.consultant_id,
    hours: data.hours,
  };
};

export const transformHomeBookingModel: (
  data: apiHomeBookingModel,
) => tHomeBookingModel = (data: apiHomeBookingModel) => {
  return {
    id: data.id,
    grandTotal: data.grand_total,
    bookingDate: data.booking_date,
    categoryName: data.category_name,
    consultantName: data.consultant_name,
    consultantProfilePicture: data.consultant_profile_picture,
  };
};

export const transformBookingHistoryModel: (
  data: apiBookingHistoryModel,
) => tBookingHistoryModel = (data: apiBookingHistoryModel) => {
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

const transformExpertise: (data: apiBookingExpertise) => tBookingExpertise = (
  data: apiBookingExpertise,
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

export const transformReviewModel: (data: apiReviewModel) => tReviewModel = (
  data: apiReviewModel,
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
  data: apiBookingDetailsModel,
) => tBookingDetailsModel = (data: apiBookingDetailsModel) => {
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
