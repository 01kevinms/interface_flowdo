import { GetProjectsId } from '@//routes/get.routes';
import { useQuery } from '@tanstack/react-query';


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
      return {
        ...data,
        task,
        tasks: task,
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
