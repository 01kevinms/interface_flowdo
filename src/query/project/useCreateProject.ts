import { Tasks } from "@//types/manyType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  queryKeys } from "../useInvalidate";
import { CreateProjects } from "@//routes/post.routes";

type CreateProjectPayload = {
  name: string;
  description: string;
  tasks: Tasks[];
};

export function useCreateProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => CreateProjects(data),
    onSuccess: (projectId) => {
      qc.invalidateQueries({
        queryKey:queryKeys.project.project(projectId)
      })
      qc.invalidateQueries({
        queryKey:queryKeys.activity.project(projectId)
      })
      qc.invalidateQueries({
        queryKey:queryKeys.project.all()
      })
      qc.invalidateQueries({
        queryKey:queryKeys.activity.me()
      })
      qc.invalidateQueries({
        queryKey:queryKeys.dashboard()
      })
    },
  });
}
