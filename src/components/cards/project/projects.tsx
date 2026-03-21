"use client";

import { useConfirm } from "@//providers/confirmProvider";
import { useDeleteProject } from "@//query/project/useDeleteProject";
import { useProjects } from "@//query/project/useProjects";
import { useAuth } from "@//services/auth.guard";
import { Calendar, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";

export function CardProjects() {
  const { data: projects = [], isLoading: loading } = useProjects();
  const { user } = useAuth()
  const deleteProject = useDeleteProject()
  const router = useRouter();
  
  const confirm = useConfirm()
  async function handleDelete(projectId: string){
    const ok = await confirm({
      title:"Deletar Projeto",
      description:"Essa acao nao pode ser desfeita"
    })
    if(!ok) return
    deleteProject.mutate(projectId)
  }

  if (loading) {
    return <p className="text-gray-500">Carregando projetos...</p>;
  }

 return (
  <div
    className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-4 sm:gap-6
      transition-all duration-300
    "
  >
    {projects.map((project) => {
      const taskLength = (project.task ?? []).length;

      return (
        <div
          key={project.id}
          onClick={() => router.push(`/projects/${project.id}`)}
          className="
            group
            rounded-2xl 
            w-full 
            border 
            border-zinc-200 dark:border-zinc-800

            bg-white dark:bg-zinc-900

            p-4 sm:p-5 
            shadow-sm 
            hover:shadow-lg 

            hover:-translate-y-1
            transition-all duration-300

            cursor-pointer
          "
        >
          {/* HEADER */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-col gap-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-100 break-words">
                {project.name}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 break-words">
                {project.description || "Sem descrição"}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              <Calendar size={14} />
              <span>
                {new Date(project.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            <div className="flex items-center gap-1">
              <ListChecks size={14} />
              <span>{taskLength} tasks</span>
            </div>

            {project.ownerId === user?.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project.id!);
                }}
                disabled={deleteProject?.isPending}
                className="
                  text-red-500 hover:text-red-600
                  transition
                "
              >
                {deleteProject?.isPending ? "Deletando..." : "Deletar"}
              </button>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
}
