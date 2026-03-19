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

  return(

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-zinc-900 w-125 rounded-xl p-6 space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Pedidos de amizade</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b pb-2">

          <button
            onClick={()=>setTab("received")}
            className={`${tab==="received" && "font-bold border-b-2 border-blue-500"}`}
          >
            Recebidos
          </button>

          <button
            onClick={()=>setTab("sent")}
            className={`${tab==="sent" && "font-bold border-b-2 border-blue-500"}`}
          >
            Enviados
          </button>

        </div>


        {/* RECEIVED */}
       {tab === "received" && <ReceivedRequest userId={userId}/>}
       {tab == "sent" && <SentRequest userId={userId}/>}

      </div>

    </div>
  )
}