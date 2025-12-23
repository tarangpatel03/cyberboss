import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const getUserToken = async (data: {
  email: string | null;
  device_type: 'android' | 'ios';
  firebase_token: string;
  push_token: string;
  login_type: 'social' | 'email';
}) => {
  try {
    const res = await axiosClient.post(endPoints.logIn, data);
    return res.data.payload.access_token;
  } catch (error) {
    console.log(error);
  }
};
