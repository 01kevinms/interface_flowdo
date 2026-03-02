"use client"
import { GetNotification } from "@//routes/get.routes";
import { ReadNotification } from "@//routes/put.routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications(){
const queryclient = useQueryClient()

const query = useQuery({
    queryKey: ["notifications"],
    queryFn:async()=>GetNotification(),
    staleTime:1000 * 30
})
const markAsRead = useMutation({
    mutationFn:async(id:string)=> ReadNotification(id),
    onSuccess:()=>{
        queryclient.invalidateQueries({
            queryKey: ["notifications"]
        })
    }
})
return{
    ...query,
    markAsRead
}
}