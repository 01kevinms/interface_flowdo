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

  return(
    <div className="p-6 space-y-6">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Amigos</h1>

        <nav>
         <form onSubmit={handleSearch} className="flex gap-2">
          <input 
          type="text" 
          placeholder="Procure por um amigo"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border p-2 rounded"
          />
          <button
          type="submit"
          className="bg-zinc-800 text-white px-3 rounded"
          >Buscar</button>
         </form>
        </nav>
        <button
          onClick={()=>setOpenRequests(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Pedidos
        </button>
      </header>

      {friends.length === 0 && (
        <p className="text-zinc-500">Você ainda não tem amigos</p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {friends.map((friend:any)=>(
          <div
            key={friend.id}
            onClick={()=>router.push(`/friends/profile/${friend.id}`)}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <img
              src={friend.avatar}
              className="w-10 h-10 rounded-full"
            />

            <span>{friend.name}</span>
          </div>
        ))}
      </div>

      <FriendRequestsModal
        open={openRequests}
        onClose={()=>setOpenRequests(false)}
        userId={user.id}
      />

    </div>
  )
}