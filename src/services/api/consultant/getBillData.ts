import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { axiosClient } from '../../axios/axiosClient';

export const getBillData = async (hours: number, consultant_id: string) => {
  try {
    const response = await axiosClient.post(endPoints.billCount, {
      hours,
      consultant_id,
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
