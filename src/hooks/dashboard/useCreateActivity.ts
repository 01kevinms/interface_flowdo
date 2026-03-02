import { GetDashboard } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: GetDashboard,
  });
}
