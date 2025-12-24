import { axiosClient } from '../../axios/axiosClient';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export const sendChat = async (message: string) => {
  try {
    const response = await axiosClient.post(endPoints.askChatbot, {
      message,
    });
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
};
