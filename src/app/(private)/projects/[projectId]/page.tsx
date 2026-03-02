"use client"
import { ProjectLayout } from "@//components/cards/project/projectByID"
import { GetProjectsId }  from '@//routes/get.routes';
import { ProjectTypes } from "@//types/manyType"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function ProjectById(){
    const {projectId}=useParams()
    console.log()
    const[project,setProject]= useState<ProjectTypes | null>(null)
    useEffect(()=>{
        const res =async()=> await GetProjectsId(projectId as string).then(setProject)
     res()
    },[projectId])
    if(!project)return <div>carregando...</div>
    return ( 
        <div>
            <ProjectLayout data={project}/>
        </div>
    )
}