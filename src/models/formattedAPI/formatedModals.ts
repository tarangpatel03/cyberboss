import {
  ApiBillDetailsModal,
  ApiBookingBillCount,
  ApiChatBotChatModal,
  ApiClientHomeModal,
  ApiConsultantDetailsModal,
  ApiConsultantModal,
  ApiExpertiesModal,
  ApiNotificationModal,
  ApiProfileModal,
  ApiUpdateProfile,
  ApiWorkshopModal,
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
  description: null;
  rate: string;
  bookingCount: number;
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
  expertises: Iexpertises[];
  services: Services[];
  totalRatings: number;
  averageRatings: number;
  ratingReviews: any[];
};

export type Iexpertises = {
  id: string;
  name: string;
  image: string;
  description: null;
  rate: number;
  bookingCount: null;
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
  expertises: Iexpertises[];
  services: Services[];
};

export type IBookingBillCount = {
  hours: number;
  consultantId: string;
};

export type IUpdateProfile = {
  name: string;
  profileIicture: number | { uri: string } | undefined;
};

export const transformNotificationModal: (
  data: ApiNotificationModal,
) => INotificationModal = (data: ApiNotificationModal) => {
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
  data: ApiExpertiesModal,
) => IExpertiesModal = (data: ApiExpertiesModal) => {
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
  data: ApiWorkshopModal,
) => IWorkshopModal = (data: ApiWorkshopModal) => {
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
  data: ApiConsultantModal,
) => IConsultantModal = (data: ApiConsultantModal) => {
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
  data: ApiClientHomeModal,
) => IClientHomeModal = (data: ApiClientHomeModal) => {
  return {
    bookings: data.bookings.map(r => r) ?? [],
    expertises: data.expertises
      ? data.expertises?.map(r => transformExpertiesModal(r))
      : [],
    isSubscriber: data.is_subscriber,
    workshops: data.workshops.map(r => transformWorkshopModal(r)) ?? [],
  };
};

export const transformConsultantDetailsModal: (
  data: ApiConsultantDetailsModal,
) => IConsultantDetailsModal = (data: ApiConsultantDetailsModal) => {
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

export const transformExpertises: (data: Expertises) => Iexpertises = (
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
  data: ApiBillDetailsModal,
) => IBillDetailsModal = (data: ApiBillDetailsModal) => {
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
  data: ApiChatBotChatModal,
) => IChatBotChatModal = (data: ApiChatBotChatModal) => {
  return {
    createdAt: data.created_at,
    request: data.request,
    response: data.response,
    sessionId: data.session_id,
  };
};

export const transformProfileModal: (data: ApiProfileModal) => IProfileModal = (
  data: ApiProfileModal,
) => {
  return {
    bio: data.bio,
    email: data.email,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises?.map(r => transformExpertises(r))
      : [],
    id: data.id,
    name: data.name,
    phoneNumber: data.phone_number,
    profilePicture: data.profile_picture,
    rate: data.rate,
    role: data.role,
    services: data.services,
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
