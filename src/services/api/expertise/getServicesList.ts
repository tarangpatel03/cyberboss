import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const getServiceList = async (search?: string) => {
  try {
    const response = await axiosClient.get(endPoints.expertise, {
      params: {
        search,
      },
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
