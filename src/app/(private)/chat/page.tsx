"use client"
import ChatCard from "@//components/cards/chat/cardChat"
import Loading from "@//components/emptyResponse/config"
import { useGetchats } from "@//query/chats/useGetMessage"
import { useAuth } from "@//services/auth.guard"
import { useRouter } from "next/navigation"

export default function Chat(){
const{user}=useAuth()
const router=useRouter()

const{data:chats,isLoading}=useGetchats()
console.log(chats)
if(isLoading) {
  return <Loading />
}

return (
  <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">

    {/* HEADER */}
    <header className="flex items-center justify-between">
      <h1 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-white">
        Conversas
      </h1>
    </header>

    {/* EMPTY */}
    {chats.length === 0 && (
      <p className="text-sm text-zinc-500 text-center py-10">
        Nenhuma conversa ainda
      </p>
    )}

    {/* LIST */}
    <div className="flex flex-col gap-2">
      {chats.map((conversation: any) => (
        <ChatCard
          key={conversation.id}
          conversation={conversation}
          currentUserId={user.id}
          onOpenChat={(friendId) => {
            router.push(`/chat/${friendId}`);
          }}
        />
      ))}
    </div>

  </div>
);
}