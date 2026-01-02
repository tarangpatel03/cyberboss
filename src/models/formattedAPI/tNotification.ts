import { apiNotificationModel } from '../api/notification';

export type tNotificationModel = {
  id: string;
  title: string;
  body: string;
  notifiableId: string;
  createdAt: string;
  image: string;
};

export const transformNotificationModel: (
  data: apiNotificationModel,
) => tNotificationModel = (data: apiNotificationModel) => {
  return {
    body: data.body,
    createdAt: data.created_at,
    id: data.id,
    image: data.image,
    notifiableId: data.notifiable_id,
    title: data.title,
  };
};
