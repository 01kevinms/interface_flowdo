import { toast } from "sonner";

import { CancelInviteProject, DeleteProject, ExitProject, RemoveMemberProject } from "@//routes/delete.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useDeleteProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => DeleteProject(projectId),

    onSuccess: (_,projectId) => {
      qc.invalidateQueries({
        queryKey: queryKeys.project.all(),
      });
    qc.invalidateQueries({
        queryKey:queryKeys.activity.project(projectId)
      })
      qc.invalidateQueries({
        queryKey:queryKeys.activity.me()
      }) 
      qc.invalidateQueries({
        queryKey:queryKeys.dashboard()
      })
      toast.success("projeto deletado");
    },

    onError: (err) => {
      toast.error("Erro ao deletar o projeto");
      console.error("Erro ao deletar o projeto:", err);
    },
  });
}

export function useRemoveMember(projectId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) =>
      RemoveMemberProject(memberId, projectId),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.project.detail(projectId),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.project.members(projectId),
      });

      toast.success("membro removido");
    },

    onError: (err) => {
      toast.error("Erro ao remover membro");
      console.error("Erro ao remover membro", err);
    },
  });
}

export function useCancelInviteProject(projectId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (inviteId: string) => CancelInviteProject(inviteId),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.project.members(projectId),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.project.invites(projectId),
      });

      toast.success("Envio de pedido cancelado");
    },

    onError: (err) => {
      toast.error("Erro ao cancelar pedido");
      console.error("Erro ao cancelar pedido", err);
    },
  });
}

export function useExitProject(){
const qc = useQueryClient()
return useMutation({
  mutationFn:(projectId:string)=>ExitProject(projectId),
  onSuccess:(data,projectId)=>{
    qc.invalidateQueries({
      queryKey:queryKeys.project.all()
    })
    qc.invalidateQueries({
    queryKey:queryKeys.project.project(projectId)
    })
    qc.invalidateQueries({
    queryKey:queryKeys.activity.project(projectId)
    })
    qc.invalidateQueries({
    queryKey:queryKeys.activity.me()
    })
    toast.success(data.message)
  },
  onError:(err:any)=>{
const message = err.response.data.message
    toast.error(message)
    console.error(message)
  }
})
}