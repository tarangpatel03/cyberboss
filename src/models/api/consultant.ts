export type Services = {
  id: string;
  name: string;
};

export type ApiExpertiesModel = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: string;
  booking_count: number | null;
};

export type ApiWorkshopModel = {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  link: string;
};

export type ApiConsultantModel = {
  id: string;
  name: string;
  experience_year: string;
  profile_picture: string | undefined;
  rating: number;
  bookings: number;
};

export type ApiConsultantDetailsModel = {
  id: string;
  name: string;
  profile_picture: string | undefined;
  bio: string;
  experience_year: string;
  rate: string;
  bookings_count: number;
  expertises: ApiExpertiesModel[];
  services: Services[];
  total_ratings: number;
  average_ratings: number;
  rating_reviews: any[];
};
