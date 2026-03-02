"use client";

import { useDeleteProject } from "@//hooks/project/useDeleteProject";
import { useProjects } from "@//hooks/project/useProjects";
import { useAuth } from "@//services/auth.guard";
import { Calendar, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";

export function CardProjects() {
  const { data: projects = [], isLoading: loading } = useProjects();
  const { user } = useAuth()
  const deleteProject = useDeleteProject()
  const router = useRouter();

  function handleDelete(projectId: string){
    deleteProject.mutate(projectId)
  }

  if (loading) {
    return <p className="text-gray-500">Carregando projetos...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 duration-300 transition-all">
      {projects.map((project) => {
        const taskLength = (project.task ?? []).length;
        return (
        <div
          key={project.id}
          onClick={()=>router.push(`/projects/${project.id}`)}
          className="rounded-xl w-full border hover:scale-101 bg-white p-5 shadow-sm hover:shadow-md transition-all"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
           
           <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {project.name}
            </h2>

            <p className="text-sm text-gray-500 line-clamp-2">
              {project.description || "Sem descrição"}
            </p>
            </div> 
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>
                {new Date(project.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* FOOTER / META */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-1">
              <ListChecks size={16} />
              <span>{taskLength} tasks</span>
            </div>

            <div className="flex items-center gap-1">
              {project.ownerId === user?.id &&(

                <button onClick={(e)=>{
                  e.stopPropagation()
                handleDelete(project.id!)}}
                disabled={deleteProject?.isPending}
                className="mt-2 text-red-500"
                >
                {deleteProject?.isPending ? "Deletando..." : "Deletar"}
              </button>
              )}
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
}
