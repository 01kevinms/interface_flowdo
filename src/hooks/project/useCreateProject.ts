import { Tasks } from "@//types/manyType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProjectData } from "../useInvalidate";
import { CreateProjects } from "@//routes/post.routes";

type CreateProjectPayload = {
  name: string;
  description: string;
  tasks: Tasks[];
};

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => CreateProjects(data),
    onSuccess: () => {
      invalidateProjectData(queryClient)
    },
  });
}
