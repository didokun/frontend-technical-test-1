import { Conversation } from "../types/conversation";
import { performClientCall } from "./performClientCall";
import { performServerCall } from "./performServerCall";

export const getConversations = async (senderId: string) => performServerCall<Conversation[]>({url:'conversations', params:{senderId}});
export const getConversation = async (id: string) => performServerCall<Conversation[]>({url:'conversations', params:{id}});
export const deleteConversation = async(id: string) => performClientCall<unknown>({url: `conversations`, params: {id}, method: 'DELETE'})