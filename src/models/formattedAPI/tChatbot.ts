import {ApiChatBotChatModel} from '@models/api/chatbot';

export type TChatBotChatModel = {
    sessionId: string;
    request: string;
    response: string;
    createdAt: string;
};

export const transformChatBotChatModel: (
    data: ApiChatBotChatModel,
) => TChatBotChatModel = (data: ApiChatBotChatModel) => {
    return {
        createdAt: data.created_at,
        request: data.request,
        response: data.response,
        sessionId: data.session_id,
    };
};
