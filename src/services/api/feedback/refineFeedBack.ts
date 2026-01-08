import { Config } from '@config/index';
import { axiosClient } from '@services/axios/axiosClient';

export const refineFeedBack = async (feedback: string) => {
  try {
    const response = await axiosClient.post(Config.endPoints.feedBackRefine, {
      feedback,
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
