import { getProfile }  from '@//routes/get.routes';
import { useQuery } from "@tanstack/react-query";

export function useProfile(userId:string){
    return useQuery({
        queryKey:["profile",userId],
        queryFn:()=>getProfile(),
        enabled:!!userId
    })
}