import { axiosClient } from '@services/axios/axiosClient';
import { endPoints } from '@config/endPoint/apiEndPoint';

export const getConsultantList = async <T>(
  id: string,
  page: number,
  search?: string,
): Promise<T | null> => {
  try {
    const response = await axiosClient.get(endPoints.consultantList, {
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
