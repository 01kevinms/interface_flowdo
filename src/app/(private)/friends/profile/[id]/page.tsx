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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-6">

      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 space-y-6">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">

          <img
            src={data.avatar || "/default-avatar.png"}
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow object-cover"
          />

          <div className="text-center space-y-1">

            <h1 className="text-xl font-semibold">
              {data.name}
            </h1>

            <p className="text-sm text-zinc-500">
              ID: {data.id}
            </p>

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

        {/* Atividade */}
        <div className="border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">

          <p className="text-sm text-zinc-500 mb-1">
            Atividade
          </p>

          <p className="font-medium">
            Online recentemente
          </p>

        </div>

        {/* Ações */}
        <div className="flex gap-3">

          {/* AMIGOS */}
          {status === "FRIEND" && (
            <>
              <button
                onClick={() => router.push(`/chat/${data.id}`)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition font-medium"
              >
                💬 Mensagem
              </button>

              <button
                disabled={removeFriend.isPending}
                onClick={() => removeFriend.mutate(id)}
                className="flex-1 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 py-2 rounded-lg transition disabled:opacity-50"
              >
                {removeFriend.isPending
                  ? "Removendo..."
                  : "Remover"}
              </button>
            </>
          )}

          {/* PEDIDO ENVIADO */}
          {status === "PENDING_SENT" && (
            <button
              disabled={cancelRequest.isPending}
              onClick={() => cancelRequest.mutate(id)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {cancelRequest.isPending
                ? "Cancelando..."
                : "Cancelar pedido"}
            </button>
          )}

          {/* NÃO É AMIGO */}
          {status === "NONE" && (
            <button
              disabled={sendRequest.isPending}
              onClick={() => sendRequest.mutate(id)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {sendRequest.isPending
                ? "Enviando..."
                : "Adicionar amigo"}
            </button>
          )}

        </div>

      </div>

    </div>
  )
}