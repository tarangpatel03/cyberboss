import {
  apiConsultantDetailsModel,
  apiConsultantModel,
  apiExpertiesModel,
  apiWorkshopModel,
  services,
} from '../api/consultant';

export type tExpertiesModel = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: string;
  bookingCount: number | null;
};

export type tWorkshopModel = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  link: string;
};

export type tConsultantModel = {
  id: string;
  name: string;
  experienceYear: string;
  profilePicture: string | undefined;
  rating: number;
  bookings: number;
};

export type tConsultantDetailsModel = {
  id: string;
  name: string;
  profilePicture: string | undefined;
  bio: string;
  experienceYear: string;
  rate: string;
  bookingsCount: number;
  expertises: tExpertiesModel[];
  services: services[];
  totalRatings: number;
  averageRatings: number;
  ratingReviews: any[];
};

export const transformExpertiesModel: (
  data: apiExpertiesModel,
) => tExpertiesModel = (data: apiExpertiesModel) => {
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
  data: apiWorkshopModel,
) => tWorkshopModel = (data: apiWorkshopModel) => {
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
  data: apiConsultantModel,
) => tConsultantModel = (data: apiConsultantModel) => {
  return {
    bookings: data.bookings,
    experienceYear: data.experience_year,
    id: data.id,
    name: data.name,
    profilePicture: data.profile_picture ? data.profile_picture : undefined,
    rating: data.rating,
  };
};

export const transformConsultantDetailsModel: (
  data: apiConsultantDetailsModel,
) => tConsultantDetailsModel = (data: apiConsultantDetailsModel) => {
  return {
    averageRatings: data.average_ratings,
    bio: data.bio,
    bookingsCount: data.bookings_count,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises?.map(r => transformExpertiesModel(r))
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
