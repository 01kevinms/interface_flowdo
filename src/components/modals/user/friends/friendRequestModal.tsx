"use client"

import { useState } from "react"
import { ReceivedRequest } from "./request/receiveRequest"
import { SentRequest } from "./request/sendRequest"

type Props = {
  open:boolean
  onClose:()=>void
  userId:string
}

export default function FriendRequestsModal({open,onClose,userId}:Props){

  const [tab,setTab] = useState<"received" | "sent">("received")
  if(!open) return null

 return (
  <div
    className="
      fixed inset-0 z-50 
      flex items-end sm:items-center justify-center
      
      bg-black/50 backdrop-blur-sm
    "
    onClick={onClose}
  >
    {/* MODAL */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        w-full sm:max-w-lg
        
        rounded-t-2xl sm:rounded-2xl
        
        bg-white dark:bg-zinc-900
        
        border border-zinc-200 dark:border-zinc-800
        
        p-4 sm:p-6 
        
        space-y-5
        
        shadow-xl
        
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Pedidos de amizade
        </h2>

        <button
          onClick={onClose}
          className="
            p-1 rounded-md
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            transition
          "
        >
          ✕
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setTab("received")}
          className={`
            text-sm transition
            ${
              tab === "received"
                ? "font-semibold border-b-2 border-blue-500 text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
            }
          `}
        >
          Recebidos
        </button>

        <button
          onClick={() => setTab("sent")}
          className={`
            text-sm transition
            ${
              tab === "sent"
                ? "font-semibold border-b-2 border-blue-500 text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
            }
          `}
        >
          Enviados
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-h-[60vh] overflow-y-auto">
        {tab === "received" && <ReceivedRequest userId={userId} />}
        {tab === "sent" && <SentRequest userId={userId} />}
      </div>
    </div>
  </div>
);
}