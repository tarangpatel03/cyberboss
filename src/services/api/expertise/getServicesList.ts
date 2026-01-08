import { Config } from '@config/index';
import { axiosClient } from '@services/axios/axiosClient';

export const getServiceList = async <T>(search?: string): Promise<T | null> => {
  try {
    const response = await axiosClient.get(Config.endPoints.expertise, {
      params: {
        search,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
