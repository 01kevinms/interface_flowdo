"use client"

import Loading from "@//components/emptyResponse/config"
import { useCreateChat } from "@//query/chats/useCreateChat"
import { useGetMessage } from "@//query/chats/useGetMessage"
import { useProfile } from "@//query/user/useProfile"
import { useAuth } from "@//services/auth.guard"
import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

export default function ConversationPage() {
  const { friendId } = useParams() as { friendId: string }
  const { user } = useAuth()
  const { data: conversations = [], isLoading } = useGetMessage(friendId)
  const sendMessage = useCreateChat()
  const [content, setContent] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
const {data:profile} = useProfile(user.id)

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
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-[#121212]">

      {/* HEADER */}
      <div className="flex items-center gap-3 border-b p-4 bg-white dark:bg-[#1c1c1c] shadow-sm">

        <button
          onClick={() => router.back()}
          className="text-xl hover:opacity-70"
        >
          ←
        </button>
        
        <img
          src={profile?.avatar ?? "/default-avatar.png"}
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
          onClick={() => router.push(`/friends/profile/${friendId}`)}
        />

        <div className="font-semibold">
          Conversa
        </div>

      </div>


      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg: any) => {

          const isMine = msg.senderId === user.id

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >

              {!isMine && (
                <img
                  src={msg.sender?.avatar ?? "/default-avatar.png"}
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  onClick={() => router.push(`/friends/profile/${msg.senderId}`)}
                />
              )}

              <div
                className={`flex flex-col px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                  isMine
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-white dark:bg-zinc-800 rounded-bl-md"
                }`}
              >
                <span>{msg.content}</span>

                <span className="text-[10px] opacity-60 mt-1 self-end">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>

              {isMine && (
                <img
                  src={msg.sender?.avatar ?? "/default-avatar.png"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>


      {/* INPUT */}
      <div className="border-t bg-white dark:bg-[#1c1c1c] p-3 flex gap-2 items-center">

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite uma mensagem..."
          className="flex-1 bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-full outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
        >
          Enviar
        </button>

      </div>

    </div>
  )
}