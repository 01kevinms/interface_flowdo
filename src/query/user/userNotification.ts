"use client"
import { GetInvites, GetNotification } from "@//routes/get.routes";
import { ReadNotification } from "@//routes/put.routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.notifications(),
    queryFn: GetNotification,
    staleTime: 1000 * 30,
  });

  const markAsRead = useMutation({
    mutationFn: (id: string) => ReadNotification(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications(),
      });

      const previous = queryClient.getQueryData<any>(
        queryKeys.notifications()
      );

      queryClient.setQueryData<any>(queryKeys.notifications(), (old: any[]) =>
        old?.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        queryKeys.notifications(),
        context?.previous
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications(),
      });
    },
  });

  return {
    ...query,
    markAsRead,
  };
}

export function useGetInvites() {
  return useQuery({
    queryKey: queryKeys.invites(),
    queryFn: GetInvites,
    staleTime: 1000 * 30,
  });
}