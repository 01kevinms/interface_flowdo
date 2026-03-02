import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatus } from "@//types/manyType";
import { invalidateProjectData } from "../useInvalidate";
import { updatePriority, updateTaskStatus } from "@//routes/put.routes";

export function useUpdateTaskStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>updateTaskStatus(taskId, status),

    // OPTIMISTIC UPDATE
    onMutate: async ({ taskId, status }) => {
        // cancel old request
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });
    //   save state actual
      const previousData = queryClient.getQueryData<any>(["project",projectId]);
    //   update UI insta
      queryClient.setQueryData(["project", projectId], (old: any) => ({
        ...old,
        task: old.task.map((task: any) =>
          task.id === taskId ? { ...task, status } : task
        ),
      }));
    //   return state update
      return { previousData };
    },

    // if api fail, return UI for old state
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["project", projectId],
        context?.previousData
      ),_err.message ?? "Task ocupada"
    },

    onSuccess:()=>{
   invalidateProjectData(queryClient,projectId)
    },

  });
}

export function useUpdatePriority(projectId:string){
const queryclient = useQueryClient()

return useMutation({
  mutationFn:({taskId,priority}:{taskId:string,priority:number})=>updatePriority(taskId,priority),
  onMutate:async({taskId,priority})=>{
    await queryclient.cancelQueries({
      queryKey:["project",projectId]
    })
    const previousData = queryclient.getQueryData<any>(["project",projectId])

    queryclient.setQueryData(["project",projectId],(old:any)=>{
      if (!old) return old;

      return {
        ...old,
        task:(old.task ?? []).map((task:any)=> task.id === taskId ? {...task,priority}:task)
      };
    })
    console.log(queryclient.getQueryCache().getAll().map(q=>q.queryKey))
    return { previousData }
  },
  onError:(_err,_vars,context)=>{
    queryclient.setQueryData(["project",projectId],context?.previousData)
  },
  onSuccess:()=>{
   invalidateProjectData(queryclient,projectId)
  }
}
)
  
}
