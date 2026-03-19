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
return(
 <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl space-y-4 w-96">

        <h2 className="text-lg font-semibold">
          Alterar senha
        </h2>

        <input
          type="password"
          placeholder="Senha atual"
          value={currentPassword}
          onChange={(e)=>setCurrentPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isPending ? "Salvando..." : "Alterar senha"}
          </button>

        </div>

      </div>
    </div>
)
}