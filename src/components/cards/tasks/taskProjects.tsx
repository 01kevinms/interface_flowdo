"use client";

import { Tasks, TaskStatus } from "@//types/manyType";
import { useProjectTasks } from "@//query/project/useProject";
import { useAuth } from "@//services/auth.guard";
import { TaskColumn } from "./taskColum";

export function TasksProject({ projectId }: { projectId: string }) {
  const { data, isLoading } = useProjectTasks(projectId);
  const { user } = useAuth();

  if (isLoading) {
    return <p className="text-sm text-zinc-500">Carregando tarefas...</p>;
  }

  const tasks = data.tasks;

const stats = {
  occupied: tasks.filter((t:Tasks)=> t.status === TaskStatus.DOING && t.doingById && t.doingById !== user.id ),
  todo: tasks.filter((t:any)=> t.status === TaskStatus.TODO),
  doing: tasks.filter((t:any)=> t.status === TaskStatus.DOING && t.doingById === user.id),
  done: tasks.filter((t:any)=> t.status === TaskStatus.DONE),
};

 return (
  <section className="flex flex-col gap-6 w-full">
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4 
        gap-4 sm:gap-6

        bg-zinc-50 
        dark:bg-zinc-950 

        p-3 sm:p-4 
        rounded-xl
      "
    >
      <TaskColumn
        title="A Fazer"
        tasks={stats.todo}
        projectId={projectId}
      />

      <TaskColumn
        title="Fazendo"
        tasks={stats.doing}
        projectId={projectId}
      />

      <TaskColumn
        title="Finalizadas"
        tasks={stats.done}
        projectId={projectId}
      />

      <TaskColumn
        title="Ocupadas"
        tasks={stats.occupied}
        projectId={projectId}
      />
    </div>
  </section>
);
}
