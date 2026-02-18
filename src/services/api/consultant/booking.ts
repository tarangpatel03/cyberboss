import { Config } from '@config/index';
import { axiosClient } from '@services/axios/axiosClient';

export const completeBooking = async <T>(id: string): Promise<T | null> => {
  try {
    const response = await axiosClient.post(
      `${Config.endPoints.bookingComplete}/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
