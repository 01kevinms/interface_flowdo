"use client";

import { useCreateTask } from "@//query/task/useCreateTasks";
import { ModalTask, TaskPriority, Tasks, TaskStatus } from "@//types/manyType";
import { Plus, Trash, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";

type FormData = {
  tasks: Tasks[]
}
export function TasksModal({ onClose, open, projectId }: ModalTask) {
  const { register, handleSubmit, control, formState: { errors }, } = useForm<FormData>({
    defaultValues: {
      tasks: [{
        title: "",
        description: "",
        priority: TaskPriority.LOW
      }]
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: "tasks" })
  const { mutate, isPending } = useCreateTask(projectId)
  async function onSubmit(data: FormData) {
    mutate(data.tasks, {
      onSuccess: () => onClose()
    })
  }
  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:max-w-2xl max-h-[90vh] rounded-t-2xl sm:rounded-2xl
        bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800
        shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* HEADER */}
        <header className="flex items-center justify-between 
        border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-4">
          <h2 className="text-sm sm:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Criar tarefas do projeto
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-500 dark:text-zinc-400
            hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            <X size={20} />
          </button>
        </header>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800
              bg-zinc-50 dark:bg-zinc-800/40 p-3 sm:p-4 space-y-3 hover:shadow-sm transition">
              {/* TITLE */}
              <input
                {...register(`tasks.${index}.title`)}
                placeholder="Título da task"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"/>

              {/* DESCRIPTION */}
              <textarea
                {...register(`tasks.${index}.description`)}
                placeholder="Descrição"
                rows={2}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"/>

              {/* FOOTER TASK */}
              <div className="flex items-center gap-2">
                <select
                  {...register(`tasks.${index}.priority`)}
                  className="w-24 sm:w-28 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2 py-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100">
                  {Object.values(TaskPriority).map((priority) => (
                    <option value={priority} key={priority}>
                      {priority}
                    </option>
                  ))}
                </select>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-auto rounded-lg  bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 hover:bg-red-200 dark:hover:bg-red-900/50 transition">
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* ADD TASK */}
          <button
            type="button"
            onClick={() =>
              append({
                title: "",
                description: "",
                priority: TaskPriority.LOW,
                status: TaskStatus.TODO,
              })
            }
            className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition">
            <Plus size={16} />
            Adicionar nova task
          </button>
        </form>

        {/* FOOTER FIXO */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 sm:px-6 py-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs sm:text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Cancelar
          </button>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-xs sm:text-sm text-white disabled:opacity-60 transition">
            {isPending ? "Criando..." : "Criar tasks"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
