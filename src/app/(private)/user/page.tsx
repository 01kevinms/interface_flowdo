"use client"
import { AvatarModal } from "@//components/modals/user/avatar";
import { ModalPasword } from "@//components/modals/user/updatePass";
import { useConfirm } from "@//providers/confirmProvider";
import { useDeleteCount, useProfile } from "@//query/user/useProfile";
import { useUpdateProfile } from "@//query/user/useUpdate";
import { useAuth } from "@//services/auth.guard";
import { StatCard } from "@//utils/manyUtils";
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
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 bg-zinc-50 dark:bg-zinc-950">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">

      {/* AVATAR */}
      <div className="relative group w-fit">
        <img
          src={
            avatar ??
            data.avatar ??
            `https://api.dicebear.com/7.x/thumbs/svg?seed=${data.name}`
          }
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-zinc-300 dark:border-zinc-700 object-cover cursor-pointer transition group-hover:opacity-80"
          onClick={() => setActiveModal("avatar")}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-medium text-white bg-black/40 rounded-full">
          Editar
        </div>
      </div>

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-zinc-100 truncate">
          {data.name}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
          {data.email}
        </p>
      </div>

      {/* ACTION */}
      <button
        onClick={() => setActiveModal("avatar")}
        className="w-full sm:w-auto text-sm px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
      >
        Trocar avatar
      </button>
    </div>

    {/* MODAL */}
    {activeModal === "avatar" && (
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 dark:text-gray-300">
      <StatCard label="Projetos" value={data.stats?.createdProjectsCount ?? 0} />
      <StatCard label="Em andamento" value={data.stats?.doingTasksCount ?? 0} />
      <StatCard label="Concluídas" value={data.stats?.completedTasksCount ?? 0} />
      <StatCard label="Status" value="Ativo" />
    </div>

    {/* ACTIONS */}
    <div className="flex flex-col sm:flex-row gap-3">

      {/* PRIMARY */}
      <button
        onClick={() => setActiveModal("password")}
        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
      >
        Alterar senha
      </button>

      {activeModal === "password" && (
        <ModalPasword open onClose={() => setActiveModal(null)} />
      )}

      {/* SECONDARY */}
      <button
        onClick={() => handleExit()}
        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
      >
        Sair da conta
      </button>

      {/* DANGER */}
      <button
        onClick={() => handleDelete()}
        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-300 dark:border-red-800 bg-white dark:bg-zinc-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
      >
        Deletar conta
      </button>
    </div>
  </div>
);
}