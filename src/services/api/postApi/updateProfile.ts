import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { extractImageUri } from '../../../utils/extractURI/extractImageURI';

export const updateProfile = async (
  name: string,
  profilePicture: number | { uri: string } | undefined,
) => {
  const profile_picture = extractImageUri(profilePicture);
  try {
    const response = await axiosClient.post(endPoints.clientProfile, {
      name,
      profile_picture,
    });
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
};
