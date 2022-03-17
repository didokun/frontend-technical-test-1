import { Message } from "../types/message";
import { performClientCall } from "./performClientCall";
import { performServerCall } from "./performServerCall";

export const getMessages = async (conversationId: string) => performServerCall<Message[]>({url:'messages', params:{conversationId}});
export const deleteMessage = async(id: string) => performClientCall<unknown>({url: `messages`, params: {id}, method: 'DELETE'})