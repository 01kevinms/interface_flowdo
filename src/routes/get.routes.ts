import api from "../services/axios.api"

 export async function GetProjects() {
    const res = await api.get("/project/projects")
    return res.data
 }

 export async function getProfile() {
   const res = await api.get("/auth/profile")
   return res.data
 }

  export async function GetProjectsId(projectId:string) {
    const res = await api.get(`/project/${projectId}`)
    return res.data
 }

   export async function GetPendingTask(projectId:string) {
    const res = await api.get(`/task/${projectId}/pending`)
    return res.data
 }

  export async function GetComments(taskId:string) {
    const res = await api.get(`/project/${taskId}/comments`)
    return res.data
 }

 export async function GetActivity(projectId:string) {
    const res = await api.get(`/project/${projectId}/acitivity`)
    return res.data
 }

  export async function GetUserActivity() {
    const res = await api.get("/project/activity/me")
    return res.data
 }

  export async function GetDashboard() {
    const res = await api.get("/project/home/dashboard")
    return res.data
 }

  export async function GetNotification() {
    const res = await api.get("/auth/notification/user")
    return res.data
 }

  export async function GetConversations(friendId:string) {
    const res = await api.get(`/chat/${friendId}`)
    return res.data
 }
 
  export async function GetChatsUser() {
    const res = await api.get("/chat")
    return res.data
 }

   export async function GetFriendsSend() {
    const res = await api.get("/friend/send")
    return res.data
 }

 export async function GetFriendsReceived() {
    const res = await api.get("/friend/received")
    return res.data
 }
 
 export async function GetFriends() {
   const res = await api.get("/friend")
   return res.data
 }

  export async function GetFriendStatus(friendId:string) {
    const res = await api.get(`/friend/status/${friendId}`)
    return res.data
 }

   export async function SearchFriend(q:string) {
    const res = await api.get("/friend/search",{
      params:{q}
    })
    return res.data
 }

   export async function GetProfileFriend(friendId:string) {
    const res = await api.get(`/friend/profile/${friendId}`)
    return res.data
 }

    export async function GetMembers(projectId:string) {
    const res = await api.get(`/project/members/${projectId}`)
    return res.data
 }

   export async function GetInvites() {
   const res = await api.get("/project/invites/user")
   return res.data
   }