"use client"
import Loading from "@//components/emptyResponse/config";
import { useFriend } from "@//query/friends/useFriend";
import { useSendFriendRequest } from "@//query/friends/useRequest";
import { useSearchFriend } from "@//query/friends/useSearch"
import { useAuth } from "@//services/auth.guard";
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react";


export default function SearchFriends(){

    const params= useSearchParams()
    const query= params.get("q") || "";
    const router= useRouter()
    const [search,setSearch] = useState("")
    const{user}=useAuth()
    const sendrequest= useSendFriendRequest(user.id)
    const{data:friends=[]}=useFriend()
    const{data:users=[],isLoading}=useSearchFriend(query)

    function handleSubmit(e:React.FormEvent){
      e.preventDefault()
      if(!search.trim())return
      router.push(`/friends/search?q=${search}`)
    }
    if(isLoading){
        return <Loading/>
    }
    return(

    <div className="p-6 space-y-4">
      <nav>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input 
          type="text"
          className="border p-2 rounded"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />

          <button 
          type="submit"
          className="bg-zinc-800 text-white px-3 rounded"
          >
            Buscar
          </button>
        </form>
      </nav>
      <h1 className="text-xl font-semibold">
        Resultados para "{query}"
      </h1>

      {users.length === 0 && (
        <p>Nenhum usuário encontrado</p>
      )}

      <div className="grid gap-3">

        {users.map((user:any)=>{
        const isFriend=friends.map((friend:any)=>friend.id ===users.id)

        return(
          <div
            key={user.id}
            onClick={()=>router.push(`/friends/profile/${user.id}`)}
            className="flex items-center justify-between border p-3 rounded-lg cursor-pointer"
          >

            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            {!isFriend && (

                <button
                onClick={(e)=>{
                    e.stopPropagation()
                    sendrequest.mutate(user.id)}}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:scale-110 transition-all ">
              Adicionar
            </button>

            )}
          </div>

        )})}

      </div>

    </div>
    )
}