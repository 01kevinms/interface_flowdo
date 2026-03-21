"use client"
import { ActionButton } from "@//components/button"
import { CardProjects } from "@//components/cards/project/projects"
import { EmptyState } from "@//components/emptyResponse"
import { emptyConfig } from "@//components/emptyResponse/config"
import { CreateProjectModal } from "@//components/modals/projects"
import { useProjects } from "@//query/project/useProjects"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function Projects(){
    const[open,setOpen]=useState(false)
    const { data: projects = [] } = useProjects()
 return (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

    <CardProjects />

    {projects.length === 0 && (
      <div className="flex justify-center py-10">
        <EmptyState
          {...emptyConfig.projects}
          action={
            <ActionButton onClick={() => setOpen(true)}>
              <Plus size={16} />
              Criar Projeto
            </ActionButton>
          }
        />
      </div>
    )}

    <CreateProjectModal open={open} onClose={() => setOpen(false)} />
  </div>
);
}
