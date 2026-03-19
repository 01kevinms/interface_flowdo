import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskPriority, TaskStatus } from "@//types/manyType";
import { invalidateProjectData, queryKeys } from "../useInvalidate";
import { updatePriority, updateTaskStatus } from "@//routes/put.routes";

export function useUpdateTaskStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatus(taskId, status),

    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.project.project(projectId),
      });

      const previousData = queryClient.getQueryData<any>(
        queryKeys.project.project(projectId)
      );

      queryClient.setQueryData(
        queryKeys.project.project(projectId),
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            task: old.task.map((task: any) =>
              task.id === taskId ? { ...task, status } : task
            ),
          };
        }
      );

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        queryKeys.project.project(projectId),
        context?.previousData
      );
    },

    onSuccess: () => {
      invalidateProjectData(queryClient, projectId);
    },
  });
}

export function useUpdatePriority(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, priority }: { taskId: string; priority: TaskPriority }) =>
      updatePriority(taskId, priority),

    onMutate: async ({ taskId, priority }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.project.project(projectId),
      });

      const previousData = queryClient.getQueryData<any>(
        queryKeys.project.project(projectId)
      );

      queryClient.setQueryData(
        queryKeys.project.project(projectId),
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            task: (old.task ?? []).map((task: any) =>
              task.id === taskId ? { ...task, priority } : task
            ),
          };
        }
      );

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        queryKeys.project.project(projectId),
        context?.previousData
      );
    },

    onSuccess: () => {
      invalidateProjectData(queryClient, projectId);
    },
  });
}
