import { QueryClient } from "@tanstack/react-query";

export function invalidateProjectData(queryClient:QueryClient,projectId:string){
queryClient.invalidateQueries({queryKey:["project", projectId]});
queryClient.invalidateQueries({queryKey:["task-queue", projectId]});
queryClient.invalidateQueries({queryKey:["activity", projectId]});
queryClient.invalidateQueries({queryKey:["projects", projectId]});
queryClient.invalidateQueries({queryKey:["notification", projectId]});
 queryClient.invalidateQueries({queryKey: ["project", projectId]});
  queryClient.invalidateQueries({queryKey: queryKeys.task.queue(projectId)});
}
export const queryKeys = {
  friends: () => ["friends"] as const,
  friend: (friendId: string) => ["friend", friendId] as const,
  friendStatus: (userId: string) => ["friendStatus", userId] as const,
  friendRequestsReceived: (userId: string) => ["friendRequestsReceived", userId] as const,
  friendRequestsSent: (userId: string) =>["friendRequestsSent", userId] as const,
  searchUsers: (search: string) => ["search-users", search] as const,
  notifications: () => ["notifications"] as const,
  invites: () => ["invites"] as const,
  profile: (userId: string) => ["profile", userId] as const,
  dashboard:()=>["dashboard"] as const,
  project: {
    all: () => ["projects"] as const,
    project: (projectId: string) =>["project", projectId] as const,
    detail: (projectId: string) => ["project", projectId] as const,
    members: (projectId: string) => ["project", projectId, "members"] as const,
    invites: (inviteId: string) => ["project", inviteId, "invites"] as const,    
  },
  comments: {
    task: (taskId: string) => ["comments", taskId] as const,
  },
  task: {
    queue: (projectId: string) => ["task", projectId, "queue"] as const,
  },
   activity: {
    project: (projectId: string) => ["activity", projectId] as const,
    me: () => ["activity", "me"] as const,
  },

  chat: {
    all: () => ["chats"] as const,
    messages: (friendId: string) => ["messages", friendId] as const,
    friend: (friendId: string) => ["chat", friendId] as const,
  }
};