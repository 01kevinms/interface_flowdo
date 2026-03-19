"use client"

type Props = {
  conversation:any
  currentUserId:string
  onOpenChat:(friendId:string)=>void
}

export default function ChatCard({conversation,currentUserId,onOpenChat}:Props){

  const friend =
    conversation.user1Id === currentUserId
      ? conversation.user2
      : conversation.user1

  const lastMessage = conversation.lastMessage
  const lastMessageAt = conversation.lastMessageAt
  return(
    <div
      onClick={()=>onOpenChat(friend.id)}
      className="flex items-center gap-3 p-3 bg-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer rounded-lg transition"
    >

      <img
        src={friend?.avatar || []}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex flex-col flex-1">

        <div className="flex justify-between items-center">

          <span className="font-medium">
            {friend?.name}
          </span>

          {lastMessage && (
            <span className="text-xs text-zinc-500">
              {new Date(lastMessageAt).toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit"
              })}
            </span>
          )}

        </div>

        <span className="text-sm text-zinc-500 truncate">

          {lastMessage || "Começar conversa..."}

        </span>

      </div>

    </div>
  )
}