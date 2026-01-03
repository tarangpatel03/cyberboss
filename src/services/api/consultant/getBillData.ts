import { endPoints } from '@config/endPoint/apiEndPoint';
import { axiosClient } from '@services/axios/axiosClient';

export const getBillData = async <T>(
  hours: number,
  consultant_id: string,
): Promise<T | null> => {
  try {
    const response = await axiosClient.post(endPoints.billCount, {
      hours,
      consultant_id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
