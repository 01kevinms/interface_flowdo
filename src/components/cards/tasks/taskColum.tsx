"use client"
import { Tasks, TaskStatus } from "@//types/manyType";
import { CreateCommentModal } from "../../modals/comments/comments";
import { useAuth } from "@//services/auth.guard";
import { useDeleteTask } from "@//hooks/task/useDeleteTask";
import { useUpdatePriority, useUpdateTaskStatus } from "@//hooks/task/useUpdateTask";
import { useState } from "react";

function statusColor(status: TaskStatus | any) {
     switch (status) { 
        case TaskStatus.TODO: 
        return "bg-zinc-200 text-zinc-800"; 
        case TaskStatus.DOING: 
        return "bg-yellow-200 text-yellow-800"; 
        case TaskStatus.DONE: 
        return "bg-green-200 text-green-800";
        default: 
        return ""; } } 

type Props = {
     title: string; 
     tasks: Tasks[]; 
     projectId: any; 
    };
export function TaskColumn({ title, tasks, projectId }: Props) {
  const [comments, setComments] = useState<string | null>(null);
  const { mutate } = useUpdateTaskStatus(projectId);
  const {
    mutate: updatePriority,
    isPending: isUpdatingPriority,
    variables: priorityVariables,
  } = useUpdatePriority(projectId);
  const { mutate: deletetask } = useDeleteTask(projectId);
  const { user } = useAuth();
console.log()
  function handleChange(taskId: string, status: TaskStatus) {
    mutate(
      { taskId, status },
      {
        onSuccess: () => {
          if (status === TaskStatus.DONE) {
            setComments(taskId);
          }
        },
      }
    );
  }

  function handlePriority(taskId:string,priority:number){
    updatePriority({taskId,priority})
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-sm font-semibold text-center bg-zinc-100 dark:bg-zinc-800 py-2 rounded-md">
        {title} <span className="text-xs">({tasks.length})</span>
      </h3>

      {tasks.length === 0 ? (
        <p className="text-sm text-center text-zinc-500">
          Nenhuma tarefa
        </p>
      ) : (
        tasks.map((task) => {
          const isLocked =
            task.status === TaskStatus.DOING &&
            task.doingById &&
            task.doingById !== user.id;

          return (
            <div
              key={task.id}
              className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm"
            >
              {/* TITLE + STATUS */}
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium">{task.title}</h4>

                <select
                  value={task.status}
                  disabled={!!isLocked}
                  onChange={(e) =>
                    handleChange(task.id!, e.target.value as TaskStatus)
                  }
                  className={`text-xs font-semibold rounded-full px-2 py-1
                    ${statusColor(task.status!)}
                    ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {Object.values(TaskStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* INFO DE BLOQUEIO */}
              {isLocked && (
                <p className="mt-1 text-xs text-red-500">
                  Ocupado por {task.doingBy?.name}
                </p>
              )}

              <p className="mt-2 text-sm text-zinc-600">
                {task.description}
              </p>

              <div className="mt-3 flex justify-between items-center text-xs">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriority(task.id!, Number(e.target.value))}
                  disabled={
                    isUpdatingPriority && priorityVariables?.taskId === task.id
                  }
                  className={`rounded-md border px-2 py-1 disabled:opacity-60
                    ${isLocked  ? "opacity-50 cursor-not-allowed":""}
                    `}
                >
                  {[1,2,3,4,5].map((n)=>(
                    <option value={n} key={n}>
                      Prioridade {n}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => deletetask(task.id!)} disabled={!!isLocked}
                  className="text-red-500 hover:text-red-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          );
        })
      )}

      {comments && (
        <CreateCommentModal
          taskId={comments}
          onClose={() => setComments(null)}
        />
      )}
    </div>
  );
}
