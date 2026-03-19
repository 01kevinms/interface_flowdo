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

export default function Loading({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ width: size, height: size }}
        className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      />
    </div>
  )
}