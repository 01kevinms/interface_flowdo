// hooks/useCreateTasks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tasks } from "@//types/manyType";
import { invalidateProjectData } from "../useInvalidate";
import { ApprovedTask, CreateTasks } from "@//routes/post.routes";

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tasks: Tasks[]) =>
      CreateTasks(tasks,projectId),

    onSuccess: () => {
      // 🔄 Atualiza o projeto (tasks aparecem sem refresh)
     invalidateProjectData(queryClient,projectId)
    },
  });
}

export function useApprovedTask(projectId:string){
  const queryclient = useQueryClient()

  return useMutation({
    mutationFn:(pendingTaskId:string)=> ApprovedTask(pendingTaskId),
    onSuccess:()=>{
      invalidateProjectData(queryclient,projectId)
    }
  })
}