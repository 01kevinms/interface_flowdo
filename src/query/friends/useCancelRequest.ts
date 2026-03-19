import { CancelRequest } from "@//routes/delete.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../useInvalidate";

export function useCancelRequest(userId: string) {

  const qc = useQueryClient()

  return useMutation({
    mutationFn: (friendId: string) => CancelRequest(friendId),

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
      toast.success("pedido Cancelado")
    },
    onError:()=>{
        toast.error("Erro ao cancelar pedido")
    }
  })
}