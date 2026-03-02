import api from "../services/axios.api";
import { addMemberType, Comments, Tasks } from "../types/manyType";


 export async function LoginUser(email:string,password:string){ 
    const res = await api.post("/auth/login",{
        email,
        password
    })
    return res.data
}

 export async function RegisterUser(name:string,email:string,password:string){
     const res= await api.post("/auth/register",{
        name,
        email,
        password
 })
    return res.data
 } 

 
 export async function RefreshToken(refreshToken:string) {
    const res = await api.post("/auth/refresh",{refreshToken})
    return res.data
 }


 export async function CreateComments(content:Comments,taskId:string) {
   const res = await api.post(`/project/task/${taskId}/comments`,content)
   return res.data
 }

 export async function CreateProjects(data:{name:string; description:string; tasks:Tasks[] }){
    const res = await api.post("/project/create",data)
    return res.data
 }

 export async function ApprovedTask(pendingTaskId:string) {
   const res = await api.post(`/task/${pendingTaskId}/approved`)
   return res.data
 }

 export async function CreateTasks(data:Tasks[],projectId:string) {
    const res = await api.post(`/task/${projectId}/queue`,data)
    return res.data
 }

 export async function AddMember(projectId:string,data:addMemberType) {
    const res = await api.post(`/project/${projectId}/members`,data)
    return res.data
 }
