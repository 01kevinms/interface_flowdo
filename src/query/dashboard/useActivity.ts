import { GetActivity, GetUserActivity } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useGetActivity(projectId:string){
    return useQuery({
        queryKey:queryKeys.activity.project(projectId),
        queryFn:()=>GetActivity(projectId),
        enabled:!!projectId,
        staleTime:1000 * 30 // evita refetch desnecessario
    })
}


export function useUserActivity(){
    return useQuery({
        queryKey:queryKeys.activity.me(),
        queryFn:GetUserActivity,
    })
}