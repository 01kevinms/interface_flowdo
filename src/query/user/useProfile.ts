import { getProfile }  from '@//routes/get.routes';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from '../useInvalidate';
import { DeleteUser } from '@//routes/delete.routes';
import { toast } from 'sonner';

export function useProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: getProfile,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
export function useDeleteCount(){

  return useMutation({
    mutationFn:DeleteUser,
    onSuccess:()=>{
      toast.success('conta deletada')
    }
  })
}