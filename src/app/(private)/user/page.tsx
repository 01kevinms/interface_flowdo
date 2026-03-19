"use client"
import { AvatarModal } from "@//components/modals/user/avatar";
import { ModalPasword } from "@//components/modals/user/updatePass";
import { useConfirm } from "@//providers/confirmProvider";
import { useDeleteCount, useProfile } from "@//query/user/useProfile";
import { useUpdateProfile } from "@//query/user/useUpdate";
import { useAuth } from "@//services/auth.guard";
import { useState } from "react";

export default function User() {

  const { user, logout } = useAuth()
  const { data, isLoading } = useProfile(user.id)

  const [avatar, setAvatar] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<null | "avatar" | "password">(null)
  const UpdateProfile =useUpdateProfile()
  const deleteUser = useDeleteCount()
  const confirm = useConfirm()
  async function handleExit() {
  const ok = await confirm({
      title:"Desejar sair da conta?",
      description:"sua conta continuara ativa"
  })
  if(!ok) return
  logout()
}
  async function handleDelete() {
  const ok = await confirm({
      title:"Desejar deletar sua conta?",
      description:"essa acao nao pode ser desfeita"
  })
  if(!ok) return
  deleteUser.mutate()
}
  async function saveAvatar() {
    if (!avatar) return
    UpdateProfile.mutate(avatar,{
      onSuccess:()=>{
        setActiveModal(null)
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="text-sm text-zinc-500">Carregando perfil...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">

        <img
          src={avatar ?? data.avatar ??
          `https://api.dicebear.com/7.x/thumbs/svg?seed=${data.name}`}
          className="w-20 h-20 rounded-full border cursor-pointer"
          onClick={() => setActiveModal("avatar")}
        />

        <div className="flex-1">
          <h1 className="text-xl font-semibold">{data.name}</h1>
          <p className="text-sm text-zinc-500">{data.email}</p>
        </div>

        <button
          onClick={() => setActiveModal("avatar")}
          className="text-sm px-4 py-2 rounded-lg border hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Trocar avatar
        </button>

      </div>

      {/* MODAL */}
      {activeModal === "avatar" &&(
      <AvatarModal
      open
      name={data.name}
      avatar={avatar}
      loading={UpdateProfile.isPending}
      onClose={() => setActiveModal(null)}
      onSelect={setAvatar}
      onSave={saveAvatar}
      />
    )}

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Projetos" value={data.stats?.createdProjectsCount ?? 0} />
        <StatCard label="Tarefas sendo feitas" value={data.stats?.doingTasksCount ?? 0} />
        <StatCard label="Tarefas concluídas" value={data.stats?.completedTasksCount ?? 0} />
        <StatCard label="Status" value="Ativo" />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button onClick={()=>setActiveModal("password")}
        className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
          Alterar senha
        </button>
        {activeModal ==="password" &&(
         <ModalPasword open onClose={()=>setActiveModal(null)}/>
        )}

        <button 
        onClick={()=>handleExit()}
        className="px-4 py-2 rounded-lg border text-zinc-500 hover:bg-red-50">
          Sair da conta
        </button>

        <button 
        onClick={()=>handleDelete()}
        className="px-4 py-2 rounded-lg border text-red-500 hover:bg-red-50">
          Deletar conta
        </button>
      </div>

    </div>
  );
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}