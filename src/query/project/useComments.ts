import { GetComments } from "@//routes/get.routes";
import { CreateComments } from "@//routes/post.routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useComments(taskId: string) {
  return useQuery({
    queryKey: queryKeys.comments.task(taskId),
    queryFn: () => GetComments(taskId),
    enabled: !!taskId,
  });
}

export function useCreateComment(taskId: string,authorName: string,projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string }) =>
      CreateComments(data, taskId),

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.task(taskId),
      });

      const previousComments = queryClient.getQueryData<any[]>(
        queryKeys.comments.task(taskId)
      );

      const optimisticComment = {
        id: crypto.randomUUID(),
        content: newComment.content,
        author: { name: authorName },
        createdAt: new Date().toISOString(),
        optimistic: true,
      };

      queryClient.setQueryData<any[]>(
        queryKeys.comments.task(taskId),
        (old = []) => [...old, optimisticComment]
      );

      return { previousComments };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        queryKeys.comments.task(taskId),
        context?.previousComments
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.task(taskId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.activity.project(projectId),
      });
    },
  });
}
