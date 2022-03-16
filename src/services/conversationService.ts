import { Conversation } from "../types/conversation";
import { performServerCall } from "./performServerCall";

export const getConversations = async (senderId: string) => performServerCall<Conversation[]>({url:'conversations', params:{senderId}});
export const getConversation = async (id: string) => performServerCall<Conversation[]>({url:'conversations', params:{id}});