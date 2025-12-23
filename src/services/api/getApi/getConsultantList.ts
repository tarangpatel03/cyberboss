import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const getConsultantList = async (
  id: string,
  page: number,
  search?: string,
) => {
  try {
    const response = await axiosClient.get(endPoints.consultantList, {
      params: {
        expertise: id,
        page,
        search,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
};
