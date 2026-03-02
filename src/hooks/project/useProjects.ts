import { GetProjects }  from '@//routes/get.routes';
import { ProjectTypes } from "@//types/manyType";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => GetProjects(),
    select: (data: ProjectTypes[]) =>
      data.map((project: any) => {
        const tasks = (project.task ?? project.tasks ?? []).filter(
          (task: any) => ["TODO", "DOING","DONE","OCCUPIED"].includes(String(task.status))
        );

        return {
          ...project,
          task: tasks,
        };
      }),
  });
}