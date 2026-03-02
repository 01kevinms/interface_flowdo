export function MetricCard({ icon, title, value }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>

      <p className="text-2xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}
