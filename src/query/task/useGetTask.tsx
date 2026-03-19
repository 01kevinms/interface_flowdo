import { GetPendingTask } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useTaskQueue(projectId: string) {
  return useQuery({
    queryKey: queryKeys.task.queue(projectId),
    queryFn: () => GetPendingTask(projectId),
    enabled: !!projectId,
  });
}
