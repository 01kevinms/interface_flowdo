import { updatePassword } from "@//routes/put.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";
import { toast } from "sonner";

export function useUpdatePassword(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile(userId),
      }),
      toast.success("senha atualizada")
    },
  });
}