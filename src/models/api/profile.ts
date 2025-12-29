import { apiExpertiesModel, services } from './consultant';

export type apiProfileModel = {
  id: string;
  name: string;
  email: string;
  phone_number: number | null;
  profile_picture: number | { uri: string } | undefined;
  role: 'client' | 'consultant';
  bio: string | null;
  experience_year: string | number | null;
  rate: number | null;
  expertises: apiExpertiesModel[];
  services: services[];
  is_verified: boolean | null;
  login_type: string;
  profile_setup: boolean;
};

export type aApiUpdateProfile = {
  name: string;
  profile_picture: number | { uri: string } | undefined;
};
