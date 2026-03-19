import { GetProjects }  from '@//routes/get.routes';
import { ProjectTypes } from "@//types/manyType";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from '../useInvalidate';

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.project.all(),
    queryFn: () => GetProjects(),
    select: (data: ProjectTypes[]) =>{
     return data.map((project: any) => {
        const tasks = (project.task ?? project.tasks ?? []).filter(
          (task: any) =>
            ["TODO", "DOING", "DONE", "OCCUPIED"].includes(
              String(task.status)
            )
        );

        return {
          ...project,
          task: tasks,
        };
      })},
  });
}