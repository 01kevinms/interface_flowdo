"use client";
import { useState } from "react";
import { DoorOpen, Plus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { ProjectTypes, TaskStatus } from "@//types/manyType";
import { TasksModal } from "../../modals/tasks";
import { ActionButton } from "../../button";
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
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [openMember,setOpenMembers]= useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
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
    <div className="flex flex-col gap-8 p-6 max-w-full mx-auto">
      {/* ===== HEADER ===== */}
      <header className="flex justify-between items-start border-b pb-4">
        {/* INFO */}
        <section className="space-y-1">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {data.name}
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {data.description}
          </p>

          <span className="text-sm text-zinc-400">
            Criador do projeto: {data.owner!.name}
          </span>

          <span className="block text-sm text-zinc-400">
            Criado em{" "}
            {new Date(data.createdAt).toLocaleDateString("pt-BR")}
          </span>
        </section>

        {/* ACTIONS */}
        <section className="flex gap-2">
          {isOwner && (
            <ActionButton             
              onClick={() => setIsMemberModalOpen(true)}
            >
              <UserPlus size={16} />
              Adicionar membro
            </ActionButton>
           )} 

          <ActionButton onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} />
            Criar task
          </ActionButton>

            <ActionButton onClick={() => router.push(`/projects/${data.id}/task-queue`)}>
            fila de Task
          </ActionButton>
          <button className="text-sm text-blue-600 hover:underline" onClick={()=>setOpenMembers(true)}>
            ver Membros
          </button>
          <button
          onClick={()=>handleExit(data.id)}
          className="border rounded-md p-2 flex hover:scale-110 transition-all cursor-pointer"
          >
            <DoorOpen/>
            sair do projeto
          </button>
            <ModalMembers open={openMember} close={()=>setOpenMembers(false)} data={members}/>
           
        </section>
        
      </header>

      {/* MODALS */}
      <TasksModal
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        projectId={data.id}
      />

      {/* {isOwner && ( */}
        <AddMemberModal
          member={members}
          open={isMemberModalOpen}
          onClose={() => setIsMemberModalOpen(false)}
          projectId={data.id}
        />
      {/* )} */}

      {/* ===== STATS ===== */}
      <section className="flex justify-around bg-white p-3 border rounded-sm">
        <h2 className="text-xl font-semibold">
          Total ({taskLength})
        </h2>
        <h2 className="text-xl font-semibold">
          Em progresso ({stats.doing})
        </h2>
        <h2 className="text-xl font-semibold">
          Finalizados ({stats.done})
        </h2>
      </section>

      {/* ===== TASKS ===== */}
      <TasksProject projectId={data.id} />

      {/* ===== COMMENTS ===== */}
      <section className="m-2">
        <h2 className="border-b mb-2">Comentários recentes</h2>

        {task
          .filter((t:any) => t.status === TaskStatus.DONE)
          .map((t:any) => (
            <div key={t.id} className="rounded-lg border p-3 m-2">
              <h3 className="font-medium text-sm mb-2">
                Task: {t.title}
              </h3>
              <CommentsList taskId={t.id} />
            </div>
          ))}
      </section>
    </div>
  );
}
