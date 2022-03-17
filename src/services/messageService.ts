import { Message } from "../types/message";
import { performClientCall } from "./performClientCall";
import { performServerCall } from "./performServerCall";

export const getMessages = async (conversationId: string) => performServerCall<Message[]>({url:'messages', params:{conversationId}});
export const deleteMessage = async(id: string) => performClientCall<unknown>({url: `messages`, params: {id}, method: 'DELETE'});
export const createMessage = async(conversationId: string, data: Omit<Message, 'id'>) => 
  performClientCall<Pick<Message, 'id' | 'body' | 'timestamp'>>({url: `messages`, params: {conversationId}, method: 'POST', data});