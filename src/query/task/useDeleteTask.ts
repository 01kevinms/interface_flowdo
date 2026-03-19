import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProjectData, queryKeys } from "../useInvalidate";
import { DeleteTask } from "@//routes/delete.routes";
import { RejectTask } from "@//routes/put.routes";

export function useDeleteTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => DeleteTask(taskId),

    onSuccess: () => {
      invalidateProjectData(queryClient, projectId);
    },
  });
}

export function useRejectTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RejectTask,

    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.task.queue(projectId),
      });

      const previousTasks = queryClient.getQueryData<any[]>(
        queryKeys.task.queue(projectId)
      );

      queryClient.setQueryData(
        queryKeys.task.queue(projectId),
        (old: any[] = []) => old.filter((task) => task.id !== taskId)
      );

      return { previousTasks };
    },

    onError: (_err, _taskId, context) => {
      queryClient.setQueryData(
        queryKeys.task.queue(projectId),
        context?.previousTasks
      );
    },

    onSuccess: () => {
      invalidateProjectData(queryClient, projectId);
    },
  });
}
