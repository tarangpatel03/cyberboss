import { services } from '../api/consultant';
import { apiProfileModel, aApiUpdateProfile } from '../api/profile';
import { tExpertiesModel, transformExpertiesModel } from './tConsultant';

export type tProfileModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber: number | null;
  profilePicture: number | { uri: string } | undefined;
  role: 'client' | 'consultant';
  bio: string | null;
  experienceYear: string | number | null;
  rate: number | null;
  expertises: tExpertiesModel[];
  services: services[];
  isVerified: boolean | null;
  loginType: string;
  profileSetup: boolean;
};

export type tUpdateProfile = {
  name: string;
  profileIicture: number | { uri: string } | undefined;
};

export const transformProfileModel: (data: apiProfileModel) => tProfileModel = (
  data: apiProfileModel,
) => {
  return {
    bio: data.bio,
    email: data.email,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises.map(r => transformExpertiesModel(r))
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

export const transformUpdateProfile: (
  data: aApiUpdateProfile,
) => tUpdateProfile = (data: aApiUpdateProfile) => {
  return {
    name: data.name,
    profileIicture: data.profile_picture,
  };
};
