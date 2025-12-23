import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const getUserToken = async (data: {
  email: string | null;
  firebase_token: string;
  push_token?: string;
  login_type: string;
  device_type: string;
}) => {
  try {
    const res = await axiosClient.post(endPoints.logIn, data);
    return res.data.payload;
  } catch (error: any) {
    throw error;
  }
};
