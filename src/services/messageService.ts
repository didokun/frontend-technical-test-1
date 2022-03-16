import { Message } from "../types/message";
import { performServerCall } from "./performServerCall";

export const getMessages = async (conversationId: string) => performServerCall<Message[]>({url:'/messages', params:{conversationId}});