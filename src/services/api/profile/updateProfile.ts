import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { extractImageUri } from '../../../utils/extractURI/extractImageURI';

export const updateClientProfile = async (
  name: string,
  profilePicture: number | { uri: string } | undefined,
) => {
  const profile_picture = extractImageUri(profilePicture);
  try {
    const response = await axiosClient.post(endPoints.clientProfile, {
      name,
      profile_picture,
    });
    console.log('profile uploade payload, ', response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
};

export const updateConsultantProfileSetup = async (
  name: string,
  experience_year: string,
  bio: string,
  profilePicture: number | { uri: string } | undefined,
  expertisesArray: string[],
  servicesArray: string[],
) => {
  const profile_picture = extractImageUri(profilePicture);
  const expertises = expertisesArray.join(',');
  const services = servicesArray.join(',');

  try {
    const res = await axiosClient.post(endPoints.consultantProfileSetup, {
      name,
      experience_year,
      bio,
      profile_picture,
      expertises,
      services,
    });
    console.log('Consultant setup: ', res.data.payload);
    return res.data.payload;
  } catch (error) {
    console.log(error);
  }
};
