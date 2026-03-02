import { DeleteProject } from "@//routes/delete.routes";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProjectData } from "../useInvalidate";

export function useDeleteProject(){
const queryclient = useQueryClient()
return useMutation({
    mutationFn:(projectId:string)=>DeleteProject(projectId),
    onSuccess:()=>{
        queryclient.invalidateQueries({
            queryKey:["projects"]
        })
    },
    onError:(err)=>{
        console.error("Erro ao deletar o projeto:", err);
    }
})

}