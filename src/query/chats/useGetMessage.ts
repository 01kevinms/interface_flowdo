import { GetChatsUser, GetConversations } from "@//routes/get.routes";
import {  useQuery } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useGetchats() {
  return useQuery({
    queryKey: queryKeys.chat.all(),
    queryFn: () => GetChatsUser(),
  });
}


export function useGetMessage(friendId: string) {
  return useQuery({
    queryKey: queryKeys.chat.messages(friendId),
    queryFn: () => GetConversations(friendId),
  });
}