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

export const createRating = async (
  rating: string,
  review: string,
  booking_id: string,
) => {
  try {
    const response = await axiosClient.post(Config.endPoints.ratingReviews, {
      rating,
      review,
      booking_id,
    });
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
