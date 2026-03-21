"use client"
import { PropsTaskColum, TaskPriority, Tasks, TaskStatus } from "@//types/manyType";
import { CreateCommentModal } from "../../modals/comments/comments";
import { useAuth } from "@//services/auth.guard";
import { useDeleteTask } from "@//query/task/useDeleteTask";
import { useUpdatePriority, useUpdateTaskStatus } from "@//query/task/useUpdateTask";
import { useState } from "react";
import { useConfirm } from "@//providers/confirmProvider";
import { statusColor } from "@//utils/manyUtils";

export function TaskColumn({ title, tasks, projectId }: PropsTaskColum) {
  const [comments, setComments] = useState<string | null>(null);
  const { mutate } = useUpdateTaskStatus(projectId);
  const {mutate: updatePriority,isPending: isUpdatingPriority,variables: priorityVariables,} = useUpdatePriority(projectId);
  const { mutate: deletetask } = useDeleteTask(projectId);
  const { user } = useAuth();
  const priorities = [
  TaskPriority.URGENT,
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW
];
const confirm= useConfirm()
async function handleDelete(taskId:string) {
  const ok = await confirm({
    title:"Deletar task",
    description:"Essa acao nao pode ser desfeita"
  })
  if(!ok) return
  deletetask(taskId)
}
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

  function handlePriority(taskId:string,priority:TaskPriority){
    updatePriority({taskId,priority})
  }

 return (
  <div className="flex flex-col gap-3 w-full min-w-0">
    {/* HEADER */}
    <h3 className="text-xs sm:text-sm font-semibold text-center bg-zinc-100 dark:bg-zinc-800 py-2 rounded-md">
      {title} <span className="text-xs opacity-70">({tasks.length})</span>
    </h3>

    {/* EMPTY STATE */}
    {tasks.length === 0 ? (
      <p className="text-xs sm:text-sm text-center text-zinc-500 py-4">
        Nenhuma tarefa
      </p>
    ) : (
      <div className="flex flex-col gap-3">
        {tasks.map((task) => {
          const isLocked =
            task.status === "DOING" &&
            task.doingById &&
            task.doingById !== user.id;

          return (
            <div
              key={task.id}
              className="rounded-xl border bg-white dark:bg-zinc-900 p-3 sm:p-4 shadow-sm hover:shadow-md transition w-full overflow-hidden"
            >
              {/* TITLE + STATUS */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <h4 className="font-medium text-sm sm:text-base break-words">
                  {task.title}
                </h4>

                <select
                  value={task.status}
                  disabled={!!isLocked}
                  onChange={(e) =>
                    handleChange(task.id, e.target.value as TaskStatus)
                  }
                  className={`text-[10px] sm:text-xs font-semibold rounded-full px-2 py-1 max-w-full
                  ${statusColor(task.status)}
                  ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {Object.values(TaskStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* LOCK INFO */}
              {isLocked && (
                <p className="mt-1 text-xs text-red-500 break-words">
                  Ocupado por {task.doingBy?.name}
                </p>
              )}

              {/* DESCRIPTION */}
              {task.description && (
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 break-words">
                  {task.description}
                </p>
              )}

              {/* FOOTER */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                <select
                  value={task.priority}
                  onChange={(e) =>
                    handlePriority(task.id, e.target.value as TaskPriority)
                  }
                  disabled={
                    isUpdatingPriority &&
                    priorityVariables?.taskId === task.id
                  }
                  className={`rounded-md border px-2 py-1 w-full sm:w-auto max-w-full
                  disabled:opacity-60
                  ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {priorities.map((priority) => (
                    <option value={priority} key={priority}>
                      {priority}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={!!isLocked}
                  className="text-red-500 hover:text-red-700 transition text-left sm:text-right"
                >
                  Deletar
                </button>
              </div>
            </div>
          );
        })}
      </div>
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
