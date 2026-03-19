import api from "../services/axios.api"
import { TaskPriority, TaskStatus, updateRoleType } from "../types/manyType"

 export async function updatePriority(taskId:string,priority:TaskPriority) {
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

 export async function updatePassword(data:{currentPassword:string;newPassword:string}){
   const res = await api.put("/auth/updatePassword",data)
   return res.data
 }

 export async function RejectInviteProject(inviteId:string,membeId:string) {
    const res = await api.put(`/project/reject/${inviteId}/${membeId}`)
    return res.data
}

 export async function AcceptInviteProject(inviteId:string) {
    const res = await api.put(`/project/accept/${inviteId}`)
    return res.data
}

 export async function UpdateRoleMember(projectId:string,data:updateRoleType) {
    const res = await api.put(`/project/role/${projectId}`,data)
    return res.data
}