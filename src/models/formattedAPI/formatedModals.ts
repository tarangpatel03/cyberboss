import {
  ApiBillDetailsModel,
  ApiBookingBillCount,
  ApiBookingDetailsModel,
  ApiBookingHistoryModel,
  ApiChatBotChatModel,
  ApiClientHomeModel,
  ApiConsultantDetailsModel,
  ApiConsultantHomeModel,
  ApiConsultantModel,
  ApiExpertiesModel,
  ApiNotificationModel,
  ApiProfileModel,
  ApiUpdateProfile,
  ApiWorkshopModel,
  ConsultantHomeBookingModel,
  ConsultantHomeNotificationModel,
  Expertises,
  Services,
} from '../api/models';

export type INotificationModal = {
  id: string;
  title: string;
  body: string;
  notifiableId: string;
  createdAt: string;
  image: string;
};

export type IExpertiesModal = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: string;
  bookingCount: number | null;
};

export type IWorkshopModal = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  link: string;
};

export type IConsultantModal = {
  id: string;
  name: string;
  experienceYear: string;
  profilePicture: string | undefined;
  rating: number;
  bookings: number;
};

export type IClientHomeModal = {
  isSubscriber: boolean;
  bookings: any[];
  expertises: IExpertiesModal[];
  workshops: IWorkshopModal[];
};

export type IConsultantDetailsModal = {
  id: string;
  name: string;
  profilePicture: string | undefined;
  bio: string;
  experienceYear: string;
  rate: string;
  bookingsCount: number;
  expertises: IExpertises[];
  services: Services[];
  totalRatings: number;
  averageRatings: number;
  ratingReviews: any[];
};

export type IExpertises = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: number;
  bookingCount: number | null;
};

export type IBillDetailsModal = {
  hourlyRate: number;
  hours: number;
  total: number;
  platformFee: number;
  platformPercentage: number;
  tax: number;
  grandTotal: number;
};

export type IChatBotChatModal = {
  sessionId: string;
  request: string;
  response: string;
  createdAt: string;
};

export type IProfileModal = {
  id: string;
  name: string;
  email: string;
  phoneNumber: number | null;
  profilePicture: number | { uri: string } | undefined;
  role: 'client' | 'consultant';
  bio: string | null;
  experienceYear: string | number | null;
  rate: number | null;
  expertises: IExpertises[];
  services: Services[];
  isVerified: boolean | null;
  loginType: string;
  profileSetup: boolean;
};

export type IBookingBillCount = {
  hours: number;
  consultantId: string;
};

export type IUpdateProfile = {
  name: string;
  profileIicture: number | { uri: string } | undefined;
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

export const transformNotificationModal: (
  data: ApiNotificationModel,
) => INotificationModal = (data: ApiNotificationModel) => {
  return {
    body: data.body,
    createdAt: data.created_at,
    id: data.id,
    image: data.image,
    notifiableId: data.notifiable_id,
    title: data.title,
  };
};

export const transformExpertiesModal: (
  data: ApiExpertiesModel,
) => IExpertiesModal = (data: ApiExpertiesModel) => {
  return {
    bookingCount: data.booking_count,
    description: data.description,
    id: data.id,
    image: data.image,
    name: data.name,
    rate: data.rate,
  };
};

export const transformWorkshopModal: (
  data: ApiWorkshopModel,
) => IWorkshopModal = (data: ApiWorkshopModel) => {
  return {
    date: data.date,
    endTime: data.end_time,
    id: data.id,
    link: data.link,
    name: data.name,
    startTime: data.start_time,
  };
};

export const transformConsultantModal: (
  data: ApiConsultantModel,
) => IConsultantModal = (data: ApiConsultantModel) => {
  return {
    bookings: data.bookings,
    experienceYear: data.experience_year,
    id: data.id,
    name: data.name,
    profilePicture: data.profile_picture ? data.profile_picture : undefined,
    rating: data.rating,
  };
};

export const transformClientHomeModal: (
  data: ApiClientHomeModel,
) => IClientHomeModal = (data: ApiClientHomeModel) => {
  return {
    bookings: data.bookings.map(r => r) ?? [],
    expertises: data.expertises
      ? data.expertises.map(r => transformExpertiesModal(r))
      : [],
    isSubscriber: data.is_subscriber,
    workshops: data.workshops
      ? data.workshops.map(r => transformWorkshopModal(r))
      : [],
  };
};

export const transformConsultantDetailsModal: (
  data: ApiConsultantDetailsModel,
) => IConsultantDetailsModal = (data: ApiConsultantDetailsModel) => {
  return {
    averageRatings: data.average_ratings,
    bio: data.bio,
    bookingsCount: data.bookings_count,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises?.map(r => transformExpertises(r))
      : [],
    id: data.id,
    name: data.name,
    profilePicture: data.profile_picture,
    rate: data.rate,
    ratingReviews: data.rating_reviews,
    services: data.services,
    totalRatings: data.total_ratings,
  };
};

export const transformExpertises: (data: Expertises) => IExpertises = (
  data: Expertises,
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

export const transformBillDetailsModal: (
  data: ApiBillDetailsModel,
) => IBillDetailsModal = (data: ApiBillDetailsModel) => {
  return {
    grandTotal: data.grand_total,
    hourlyRate: data.hourly_rate,
    hours: data.hours,
    platformFee: data.platform_fee,
    platformPercentage: data.platform_percentage,
    tax: data.tax,
    total: data.total,
  };
};

export const transformChatBotChatModal: (
  data: ApiChatBotChatModel,
) => IChatBotChatModal = (data: ApiChatBotChatModel) => {
  return {
    createdAt: data.created_at,
    request: data.request,
    response: data.response,
    sessionId: data.session_id,
  };
};

export const transformProfileModal: (data: ApiProfileModel) => IProfileModal = (
  data: ApiProfileModel,
) => {
  return {
    bio: data.bio,
    email: data.email,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises.map(r => transformExpertises(r))
      : [],
    id: data.id,
    name: data.name,
    phoneNumber: data.phone_number,
    profilePicture: data.profile_picture,
    rate: data.rate,
    role: data.role,
    services: data.services,
    isVerified: data.is_verified,
    loginType: data.login_type,
    profileSetup: data.profile_setup,
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

export const transformUpdateProfile: (
  data: ApiUpdateProfile,
) => IUpdateProfile = (data: ApiUpdateProfile) => {
  return {
    name: data.name,
    profileIicture: data.profile_picture,
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
