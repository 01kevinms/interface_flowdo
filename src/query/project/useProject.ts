import { GetMembers, GetProjectsId } from '@//routes/get.routes';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../useInvalidate';
import { TaskPriority } from '@//types/manyType';

const priorityWeight: Record<TaskPriority, number> = {
  URGENT: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};

export function useProjectTasks(projectId:string){
return useQuery({
    // each projeto has a separate cache 
    // when u call:  queryKey:["project",projectId],
    // so this project is update
    queryKey:["project",projectId],

    // function to fetch for data in the backend
    queryFn:()=>GetProjectsId(projectId),

    // without select `Cannot read properties of undefined (reading 'map')` will not occur.`
    // it transform the datas before it reaches the component
    // unsures that tasks will never be undefined
    select:(data:any)=>{
      const task = data.task ?? data.tasks ?? []
      const sortedTasks = [...data.task].sort((a,b)=>priorityWeight[a.priority as TaskPriority] - priorityWeight[b.priority as TaskPriority])
      return {
        ...data,
        task,
        tasks: sortedTasks,
      }
    },

    // keep a safe shape before the first response arrives
    placeholderData: (previousData:any) =>
      previousData ?? {
        task: [],
        tasks: [],
      },

    // convert in boolean
    // with enabled the query only runs when the projectId exist
    enabled:!!projectId
})
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: queryKeys.project.project(projectId),
    queryFn: () => GetProjectsId(projectId),
    enabled: !!projectId
  })
}

export function useGetMembers(projectId: string) {
  return useQuery({
    queryKey: queryKeys.project.members(projectId),
    queryFn: () => GetMembers(projectId),

    select: (data: any[] = []) =>
      data.filter((member) => member.status === "ACCEPTED"),

    enabled: !!projectId,
  });
}

export function useGetInvitesPending(projectId: string) {
  return useQuery({
    queryKey: queryKeys.project.invites(projectId),
    queryFn: () => GetMembers(projectId),

    select: (data: any[] = []) =>
      data.filter((member) => member.status === "PENDING"),

    enabled: !!projectId,
  });
}