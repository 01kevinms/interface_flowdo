"use client"
import { ActionButton } from "@//components/button"
import { CardProjects } from "@//components/cards/project/projects"
import { EmptyState } from "@//components/emptyResponse"
import { emptyConfig } from "@//components/emptyResponse/config"
import { useProjects } from "@//hooks/project/useProjects"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function Projects(){
    const[,setOpen]=useState(false)
    const { data: projects = [] } = useProjects()
    return(
        <div>
            <CardProjects/>     

        {projects.length === 0 && (
            <EmptyState
            {...emptyConfig.projects}
            action={<ActionButton onClick={()=>setOpen(true)}>
                <Plus size={16} />
                Criar Projeto
            </ActionButton>}
            />
        )}
        </div>
    )
}
