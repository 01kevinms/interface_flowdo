"use client";

import { useUserActivity } from "@//query/dashboard/useActivity";
import { formatActivity, formatRelative, getIcon } from "@//utils/manyUtils";

export function DashboardActivity() {
  const { data, isLoading } = useUserActivity();
console.log(data)
  if (isLoading)
    return (
      <div className="space-y-3">
        <div className="h-16 bg-zinc-100 animate-pulse rounded-lg" />
        <div className="h-16 bg-zinc-100 animate-pulse rounded-lg" />
      </div>
    );

  if (!data?.length)
    return (
      <div className="text-center py-10 text-zinc-500">
        Nenhuma atividade recente
      </div>
    );
  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
    {data.map((projectData: any) => (
      <div
        key={projectData.projectId}
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
      {/* HEADER DO PROJETO */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          {projectData.projectName}
        </h2>

        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-300">
          {projectData.activities.length} atividades
        </span>
      </div>

      {/* TIMELINE */}
      <div className="relative border-l border-zinc-200 dark:border-zinc-700 pl-5 space-y-6">
        {projectData.activities.slice(0, 5).map((activity: any) => (
          <div key={activity.id} className="relative">
            
            {/* DOT */}
            <div className="absolute -left-2.75 top-1.5 w-4 h-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-600 rounded-full flex items-center justify-center">
              {getIcon(activity.type)}
            </div>

            {/* CARD INTERNO */}
            <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-xl p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200">
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-200">
                    <span className="font-semibold">
                      {activity.user?.name}
                    </span>{" "}
                    {formatActivity(activity.type)}
                  </p>

                  {activity.task && (
                    <p className="text-xs text-zinc-500 mt-1">
                      Task:{" "}
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {activity.task.title}
                      </span>
                    </p>
                  )}
                </div>

                <span className="text-xs text-zinc-400 whitespace-nowrap ml-4">
                  {formatRelative(activity.createdAt)}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>


  );
}
