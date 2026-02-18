import { ApiNotificationModel } from '@models/api/notification';

export type TNotificationModel = {
  id: string;
  title: string;
  body: string;
  notifiableId: string;
  createdAt: string;
  image: string;
};

export const transformNotificationModel: (
  data: ApiNotificationModel,
) => TNotificationModel = (data: ApiNotificationModel) => {
  return {
    body: data.body,
    createdAt: data.created_at,
    id: data.id,
    image: data.image,
    notifiableId: data.notifiable_id,
    title: data.title,
  };
};
