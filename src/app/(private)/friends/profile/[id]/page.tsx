"use client"

import Loading from "@//components/emptyResponse/config"
import { useCancelRequest } from "@//query/friends/useCancelRequest"
import {
  useFriend,
  useFriendRequest,
  useFriendStatus,
  useProfileFriend,
  useRemoveFriend
} from "@//query/friends/useFriend"

import { useSendFriendRequest } from "@//query/friends/useRequest"
import { useAuth } from "@//services/auth.guard"
import { useParams, useRouter } from "next/navigation"

export default function FriendProfile() {

  const { id } = useParams() as { id: string }

  const { user } = useAuth()
  const router = useRouter()

  const { data, isLoading } = useProfileFriend(id)
  const { data: status } = useFriendStatus(id)

  const sendRequest = useSendFriendRequest(user?.id)
  const cancelRequest = useCancelRequest(user?.id)
  const removeFriend = useRemoveFriend()

  if (!user || isLoading) return <Loading />

return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6">

    <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 space-y-6">

      {/* AVATAR + INFO */}
      <div className="flex flex-col items-center gap-4 text-center">

        <div className="relative">
          <img
            src={data.avatar || "/default-avatar.png"}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow"
          />

          {/* STATUS DOT */}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 bg-green-500" />
        </div>

        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-white">
            {data.name}
          </h1>

          <p className="text-xs text-zinc-500">
            ID: {data.id}
          </p>

          {/* STATUS */}
          {status === "FRIEND" && (
            <span className="text-green-500 text-sm font-medium">
              ✔ Amigos
            </span>
          )}

          {status === "PENDING_SENT" && (
            <span className="text-yellow-500 text-sm font-medium">
              ⏳ Pedido enviado
            </span>
          )}
        </div>
      </div>

      {/* ATIVIDADE */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
        <p className="text-xs text-zinc-500 mb-1">
          Atividade
        </p>

        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Online recentemente
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* AMIGOS */}
        {status === "FRIEND" && (
          <>
            <button
              onClick={() => router.push(`/chat/${data.id}`)}
              className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
              💬 Mensagem
            </button>

            <button
              disabled={removeFriend.isPending}
              onClick={() => removeFriend.mutate(id)}
              className="flex-1 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-sm transition disabled:opacity-50"
            >
              {removeFriend.isPending ? "Removendo..." : "Remover"}
            </button>
          </>
        )}

        {/* PEDIDO ENVIADO */}
        {status === "PENDING_SENT" && (
          <button
            disabled={cancelRequest.isPending}
            onClick={() => cancelRequest.mutate(id)}
            className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition disabled:opacity-50"
          >
            {cancelRequest.isPending ? "Cancelando..." : "Cancelar pedido"}
          </button>
        )}

        {/* NÃO É AMIGO */}
        {status === "NONE" && (
          <button
            disabled={sendRequest.isPending}
            onClick={() => sendRequest.mutate(id)}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition disabled:opacity-50"
          >
            {sendRequest.isPending ? "Enviando..." : "Adicionar amigo"}
          </button>
        )}

      </div>

    </div>
  </div>
);
}