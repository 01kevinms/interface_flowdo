import { GetDashboard } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useDashboard() {
  return useQuery({
    queryKey:queryKeys.dashboard(),
    queryFn: GetDashboard,
  });
}
