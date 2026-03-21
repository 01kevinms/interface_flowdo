"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProjectTypes, TaskStatus } from "@//types/manyType";
import { TasksModal } from "../../modals/tasks";
import { CommentsList } from "../comment/commentList";
import { useGetMembers, useProjectTasks } from "@//query/project/useProject";
import { AddMemberModal } from "../../modals/projects/addMember";
import { ModalMembers } from "../../modals/member/allMember";
import { TasksProject } from "../tasks/taskProjects";
import { useConfirm } from "@//providers/confirmProvider";
import { useExitProject } from "@//query/project/useDeleteProject";

type Props = {
  data: ProjectTypes;
};

export function ProjectLayout({ data }: Props) {
  const[activeModal,setActiveModal]= useState<"membersList" | "task" | "addmember" |null>(null)
  
  const router = useRouter()
  const { data: project, isLoading } = useProjectTasks(data.id);
  const{data:members=[]}=useGetMembers(data.id)
  
  
  const isVisibleTask = (status: TaskStatus) =>
    status === "TODO" || status === "DOING" || status === "DONE";
  
  const task = project?.task;
  const taskLength = task.filter((t:any) => isVisibleTask(t.status)).length
  const stats = {
  todo: task.filter((t:any) => t.status === TaskStatus.TODO).length,
  doing: task.filter((t:any) => t.status === TaskStatus.DOING).length,
  done: task.filter((t:any) => t.status === TaskStatus.DONE).length,
};

const exitproject = useExitProject()
const confirm = useConfirm()
async function handleExit(projectId:string) {
  const ok = await confirm({
    title:"deseja sair do projeto",
    description:""
  })
  if(!ok) return
exitproject.mutate(projectId,{
  onSuccess:()=>router.push(`/projects`)
})
}

const userId = project?.ownerId
const isOwner = data.ownerId === userId;

if (isLoading) return <p>Carregando...</p>;
  return (
     <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-6xl mx-auto">
      {/* ===== HEADER ===== */}
      <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 border-b pb-4">
        {/* INFO */}
        <section className="space-y-2 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white wrap-break-word">
            {data.name}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-4 text-xs sm:text-sm text-zinc-400">
            <span>Criador: {data.owner?.name}</span>
            <span>
              Criado em {new Date(data.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </section>

        {/* ACTIONS */}
        <section className="flex flex-col sm:flex-row flex-wrap gap-2 w-full lg:w-auto">
          {isOwner && (
            <button
              onClick={() => setActiveModal("addmember")}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-zinc-900 text-white hover:opacity-90 transition w-full sm:w-auto"
            >
              Adicionar membro
            </button>
          )}

          <button
            onClick={() => setActiveModal("task")}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:opacity-90 transition w-full sm:w-auto"
          >
            Criar task
          </button>

          <button
            onClick={() => router.push(`/projects/${data.id}/task-queue`)}
            className="px-3 py-2 text-sm rounded-lg border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition w-full sm:w-auto"
          >
            Fila de tasks
          </button>

          <button
            onClick={() => setActiveModal("membersList")}
            className="text-sm text-blue-600 hover:underline text-left sm:text-center"
          >
            Ver membros
          </button>

          <button
            onClick={() => handleExit(data.id)}
            className="px-3 py-2 text-sm rounded-lg border hover:bg-red-50 hover:text-red-600 transition w-full sm:w-auto"
          >
            Sair do projeto
          </button>
        </section>
      </header>

      {/* MODALS */}
      {activeModal === "membersList" && (
        <ModalMembers open close={() => setActiveModal(null)} data={members} />
      )}

      {activeModal === "task" && (
        <TasksModal
          open
          onClose={() => setActiveModal(null)}
          projectId={data.id}
        />
      )}

      {activeModal === "addmember" && (
        <AddMemberModal
          open
          member={members}
          onClose={() => setActiveModal(null)}
          projectId={data.id}
        />
      )}

      {/* ===== STATS ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-semibold">Total</h2>
          <p className="text-sm text-zinc-500">{taskLength}</p>
        </div>

        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-semibold">Em progresso</h2>
          <p className="text-sm text-yellow-500">{stats.doing}</p>
        </div>

        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-semibold">Finalizados</h2>
          <p className="text-sm text-green-600">{stats.done}</p>
        </div>
      </section>

      {/* ===== TASKS ===== */}
      <div className="w-full overflow-x-auto">
        <TasksProject projectId={data.id} />
      </div>

      {/* ===== COMMENTS ===== */}
      <section className="space-y-3">
        <h2 className="border-b pb-1 text-sm sm:text-base font-medium">
          Comentários recentes
        </h2>

        <div className="flex flex-col gap-3">
          {task
            .filter((t:any) => t.status === "DONE")
            .map((t:any) => (
              <div
                key={t.id}
                className="rounded-xl border p-3 sm:p-4 bg-white dark:bg-zinc-900"
              >
                <h3 className="font-medium text-sm sm:text-base mb-2 wrap-break-word">
                  Task: {t.title}
                </h3>

                <CommentsList taskId={t.id} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
