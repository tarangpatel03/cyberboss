import { apiChatBotChatModel } from '../api/chatbot';

export type tChatBotChatModel = {
  sessionId: string;
  request: string;
  response: string;
  createdAt: string;
};

export const transformChatBotChatModel: (
  data: apiChatBotChatModel,
) => tChatBotChatModel = (data: apiChatBotChatModel) => {
  return {
    createdAt: data.created_at,
    request: data.request,
    response: data.response,
    sessionId: data.session_id,
  };
};
