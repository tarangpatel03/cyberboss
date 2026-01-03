import { Services } from '@models/api/consultant';
import { ApiProfileModel, ApiUpdateProfile } from '@models/api/profile';
import { TExpertiseModel, transformExpertiseModel } from '@models/formattedAPI/tConsultant';

export type TProfileModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber: number | null;
  profilePicture: number | { uri: string } | undefined;
  role: 'client' | 'consultant';
  bio: string | null;
  experienceYear: string | number | null;
  rate: number | null;
  expertises: TExpertiseModel[];
  services: Services[];
  isVerified: boolean | null;
  loginType: string;
  profileSetup: boolean;
};

export type TUpdateProfile = {
  name: string;
  profilePicture: number | { uri: string } | undefined;
};

export const transformProfileModel: (data: ApiProfileModel) => TProfileModel = (
  data: ApiProfileModel,
) => {
  return {
    bio: data.bio,
    email: data.email,
    experienceYear: data.experience_year,
    expertises: data.expertises
      ? data.expertises.map(r => transformExpertiseModel(r))
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
  data: ApiUpdateProfile,
) => TUpdateProfile = (data: ApiUpdateProfile) => {
  return {
    name: data.name,
    profilePicture: data.profile_picture,
  };
};
