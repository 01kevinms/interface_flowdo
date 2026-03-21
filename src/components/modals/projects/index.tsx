"use client";

import { X, Plus, Trash } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { useCreateProject } from "@//query/project/useCreateProject";
import { ModalProps, ProjectTypes, TaskPriority, TaskStatus } from "@//types/manyType";


export function CreateProjectModal({ open, onClose }: ModalProps) {
  const [mounted,setMounted]=useState(false)
  useEffect(()=>{
    setMounted(true)
  },[])
  const {register,handleSubmit,control,formState: { errors },} = useForm<ProjectTypes>({
    defaultValues: {
      name: "",
      description: "",
      task: [
        {
          title: "",
          description: "",
          priority: TaskPriority.LOW,
          status: TaskStatus.TODO,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "task",
  });
  const createProject = useCreateProject();

  async function onSubmit(data: ProjectTypes) {
   try {
    await createProject.mutateAsync({
      name: data.name,
      description: data.description,
      tasks: data.task,
    })
    onClose();
   } catch (error) {
    console.error("erro ao enviar")
   }
    
  }
  if (!mounted || !open) return null;

 return createPortal(
  <div
    className="
      fixed inset-0 z-50 
      flex items-end sm:items-center justify-center
      
      bg-black/50 backdrop-blur-sm
    "
    onClick={onClose}
  >
    {/* MODAL */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        relative 
        
        w-full sm:max-w-2xl 
        
        max-h-[90vh]
        overflow-hidden
        
        rounded-t-2xl sm:rounded-2xl
        
        bg-white dark:bg-zinc-900
        
        border border-zinc-200 dark:border-zinc-800
        
        shadow-xl
        
        flex flex-col
        
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      {/* HEADER */}
      <header className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-base sm:text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Criar projeto
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X size={20} />
        </button>
      </header>

      {/* BODY (SCROLL) */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex-1 
          overflow-y-auto 
          p-4 sm:p-6 
          space-y-6
        "
      >
        {/* PROJECT NAME */}
        <div>
          <label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Título
          </label>

          <input
            {...register("name", { required: "Título obrigatório" })}
            className="
              w-full mt-1
              rounded-lg 
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950
              p-2 text-sm
              text-zinc-800 dark:text-zinc-100
              outline-none
              focus:ring-2 focus:ring-green-500
            "
          />

          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Descrição
          </label>

          <textarea
            {...register("description")}
            className="
              w-full mt-1
              rounded-lg 
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950
              p-2 text-sm
              text-zinc-800 dark:text-zinc-100
              min-h-[80px]
              outline-none
              focus:ring-2 focus:ring-green-500
            "
          />
        </div>

        {/* TASKS */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm sm:text-base text-zinc-800 dark:text-zinc-100">
            Tarefas
          </h3>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="
                rounded-xl 
                border border-zinc-200 dark:border-zinc-800
                p-3 space-y-2
                
                bg-zinc-50 dark:bg-zinc-800/40
              "
            >
              <input
                {...register(`task.${index}.title`)}
                placeholder="Título da tarefa"
                className="
                  w-full rounded-lg border border-zinc-200 dark:border-zinc-800
                  p-2 text-sm bg-white dark:bg-zinc-950
                "
              />

              <textarea
                {...register(`task.${index}.description`)}
                placeholder="Descrição"
                className="
                  w-full rounded-lg border border-zinc-200 dark:border-zinc-800
                  p-2 text-sm bg-white dark:bg-zinc-950
                "
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  {...register(`task.${index}.priority`)}
                  className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 text-sm bg-white dark:bg-zinc-950"
                >
                  {Object.values(TaskPriority).map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>

                <select
                  {...register(`task.${index}.status`)}
                  className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 text-sm bg-white dark:bg-zinc-950"
                >
                  {Object.values(TaskStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="
                      flex items-center justify-center
                      rounded-lg 
                      bg-red-500 hover:bg-red-600
                      p-2 text-white transition
                    "
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}

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
            className="
              flex items-center gap-2 
              rounded-lg 
              bg-blue-600 hover:bg-blue-700
              px-3 py-2 text-white text-sm
              transition
            "
          >
            <Plus size={16} />
            Adicionar tarefa
          </button>
        </div>
      </form>

      {/* FOOTER FIXO */}
      <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={onClose}
          className="
            rounded-lg px-4 py-2 
            border border-zinc-200 dark:border-zinc-800
            text-sm
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            transition
          "
        >
          Cancelar
        </button>

        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="
            rounded-lg 
            bg-green-600 hover:bg-green-700
            px-4 py-2 text-white text-sm
            transition
          "
        >
          {createProject.isPending ? "Criando..." : "Criar projeto"}
        </button>
      </div>
    </div>
  </div>,
  document.body
);
}
