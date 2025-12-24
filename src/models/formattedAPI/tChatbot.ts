import { ApiChatBotChatModel } from '../api/chatbot';

export type IChatBotChatModel = {
  sessionId: string;
  request: string;
  response: string;
  createdAt: string;
};

export const transformChatBotChatModel: (
  data: ApiChatBotChatModel,
) => IChatBotChatModel = (data: ApiChatBotChatModel) => {
  return {
    createdAt: data.created_at,
    request: data.request,
    response: data.response,
    sessionId: data.session_id,
  };
};
