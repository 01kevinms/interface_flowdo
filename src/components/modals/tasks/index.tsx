"use client";

import { useCreateTask } from "@//hooks/task/useCreateTasks";
import { ModalTask, Tasks, TaskStatus } from "@//types/manyType";
import { Plus, Trash, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";

type FormData={
  tasks:Tasks[]
}
export function TasksModal({onClose,open,projectId}:ModalTask) {
const {register,handleSubmit,control,formState:{errors},}=useForm<FormData>({
  defaultValues:{
    tasks:[{
    title:"",
    description:"",
    priority:1
  }]}
})
const {fields,append,remove}=useFieldArray({control,name:"tasks"})
const {mutate,isPending}=useCreateTask(projectId)
async function onSubmit(data:FormData) {
  mutate(data.tasks,{
    onSuccess:()=>onClose()
  })
}

if(!open) return null
  return createPortal(
       <div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  />

  {/* Modal */}
  <div
  onClick={(e) => e.stopPropagation()}
  className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl flex flex-col animate-in fade-in zoom-in-95">
    
    {/* Header */}
    <header className="flex items-center justify-between border-b px-6 py-4">
      <h2 className="text-lg font-semibold text-zinc-800">
        Criar tarefas do projeto
      </h2>

      <button
        onClick={onClose}
        className="text-zinc-500 hover:text-zinc-800 transition"
      >
        <X size={22} />
      </button>
    </header>

    {/* Content (scrollável) */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
    >
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="
            rounded-xl border bg-zinc-50 p-4 space-y-3
            hover:shadow-sm transition
          "
        >
          {/* Título */}
          <input
            {...register(`tasks.${index}.title`)}
            placeholder="Título da task"
            className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Descrição */}
          <textarea
            {...register(`tasks.${index}.description`)}
            placeholder="Descrição"
            rows={2}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Footer da task */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              {...register(`tasks.${index}.priority`, {
                valueAsNumber: true,
              })}
              className="w-20 rounded-lg border px-2 py-2 text-sm"
            />           

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="
                  ml-auto rounded-lg bg-red-100 p-2
                  text-red-600 hover:bg-red-200 transition
                "
              >
                <Trash size={14} />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add task */}
      <button
        type="button"
        onClick={() =>
          append({
            title: "",
            description: "",
            priority: 1,
            status:TaskStatus.TODO          
          })
        }
        className="
          flex items-center gap-2 text-sm
          text-blue-600 hover:text-blue-800
          transition
        "
      >
        <Plus size={16} />
        Adicionar nova task
      </button>

      {/* Footer fixo */}
      <footer className="sticky bottom-0 bg-white pt-4 border-t flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="
            rounded-lg bg-green-600 px-4 py-2 text-sm text-white
            hover:bg-green-700 disabled:opacity-60 transition
          "
        >
          {isPending ? "Criando..." : "Criar tasks"}
        </button>
      </footer>
    </form>
  </div>
</div>
,
    document.body
  );
}
