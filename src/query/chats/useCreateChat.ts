import { sendMessagesFriend } from '@//routes/post.routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../useInvalidate';

export function useCreateChat() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      friendId,
      content,
    }: {
      friendId: string;
      content: string;
    }) => sendMessagesFriend(friendId, content),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: queryKeys.chat.friend(variables.friendId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.chat.messages(variables.friendId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.chat.all()
      })
       qc.invalidateQueries({
        queryKey: queryKeys.chat.messages(variables.friendId)
      })
    },
  });
}