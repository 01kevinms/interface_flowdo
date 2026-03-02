import api from "../services/axios.api"
import { TaskStatus } from "../types/manyType"

 export async function updatePriority(taskId:string,priority:number) {
   const res = await api.put(`/task/${taskId}/priority`,{priority})
   return res.data
 }

 export async function updateTaskStatus(taskId:string,status:TaskStatus) {
   const res = await api.put(`/task/${taskId}/status`,{status})
   return res.data
 }

 export async function RejectTask(pendingTaskId:string) {
    const res = await api.put(`/task/${pendingTaskId}/reject`)
    return res.data
}


 export async function ReadNotification(notificationId:string) {
    const res = await api.put(`/auth/${notificationId}/me`)
    return res.data
}

