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
