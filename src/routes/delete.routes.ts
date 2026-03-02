import api from "../services/axios.api"

export async function DeleteProject(projectId:string) {
    const res = await api.delete(`/project/projects/${projectId}`)
    return res.data
}

export async function DeleteTask(taskId:string) {
    const res = await api.delete(`/task/${taskId}/tasks`)
    return res.data
}
