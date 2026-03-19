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

    return(
       
    <div className="max-w-md mx-auto p-4 space-y-2">

      <h1 className="text-xl font-semibold mb-4">
        Conversas
      </h1>

      {chats.length === 0 && (
        <p className="text-zinc-500">
          Nenhuma conversa ainda
        </p>
      )}

      {chats.map((conversation:any)=>(
        <ChatCard
          key={conversation.id}
          conversation={conversation}
          currentUserId={user.id}
          onOpenChat={(friendId)=>{
            router.push(`/chat/${friendId}`)
          }}
        />
      ))}

    </div>
    )
}