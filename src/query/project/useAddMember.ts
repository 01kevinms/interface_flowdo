import { addMemberType, updateRoleType } from "@//types/manyType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  queryKeys } from "../useInvalidate";
import {  AddMember } from "@//routes/post.routes";
import { toast } from "sonner";
import { AcceptInviteProject, RejectInviteProject, UpdateRoleMember, } from "@//routes/put.routes";

export function useAddMember(projectId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: addMemberType) => AddMember(projectId, data),

    onSuccess: (newInvite) => {
      qc.setQueryData(
        queryKeys.project.invites(projectId),
        (old: any[] = []) => [...old, newInvite]
      );
    },
  });
}

export function useAcceptInviteProject(inviteId:string){
     const qc = useQueryClient()
    return useMutation({
        mutationFn:(inviteId:string)=> AcceptInviteProject(inviteId),
        onSuccess:()=>{
            qc.invalidateQueries({
            queryKey:queryKeys.invites()
        }),
        qc.invalidateQueries({
            queryKey:queryKeys.project.invites(inviteId)
        }),
        qc.invalidateQueries({
            queryKey:queryKeys.notifications()
        }),
         toast.success("pedido aceito")},
        onError:(err)=> {
            toast.error("Erro ao aceitar pedido ")
            console.error("Erro ao aceitar pedido", err)
        }
    })

}


export function useRejectInviteProject(inviteId:string,membeId:string){
     const qc = useQueryClient()
    return useMutation({
        mutationFn:(inviteId:string)=> RejectInviteProject(inviteId,membeId),
        onSuccess:()=>{
             qc.invalidateQueries({
            queryKey:queryKeys.invites()
        }),
        qc.invalidateQueries({
            queryKey:queryKeys.project.invites(inviteId)
        }),
        qc.invalidateQueries({
            queryKey:queryKeys.notifications()
        }),
         toast.success("pedido recusado")},
        onError:(err)=> {
            toast.error("Erro ao recusar pedido ")
            console.error("Erro ao recusar pedido", err)
        }
    })

}

export function useUpdateRoleMember(projectId:string){
const qc= useQueryClient()

return useMutation({
    mutationFn:(data:updateRoleType)=>UpdateRoleMember(projectId,data),
    onSuccess:()=>{
        qc.invalidateQueries({
        queryKey:queryKeys.project.members(projectId)
    }),
    toast.success("função do membro mudou")
},
     onError: (err) => {
      toast.error("Erro ao atualizar função");
      console.error(err);
    },
})

}