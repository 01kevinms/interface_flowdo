import { GetPendingTask } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";

export function useTaskQueue(projectId:string){

    return useQuery({
        queryKey:["task-queue",projectId],
        queryFn:()=> GetPendingTask(projectId),
        enabled:!!projectId
    })
}
