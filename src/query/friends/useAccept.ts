import { toast } from "sonner";

import { AcceptRequest, RejectRequest } from "@//routes/post.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";


export function useAcceptRequest(userId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: AcceptRequest,

    onMutate: async (friendId: string) => {
      await qc.cancelQueries({
        queryKey: queryKeys.friendRequestsReceived(userId)
      })

      const previous = qc.getQueryData<any[]>(
        queryKeys.friendRequestsReceived(userId)
      )

      qc.setQueryData(
        queryKeys.friendRequestsReceived(userId),
        (old: any[] = []) =>
          old.filter(req => req.id !== friendId)
      )

      return { previous }
    },

    onError: (err, friendId, ctx) => {
      qc.setQueryData(
        queryKeys.friendRequestsReceived(userId),
        ctx?.previous
      )

      toast.error("erro ao aceitar pedido")
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.friendRequestsReceived(userId)
      })

      qc.invalidateQueries({
        queryKey: queryKeys.friends()
      })

      toast.success("pedido aceito")
    }
  })
}

export function useRejectRequest(userId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: RejectRequest,

    onMutate: async (friendId: string) => {
      await qc.cancelQueries({
        queryKey: queryKeys.friendRequestsReceived(userId)
      })

      const previous = qc.getQueryData<any[]>(
        queryKeys.friendRequestsReceived(userId)
      )

      qc.setQueryData(
        queryKeys.friendRequestsReceived(userId),
        (old: any[] = []) =>
          old.filter(req => req.id !== friendId)
      )

      return { previous }
    },

    onError: (err, friendId, ctx) => {
      qc.setQueryData(
        queryKeys.friendRequestsReceived(userId),
        ctx?.previous
      )

      toast.error("erro ao rejeitar pedido")
    },

    onSuccess: () => {
      toast.success("pedido rejeitado")
    }
  })
}