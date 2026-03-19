
import { RequestFriend } from "@//routes/post.routes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryKeys } from "../useInvalidate"

export function useSendFriendRequest(userId:string) {

  const qc = useQueryClient()

  return useMutation({
    mutationFn: (friendId: string) => RequestFriend(friendId),

     onSuccess: (_, friendId) => {

      qc.invalidateQueries({
        queryKey: queryKeys.friendRequestsSent(userId)
      })

      qc.invalidateQueries({
        queryKey: queryKeys.friendRequestsReceived(friendId)
      })

      qc.invalidateQueries({
        queryKey: queryKeys.friendStatus(friendId)
      }),
      toast.success("pedido enviado")
    },
    onError:()=>{
      toast.error("Erro ao enviar pedido")
    }
  })
}