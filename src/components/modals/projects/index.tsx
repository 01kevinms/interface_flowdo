"use client";

import { useCreateProject } from "@//query/project/useCreateProject";
import { ModalProps, ProjectTypes, TaskPriority, TaskStatus } from "@//types/manyType";
import { X, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, useFieldArray } from "react-hook-form";


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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"       
      />

      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
      >
        <header className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">Crie seu Projeto</h2>
          <button
            onClick={onClose}
            className="hover:scale-125 transition"
          >
            <X size={28} />
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/*  PROJECT NAME */}
          <div>
            <label className="text-sm font-medium">Título</label>
            <input
              {...register("name", { required: "Título obrigatório" })}
              className="w-full rounded border p-2"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/*  PROJECT DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              {...register("description")}
              className="w-full rounded border p-2"
            />
          </div>

          {/*  TASKS */}
          <div className="space-y-3">
            <h3 className="font-medium">Tarefas</h3>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded border p-3 space-y-2"
              >
                <input
                  {...register(`task.${index}.title`)}
                  placeholder="Título da tarefa"
                  className="w-full rounded border p-2"
                />

                <textarea
                  {...register(`task.${index}.description`)}
                  placeholder="Descrição"
                  className="w-full rounded border p-2"
                />

                <div className="flex gap-2">
                  <select 
                  {...register(`task.${index}.priority`)}
                  className="flex-1 rounded border p-2"
                  >
                    {Object.values(TaskPriority).map((priority)=>(
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>

                  <select
                    {...register(`task.${index}.status`)}
                    className="flex-1 rounded border p-2"
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
                      className="rounded bg-red-500 p-2 text-white"
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
              className="flex items-center gap-2 rounded bg-blue-500 px-3 py-2 text-white"
            >
              <Plus size={16} />
              Adicionar tarefa
            </button>
          </div>

          {/* 🔹 SUBMIT */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 border"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded bg-green-600 px-4 py-2 text-white"
            >
              {createProject.isPending ? "criando..." : "criar projeto"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
