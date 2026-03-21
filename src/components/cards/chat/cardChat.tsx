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
 return (
  <div
    onClick={() => onOpenChat(friend.id)}
    className="
      flex items-center gap-3 
      p-2 sm:p-3 
      rounded-xl 
      cursor-pointer 
      
      bg-zinc-100 dark:bg-zinc-900
      hover:bg-zinc-200 dark:hover:bg-zinc-800
      
      transition-all duration-200
    "
  >
    {/* AVATAR */}
    <img
      src={friend?.avatar || "/avatar.png"}
      alt={friend?.name}
      className="
        w-10 h-10 sm:w-12 sm:h-12 
        rounded-full 
        object-cover 
        flex-shrink-0
      "
    />

    {/* CONTENT */}
    <div className="flex flex-col flex-1 min-w-0">
      
      {/* TOP */}
      <div className="flex justify-between items-center gap-2">
        <span className="font-medium text-sm sm:text-base text-zinc-800 dark:text-zinc-100 truncate">
          {friend?.name}
        </span>

        {lastMessage && (
          <span className="text-[10px] sm:text-xs text-zinc-500 whitespace-nowrap">
            {new Date(lastMessageAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      {/* MESSAGE */}
      <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate">
        {lastMessage || "Começar conversa..."}
      </span>
    </div>
  </div>
);
}