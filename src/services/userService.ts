import { User } from "../types/user";
import { performServerCall } from "./performServerCall";

export const getUserList = async () => performServerCall<User[]>({url: 'users'});
export const getUser = async (id: string) => performServerCall<User[]>({url: 'users', params:{id}});