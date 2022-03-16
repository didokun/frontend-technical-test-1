import { Conversation } from "../types/conversation";

export const isConversationSender = (conversation:Conversation, senderId: string) => conversation.senderId === Number(senderId);
