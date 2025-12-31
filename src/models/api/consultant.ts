export type services = {
  id: string;
  name: string;
};

export type apiExpertiseModel = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  rate: string;
  booking_count: number | null;
};

export type apiWorkshopModel = {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  link: string;
};

export type apiRatingReviewModel = {
  id: string;
  client_id: string;
  client_name: string;
  client_profile_picture: number | { ur: string } | undefined;
  rating: string;
  review: string | null;
  created_at: string;
};

export type apiConsultantModel = {
  id: string;
  name: string;
  experience_year: string;
  profile_picture: string | undefined;
  rating: number;
  bookings: number;
};

export type apiConsultantDetailsModel = {
  id: string;
  name: string;
  profile_picture: string | undefined;
  bio: string;
  experience_year: string;
  rate: string;
  bookings_count: number;
  expertises: apiExpertiseModel[];
  services: services[];
  total_ratings: number;
  average_ratings: number;
  rating_reviews: apiRatingReviewModel[];
};
