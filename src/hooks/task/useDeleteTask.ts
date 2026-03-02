import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProjectData } from "../useInvalidate";
import { DeleteTask } from "@//routes/delete.routes";
import { RejectTask } from "@//routes/put.routes";

export function useDeleteTask(projectId:string){
const queryclient = useQueryClient()
return useMutation({
    mutationFn:(taskId:string)=>DeleteTask(taskId),
    onSuccess:()=> {
      invalidateProjectData(queryclient,projectId)
    }
})
}

export function useRejectTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RejectTask,
    onMutate:async(taskId:string)=>{
        await queryClient.cancelQueries({
            queryKey:["task-queue",projectId]
        })
        const previusTasks = queryClient.getQueryData<any[]>(["task-queue",projectId])
        queryClient.setQueryData(["task-queue",projectId],(old:any[]=[])=>old.filter(task=>task.id !== taskId))

        return{previusTasks}
    },
    onError:(err,taskId,context)=>{
        queryClient.setQueryData(
            ["task-queue",projectId],
            context?.previusTasks
        )
    },
    onSuccess: () => {
      invalidateProjectData(queryClient,projectId)
    },
  });
}
