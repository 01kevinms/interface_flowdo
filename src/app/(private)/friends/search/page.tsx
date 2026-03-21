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
return (
  <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">

    {/* SEARCH */}
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuários..."
        className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition"
      >
        Buscar
      </button>
    </form>

    {/* TITLE */}
    <h1 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-white">
      Resultados para "{query}"
    </h1>

    {/* EMPTY */}
    {users.length === 0 && (
      <p className="text-sm text-zinc-500">
        Nenhum usuário encontrado
      </p>
    )}

    {/* LIST */}
    <div className="space-y-3">
      {users.map((user: any) => {
        const isFriend = friends.some((f: any) => f.id === user.id);

        return (
          <div
            key={user.id}
            onClick={() => router.push(`/friends/profile/${user.id}`)}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full object-cover"
              />

              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                {user.name}
              </span>
            </div>

            {!isFriend && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sendrequest.mutate(user.id);
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Adicionar
              </button>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
}