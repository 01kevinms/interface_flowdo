"use client"

import Loading from "@//components/emptyResponse/config"
import { useCreateChat } from "@//query/chats/useCreateChat"
import { useGetMessage } from "@//query/chats/useGetMessage"
import { useProfile } from "@//query/user/useProfile"
import { useAuth } from "@//services/auth.guard"
import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

export default function ConversationPage() {
  const [content, setContent] = useState("")
  const { friendId } = useParams() as { friendId: string }
  const { user } = useAuth()
  const { data: conversations = [], isLoading } = useGetMessage(friendId)
  const {data:profile} = useProfile(user.id)
  const sendMessage = useCreateChat()

  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const messages = conversations ?? []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend() {
    if (!content.trim()) return

    sendMessage.mutate({
      friendId,
      content
    })

    setContent("")
  }

 if(isLoading) {
   return <Loading/>
 }

return (
  <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">

    {/* HEADER */}
    <header className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">

      <button
        onClick={() => router.back()}
        className="text-lg hover:opacity-70 transition"
      >
        ←
      </button>

      <img
        src={profile?.avatar ?? "/default-avatar.png"}
        className="w-9 h-9 rounded-full object-cover cursor-pointer"
        onClick={() => router.push(`/friends/profile/${friendId}`)}
      />

      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-800 dark:text-white">
          {profile?.name ?? "Conversa"}
        </span>

        <span className="text-xs text-zinc-500">
          online recentemente
        </span>
      </div>

    </header>

    {/* MESSAGES */}
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

      {messages.map((msg: any) => {
        const isMine = msg.senderId === user.id;

        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
          >

            {/* AVATAR LEFT */}
            {!isMine && (
              <img
                src={msg.sender?.avatar ?? "/default-avatar.png"}
                className="w-7 h-7 rounded-full object-cover cursor-pointer"
                onClick={() => router.push(`/friends/profile/${msg.senderId}`)}
              />
            )}

            {/* BUBBLE */}
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm flex flex-col
                ${isMine
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-md border border-zinc-200 dark:border-zinc-700"
                }
              `}
            >
              <span className="break-words">
                {msg.content}
              </span>

              <span className="text-[10px] opacity-60 mt-1 self-end">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>

            {/* AVATAR RIGHT */}
            {isMine && (
              <img
                src={msg.sender?.avatar ?? "/default-avatar.png"}
                className="w-7 h-7 rounded-full object-cover"
              />
            )}
          </div>
        );
      })}

      <div ref={bottomRef} />

    </div>

    {/* INPUT */}
    <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">

      <div className="flex items-center gap-2">

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite uma mensagem..."
          className="flex-1 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
        >
          Enviar
        </button>

      </div>

    </div>

  </div>
);
}