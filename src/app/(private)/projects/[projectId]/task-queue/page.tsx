"use client"

import { useGetMembers } from "@//query/project/useProject";
import { useApprovedTask } from "@//query/task/useCreateTasks";
import {  useRejectTask } from "@//query/task/useDeleteTask";
import { useTaskQueue } from "@//query/task/useGetTask";
import { useAuth } from "@//services/auth.guard";
import { TaskPending } from "@//types/manyType";
import { useParams } from "next/navigation";

export default function TaskQueuePage() {
  const {projectId} = useParams()
  const{user} = useAuth()
  const { data:tasks=[], isLoading } = useTaskQueue(projectId as string)
  const{mutate:RejectTask}=useRejectTask(projectId as string)
  const{mutate:acceptTask }=useApprovedTask(projectId as string)
  const{data:members=[]}=useGetMembers(projectId as string)
  const member = members.find((mbr)=> mbr.user.id == user.id)
  const isowner = member?.role === "OWNER" || member?.role === "ADMIN"

  console.log(tasks)
  if (isLoading) return <p>Carregando fila...</p>

  if (!tasks.length) {
    return <p>Nenhuma task pendente 🎉</p>
  }
 return (
  <section className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">

    {/* HEADER */}
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-white">
        Fila de aprovação
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Tasks aguardando aprovação
      </p>
    </div>

    {/* LISTA */}
    <div className="space-y-3">
      {tasks.length === 0 && (
        <p className="text-sm text-center text-zinc-500 py-10">
          Nenhuma task pendente
        </p>
      )}

      {tasks.map((task: TaskPending) => (
        <div
          key={task.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm hover:shadow-md transition"
        >
          {/* INFO */}
          <div className="min-w-0">
            <p className="font-medium text-zinc-800 dark:text-white truncate">
              {task.title}
            </p>

            <p className="text-xs text-zinc-500 mt-1">
              Solicitado por{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {task.requestedBy?.name ?? "Desconhecido"}
              </span>
            </p>
          </div>

          {/* ACTIONS */}
          {isowner && (
            <div className="flex gap-2 w-full sm:w-auto">
              
              <button
                onClick={() => acceptTask(task.id!)}
                className="flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Aceitar
              </button>

              <button
                onClick={() => RejectTask(task.id!)}
                className="flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Rejeitar
              </button>

            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);
}

