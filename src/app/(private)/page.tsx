"use client";

import { useState } from "react";
import { Plus, FolderKanban, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { useRouter } from "next/navigation";

import { MetricCard } from "@//components/cards/dashboard/MetricCard";
import { useDashboard } from "@//query/dashboard/useCreateActivity";
import { ActionButton } from "@//components/button";
import { CreateProjectModal } from "@//components/modals/projects";
import { DashboardActivity } from "@//components/cards/dashboard";
import { TasksChart } from "@//components/cards/dashboard/taskChart";

export default function Home() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useDashboard();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 animate-pulse">
          Carregando dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 space-y-12">

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Visão geral dos seus projetos e atividades
          </p>
        </div>

        <ActionButton onClick={() => setOpen(true)}>
          <Plus size={16} />
          Novo Projeto
        </ActionButton>
      </header>

      <CreateProjectModal open={open} onClose={() => setOpen(false)} />

      {/* METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<FolderKanban size={20} />}
          title="Projetos"
          value={data.projectsCount}
        />
        <MetricCard
          icon={<ListTodo size={20} />}
          title="Pendentes"
          value={data.pendingTasks}
        />
        <MetricCard
          icon={<Clock size={20} />}
          title="Em Progresso"
          value={data.doingTasks}
        />
        <MetricCard
          icon={<CheckCircle2 size={20} />}
          title="Concluídas"
          value={data.completedTasks}
        />
      </section>

      {/* GRID PRINCIPAL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ATIVIDADES */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Atividades recentes
            </h2>

            <DashboardActivity/>
          </div>
        </div>

        {/* PROJETOS RECENTES */}
        <section>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">
              Projetos recentes
            </h2>

            {data.recentProjects.length === 0 && (
              <p className="text-sm text-zinc-500">
                Nenhum projeto criado ainda.
              </p>
            )}

            {data.recentProjects.map((project: any) => (
              <div
                key={project.id}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="group p-4 rounded-xl border border-transparent 
                           hover:border-zinc-200 dark:hover:border-zinc-700 
                           hover:bg-zinc-100 dark:hover:bg-zinc-800 
                           transition cursor-pointer"
              >
                <p className="font-medium group-hover:text-black dark:group-hover:text-white transition">
                  {project.name}
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  {project.tasksCount} tasks
                </p>
              </div>
            ))}
          </div>
        </section>

       {/* GRÁFICO */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">
            Distribuição das Tasks
          </h2>

          <TasksChart
            pending={data.pendingTasks}
            doing={data.doingTasks}
            done={data.completedTasks}
          />
        </section>

      </section>
    </div>
  );
}
