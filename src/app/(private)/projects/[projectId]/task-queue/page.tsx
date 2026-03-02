"use client"

import { useApprovedTask } from "@//hooks/task/useCreateTasks";
import {  useRejectTask } from "@//hooks/task/useDeleteTask";
import { useTaskQueue } from "@//hooks/task/useGetTask";
import { TaskPending } from "@//types/manyType";
import { useParams } from "next/navigation";

export default function TaskQueuePage() {
  const {projectId} = useParams()
  const { data, isLoading } = useTaskQueue(projectId as string)
  const{mutate:RejectTask}=useRejectTask(projectId as string)
  const{mutate:acceptTask }=useApprovedTask(projectId as string)
  const tasks = data ?? []
  if (isLoading) return <p>Carregando fila...</p>

  if (!tasks.length) {
    return <p>Nenhuma task pendente 🎉</p>
  }
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Fila de aprovação</h1>

      {tasks.map((task:TaskPending) => (
        <div
          key={task.id}
          className="border rounded p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            
            <p className="text-sm text-gray-500">
              Solicitado por {task.requestedBy?.name ?? "Desconhecido"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => acceptTask(task.id!)}
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              aceitar
            </button>
            <button
              onClick={() => RejectTask(task.id!)}
              className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              rejeitar
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

