"use client"
import { useProfile } from "@//hooks/user/useProfile";
import { useAuth } from "@//services/auth.guard";

export default function User() {
  const{user}= useAuth()
  const{data,isLoading}=useProfile(user.id)
  
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
          src={data.avatarUrl ?? "/avatar-placeholder.png"}
          alt={data.name}
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h1 className="text-xl font-semibold">{data.name}</h1>
          <p className="text-sm text-zinc-500">{data.email}</p>
        </div>

        <button className="text-sm px-4 py-2 rounded-lg border hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Editar perfil
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Projetos" value={data.stats?.createdProjectsCount ?? 0} />
        <StatCard label="Tarefas sendo feitas" value={data.stats?.doingTasksCount ?? 0} />
        <StatCard label="Tarefas concluídas" value={data.stats?.completedTasksCount ?? 0} />
        <StatCard label="Status" value="Ativo" />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
          Alterar senha
        </button>

        <button className="px-4 py-2 rounded-lg border text-red-500 hover:bg-red-50">
          Sair da conta
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
