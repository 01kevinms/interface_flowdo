import { QueryClient } from "@tanstack/react-query";

export function invalidateProjectData(queryClient:QueryClient,projectId?:string){
queryClient.invalidateQueries({queryKey:["project", projectId]});
queryClient.invalidateQueries({queryKey:["task-queue", projectId]});
queryClient.invalidateQueries({queryKey:["activity", projectId]});
queryClient.invalidateQueries({queryKey:["projects", projectId]});
queryClient.invalidateQueries({queryKey:["notification", projectId]});
}