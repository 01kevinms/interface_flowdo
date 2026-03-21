"use client"
import { useUpdatePassword } from "@//query/user/usePass";
import { useAuth } from "@//services/auth.guard";
import { useState } from "react";


type Props={
    open:boolean,
    onClose:()=>void
}
export function ModalPasword({open,onClose}:Props){
const {user}= useAuth()
const{mutate,isPending}= useUpdatePassword(user.id)

const [currentPassword, setCurrentPassword] = useState("")
const [newPassword, setNewPassword] = useState("")

function handleSubmit(){
    mutate({currentPassword,newPassword},
        {onSuccess:()=>{
            onClose()
        }}
    )
}

if(!open) return null

return (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    {/* MODAL */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl
        bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 
        space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
    >
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Alterar senha
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
          ✕
        </button>
      </header>

      {/* FORM */}
      <div className="space-y-3">
        <input
          type="password"
          placeholder="Senha atual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 text-sm 
          text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 text-sm 
          text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800
          rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
          Cancelar
        </button>

        <button
          onClick={handleSubmit}
          disabled={!currentPassword || !newPassword || isPending}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition">
          {isPending ? "Salvando..." : "Alterar senha"}
        </button>
      </div>
    </div>
  </div>
);
}