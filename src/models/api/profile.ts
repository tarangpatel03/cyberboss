import { ApiExpertiseModel, Services } from '@models/api/consultant';

export type ApiProfileModel = {
  id: string;
  name: string;
  email: string;
  phone_number: number | null;
  profile_picture: number | { uri: string } | undefined;
  role: 'client' | 'consultant';
  bio: string | null;
  experience_year: string | number | null;
  rate: number | null;
  expertises: ApiExpertiseModel[];
  services: Services[];
  is_verified: boolean | null;
  login_type: string;
  profile_setup: boolean;
};

export type ApiUpdateProfile = {
  name: string;
  profile_picture: number | { uri: string } | undefined;
};
