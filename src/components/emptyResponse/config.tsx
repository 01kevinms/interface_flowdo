import emptyImage from "../../assets/dashboardbg.png"
import { EmptyKey, EmptyStateProps } from "@//types/manyType";

export const emptyConfig: Record<EmptyKey, EmptyStateProps> = {
   projects: {
    title: "Nenhum projeto encontrado",
    description: "Crie um projeto para começar.",
    image: emptyImage,
  },
  tasks: {
    title: "Nenhuma tarefa",
    description: "Adicione sua primeira task.",
    image: emptyImage,
  },
}

export default function Loading({
  size = 40,
  fullScreen = true,
  label = "Carregando..."
}: {
  size?: number
  fullScreen?: boolean
  label?: string
}) {
  return (
    <div
      className={`
        ${fullScreen ? "fixed inset-0 z-50" : "w-full h-full"}
        flex flex-col items-center justify-center gap-4
        
        bg-white/70 dark:bg-zinc-900/70
        backdrop-blur-sm
      `}
    >
      {/* SPINNER */}
      <div
        style={{ width: size, height: size }}
        className="
          border-[3px]
          border-zinc-300 dark:border-zinc-700
          border-t-blue-600
          
          rounded-full
          animate-spin
        "
      />

      {/* LABEL */}
      <span className="text-sm text-zinc-600 dark:text-zinc-400 animate-pulse">
        {label}
      </span>
    </div>
  )
}