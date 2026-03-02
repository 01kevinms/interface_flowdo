import { GetActivity, GetUserActivity } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";

export function useGetActivity(projectId:string){
    return useQuery({
        queryKey:["activity",projectId],
        queryFn:()=>GetActivity(projectId),
        enabled:!!projectId,
        staleTime:1000 * 30 // evita refetch desnecessario
    })
}


export function useUserActivity(){
    return useQuery({
        queryKey:["activity","me"],
        queryFn:GetUserActivity,
    })
}