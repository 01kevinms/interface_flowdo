"use client"

import { ProjectLayout } from "@//components/cards/project/projectByID"
import { useProject } from "@//query/project/useProject";
import { useParams } from "next/navigation"


export default function ProjectById() {
  const { projectId } = useParams() as { projectId: string }

  const { data: project, isLoading } = useProject(projectId)

  if (isLoading) return <div>carregando...</div>
  if (!project) return <div>Projeto não encontrado</div>
return (
  <div className="px-4 sm:px-6 py-6">
    <ProjectLayout data={project} />
  </div>
);
}