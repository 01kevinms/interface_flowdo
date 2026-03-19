import { SearchFriend } from "@//routes/get.routes";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../useInvalidate";

export function useSearchFriend(search: string) {
  return useQuery({
    queryKey: queryKeys.searchUsers(search),
    queryFn: () => SearchFriend(search),
    enabled: !!search
  })
}