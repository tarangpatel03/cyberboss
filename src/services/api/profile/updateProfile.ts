import { Config } from '@config/index';
import { axiosClient } from '@services/axios/axiosClient';
import { Utils } from '@utils/index';

export const updateClientProfile = async (
  name: string,
  profilePicture: number | { uri: string } | undefined,
) => {
  const profile_picture = Utils.extractImageUri(profilePicture);
  try {
    const response = await axiosClient.post(Config.endPoints.clientProfile, {
      name,
      profile_picture,
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

export const updateConsultantProfileSetup = async (
  name: string,
  experience_year: string,
  bio: string,
  profilePicture: number | { uri: string } | undefined,
  expertiseArray: string[],
  servicesArray: string[],
) => {
  const profile_picture = Utils.extractImageUri(profilePicture);
  const expertises = expertiseArray.join(',');
  const services = servicesArray.join(',');

  try {
    const res = await axiosClient.post(Config.endPoints.consultantProfileSetup, {
      name,
      experience_year,
      bio,
      profile_picture,
      expertises,
      services,
    });
    return res.data.payload;
  } catch (error) {
    throw error;
  }
};
