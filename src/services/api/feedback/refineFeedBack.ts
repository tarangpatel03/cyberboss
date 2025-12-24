import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const refineFeedBack = async (feedback: string) => {
  try {
    const response = await axiosClient.post(endPoints.feedBackRefine, {
      feedback,
    });
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
};
