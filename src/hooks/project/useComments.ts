import { GetComments } from "@//routes/get.routes";
import { CreateComments } from "@//routes/post.routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useComments(taskId:string){
    return useQuery({
        queryKey:["comments",taskId],
        queryFn:()=> GetComments(taskId),
        enabled:!!taskId
    })
}

export function useCreateComment(taskId: string, authorName: string,projectId:string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string }) =>
      CreateComments(data, taskId),

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", taskId],
      });

      const previousComments = queryClient.getQueryData<any[]>(["comments", taskId]);
      const optimisticComment =  {
          id: crypto.randomUUID(),
          content: newComment.content,
          author:{
            name: authorName
          },
          createdAt: new Date().toISOString(),
          optimistic: true,
        }
      queryClient.setQueryData<any[]>(["comments", taskId], (old = []) => [
        ...old,
        optimisticComment
      ]);

      return { previousComments };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["comments", taskId],
        context?.previousComments
      );
    },

onSettled: () => {
  queryClient.invalidateQueries({
    queryKey: ["comments", taskId],
  });
  queryClient.invalidateQueries({
    queryKey:["activity",projectId]
  })
}
  });
}
