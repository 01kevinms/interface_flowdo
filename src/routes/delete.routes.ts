import api from "../services/axios.api"

export async function DeleteProject(projectId:string) {
    const res = await api.delete(`/project/projects/${projectId}`)
    return res.data
}

export async function DeleteTask(taskId:string) {
    const res = await api.delete(`/task/${taskId}/tasks`)
    return res.data
}

export async function RemoveFriend(friendId:string) {
    const res = await api.delete(`/friend/remove/${friendId}`)
    return res.data
}

export async function CancelRequest(friendId:string) {
    const res = await api.delete(`/friend/cancel/${friendId}`)
    return res.data
}

export async function RemoveMemberProject(memberId:string,projectId:string) {
    const res = await api.delete(`/project/remove/${projectId}`, { data: { memberId } })
    return res.data
}

export async function CancelInviteProject(inviteId:string) {
    const res = await api.delete(`/project/cancel/${inviteId}`)
    return res.data
}

export async function ExitProject(projectId:string) {
    const res = await api.delete(`/auth/leave/${projectId}`)
    return res.data
}

export async function DeleteUser() {
    const res = await api.delete("/auth/delete/user")
    return res.data
}