import { Config } from '@config/index';
import { axiosClient } from '@services/axios/axiosClient';

export const getConsultantList = async <T>(
  id: string,
  page: number,
  search?: string,
): Promise<T | null> => {
  try {
    const response = await axiosClient.get(Config.endPoints.consultantList, {
      params: {
        expertise: id,
        page,
        search,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
