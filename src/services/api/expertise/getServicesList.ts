import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const getServiceList = async <T>(search?: string): Promise<T | null> => {
  try {
    const response = await axiosClient.get(endPoints.expertise, {
      params: {
        search,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
