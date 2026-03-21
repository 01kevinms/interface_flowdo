import { ThemeToggle } from "@//components/theme/ThemeToggle";

export default function Settings(){
return (
  <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">

    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-sm space-y-4">

      {/* HEADER */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-white">
          Aparência
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Personalize o tema da aplicação
        </p>
      </div>

      {/* ITEM */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Tema
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Alternar entre modo claro e escuro
          </span>
        </div>

        <ThemeToggle />
      </div>

    </div>

  </div>
);
}