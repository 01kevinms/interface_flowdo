import { RemoveFriend } from "@//routes/delete.routes";
import { GetFriends, GetFriendsSend, GetFriendsReceived, GetProfileFriend, GetFriendStatus } from "@//routes/get.routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from '../useInvalidate';
import { toast } from "sonner";

export function useFriendStatus(friendId: string) {
  return useQuery({
    queryKey: queryKeys.friendStatus(friendId),
    queryFn: () => GetFriendStatus(friendId),
    enabled: !!friendId
  })
}

export function useFriend() {
  return useQuery({
    queryKey: queryKeys.friends(),
    queryFn: GetFriends
  })
}

export function useProfileFriend(friendId: string) {
  return useQuery({
    queryKey: queryKeys.friend(friendId),
    queryFn: () => GetProfileFriend(friendId),
    enabled: !!friendId
  })
}

export function useFriendsReceived(userId: string) {
  return useQuery({
    queryKey: queryKeys.friendRequestsReceived(userId),
    queryFn: GetFriendsReceived,
    refetchOnWindowFocus:true
  })
}

export function useFriendRequest(userId: string) {
  return useQuery({
    queryKey: queryKeys.friendRequestsSent(userId),
    queryFn: ()=>GetFriendsSend(),
    refetchOnWindowFocus:true
   
  })
}

export function useRemoveFriend() {

  const qc = useQueryClient()

  return useMutation({
    mutationFn: (friendId: string) => RemoveFriend(friendId),

    onSuccess: (_, friendId) => {
      qc.invalidateQueries({
        queryKey: queryKeys.friendStatus(friendId)
      }),
     toast.success("amigo removido")
    },
    onError:()=>{
     toast.error("Erro ao remover amigo")
    }
  })
}