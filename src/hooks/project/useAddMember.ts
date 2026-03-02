import { addMemberType } from "@//types/manyType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProjectData } from "../useInvalidate";
import { AddMember } from "@//routes/post.routes";

export function useAddMember(projectId:string){
    const queryclient = useQueryClient()
    
    return useMutation({
        mutationFn:(data:addMemberType)=>AddMember(projectId,data),
        onSuccess:()=>{ 
            invalidateProjectData(queryclient,projectId)
        }
        
    })
}