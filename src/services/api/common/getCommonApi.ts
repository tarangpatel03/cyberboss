import { axiosClient } from '../../axios/axiosClient';

export const getAPIData = async <T>(
  route: string,
  page?: number,
): Promise<T | null> => {
  try {
    const response = await axiosClient.get(route, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
