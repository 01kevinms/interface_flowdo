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