import { axiosClient } from '../../axios/axiosClient';

export const getAPIData = async (route: string, page?: number) => {
  try {
    const response = await axiosClient.get(route, {
      params: {
        page,
      },
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
