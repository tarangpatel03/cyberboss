import { Config } from '@config/index';
import { axiosClient } from '@services/axios/axiosClient';

export const sendChat = async (message: string) => {
  try {
    const response = await axiosClient.post(Config.endPoints.askChatbot, {
      message,
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
