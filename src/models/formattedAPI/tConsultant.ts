import {
  ApiConsultantDetailsModel,
  ApiConsultantModel,
  ApiConsultantVerifed,
  ApiExpertiseModel,
  ApiRatingReviewModel,
  ApiWorkshopModel,
  Services,
} from '@models/api/consultant';

export type TExpertiseModel = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: string;
  bookingCount: number | null;
};

export type TWorkshopModel = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  link: string;
};

export type TConsultantModel = {
  id: string;
  name: string;
  experienceYear: string;
  profilePicture: string | undefined;
  rating: number;
  bookings: number;
};

export type TRatingReviewModel = {
  id: string;
  clientId: string;
  clientName: string;
  clientProfilePicture: number | { ur: string } | undefined;
  rating: string;
  review: string | null;
  createdAt: string;
};

export type TConsultantDetailsModel = {
  id: string;
  name: string;
  profilePicture: string | undefined;
  bio: string;
  experienceYear: string;
  rate: string;
  bookingsCount: number;
  expertises: TExpertiseModel[];
  services: Services[];
  totalRatings: number;
  averageRatings: number;
  ratingReviews: TRatingReviewModel[];
};

export type TConsultantVerifed = {
  isVerified: boolean;
};

export const transformConsultantVerfied: (
  data: ApiConsultantVerifed,
) => TConsultantVerifed = (data: ApiConsultantVerifed) => {
  return {
    isVerified: data.is_verified,
  };
};

export const transformExpertiseModel: (
  data: ApiExpertiseModel,
) => TExpertiseModel = (data: ApiExpertiseModel) => {
  return {
    bookingCount: data.booking_count,
    description: data.description,
    id: data.id,
    image: data.image,
    name: data.name,
    rate: data.rate,
  };
};

export const transformWorkshopModel: (
  data: ApiWorkshopModel,
) => TWorkshopModel = (data: ApiWorkshopModel) => {
  return {
    date: data.date,
    endTime: data.end_time,
    id: data.id,
    link: data.link,
    name: data.name,
    startTime: data.start_time,
  };
};

export const transformConsultantModel: (
  data: ApiConsultantModel,
) => TConsultantModel = (data: ApiConsultantModel) => {
  return {
    bookings: data.bookings,
    experienceYear: data.experience_year,
    id: data.id,
    name: data.name,
    profilePicture: data.profile_picture ? data.profile_picture : undefined,
    rating: data.rating,
  };
};

export const transformRatingReviewModel: (
  data: ApiRatingReviewModel,
) => TRatingReviewModel = (data: ApiRatingReviewModel) => {
  return {
    id: data.id,
    rating: data.rating,
    clientId: data.client_id,
    clientName: data.client_name,
    clientProfilePicture: data.client_profile_picture,
    createdAt: data.created_at,
    review: data.review,
  };
};

export const transformConsultantDetailsModel: (
  data: ApiConsultantDetailsModel,
) => TConsultantDetailsModel = (data: ApiConsultantDetailsModel) => {
  return {
    averageRatings: data.average_ratings,
    bio: data.bio,
    bookingsCount: data.bookings_count,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises?.map(r => transformExpertiseModel(r))
      : [],
    id: data.id,
    name: data.name,
    profilePicture: data.profile_picture,
    rate: data.rate,
    ratingReviews: data.rating_reviews.map(r => transformRatingReviewModel(r)),
    services: data.services,
    totalRatings: data.total_ratings,
  };
};
