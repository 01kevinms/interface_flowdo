"use client"
import { useState } from "react"
import { useAuth } from "@//services/auth.guard"
import { useFriend } from "@//query/friends/useFriend"
import FriendRequestsModal from "@//components/modals/user/friends/friendRequestModal"
import { useRouter } from "next/navigation"

export default function Friends(){

  const { user } = useAuth()
  const { data: friends = [], isLoading } = useFriend()
  const [openRequests,setOpenRequests] = useState(false)
  const [search,setSearch] = useState("")
  const router=useRouter()
function handleSearch(e:React.FormEvent){
  e.preventDefault()
  if(!search.trim())return
  router.push(`/friends/search?q=${search}`)
}
  if(isLoading) return <p>Carregando amigos...</p>

return (
  <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">

    {/* HEADER */}
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-white">
        Amigos
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar amigo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition"
          >
            Buscar
          </button>
        </form>

        {/* REQUEST BUTTON */}
        <button
          onClick={() => setOpenRequests(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          Pedidos
        </button>
      </div>
    </header>

    {/* EMPTY STATE */}
    {friends.length === 0 && (
      <p className="text-sm text-zinc-500 text-center py-10">
        Você ainda não tem amigos
      </p>
    )}

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {friends.map((friend: any) => (
        <div
          key={friend.id}
          onClick={() => router.push(`/friends/profile/${friend.id}`)}
          className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer"
        >
          <img
            src={friend.avatar}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 truncate">
            {friend.name}
          </span>
        </div>
      ))}
    </div>

    <FriendRequestsModal
      open={openRequests}
      onClose={() => setOpenRequests(false)}
      userId={user.id}
    />
  </div>
);
}