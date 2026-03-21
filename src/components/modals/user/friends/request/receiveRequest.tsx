"use client"

import Loading from "@//components/emptyResponse/config"
import { useAcceptRequest, useRejectRequest } from "@//query/friends/useAccept"
import { useFriendsReceived } from "@//query/friends/useFriend"
import { useRouter } from "next/navigation"

export function ReceivedRequest({ userId }: { userId: string }) {

  const { data: received = [], isLoading } = useFriendsReceived(userId)
  const acceptMutation = useAcceptRequest(userId)
  const rejectMutation = useRejectRequest(userId)
  const router = useRouter()
  if (isLoading) return <Loading />
  if (received.length === 0) {
    return (
      <p className="text-center text-zinc-500">
        Nenhum pedido recebido
      </p>
    )
  }

 return (
  <div className="space-y-3">
    {received.map((request: any) => (
      <div
        key={request.id}
        className="
          flex items-center gap-3
          
          border border-zinc-200 dark:border-zinc-800
          
          bg-white dark:bg-zinc-900
          
          p-3 rounded-xl
          
          hover:bg-zinc-50 dark:hover:bg-zinc-800
          transition
        "
      >
        {/* USER */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            onClick={() =>
              router.push(`/friends/profile/${request.userA.id}`)
            }
            src={
              request.userA?.avatar ||
              `https://api.dicebear.com/7.x/thumbs/svg?seed=${request.name}`
            }
            className="
              w-9 h-9 sm:w-10 sm:h-10
              rounded-full object-cover
              cursor-pointer
              flex-shrink-0
            "
          />

          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">
            {request.userA?.name}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="ml-auto flex gap-2 flex-shrink-0">
          <button
            disabled={
              acceptMutation.isPending || rejectMutation.isPending
            }
            onClick={() => acceptMutation.mutate(request.id)}
            className="
              text-xs sm:text-sm
              
              bg-green-600 hover:bg-green-700
              text-white
              
              px-3 py-1.5 rounded-lg
              
              transition
              disabled:opacity-50
            "
          >
            {acceptMutation.isPending ? "Aceitando..." : "Aceitar"}
          </button>

          <button
            disabled={
              acceptMutation.isPending || rejectMutation.isPending
            }
            onClick={() => rejectMutation.mutate(request.id)}
            className="
              text-xs sm:text-sm
              
              bg-red-500 hover:bg-red-600
              text-white
              
              px-3 py-1.5 rounded-lg
              
              transition
              disabled:opacity-50
            "
          >
            {rejectMutation.isPending ? "Rejeitando..." : "Rejeitar"}
          </button>
        </div>
      </div>
    ))}
  </div>
);
}