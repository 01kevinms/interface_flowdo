export function MetricCard({ icon, title, value }: any) {
  return (
    <div
      className="
        group
        bg-white dark:bg-zinc-900 
        border border-zinc-200 dark:border-zinc-800
        rounded-2xl 
        p-4 sm:p-5 
        shadow-sm hover:shadow-lg 
        transition-all duration-300

        hover:-translate-y-1
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {icon}
        </div>

        <span className="text-xs sm:text-sm font-medium">
          {title}
        </span>
      </div>

      {/* VALUE */}
      <p className="text-xl sm:text-2xl font-bold mt-3 text-zinc-900 dark:text-zinc-100 break-words">
        {value}
      </p>
    </div>
  );
}