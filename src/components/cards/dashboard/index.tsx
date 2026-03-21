"use client";

import { useUserActivity } from "@//query/dashboard/useActivity";
import { formatActivity, formatRelative, getIcon } from "@//utils/manyUtils";
import Loading from "../../emptyResponse/config";

export function DashboardActivity() {
  const { data, isLoading } = useUserActivity();
  if (isLoading) return <Loading/>

  if (!data?.length)
    return (
      <div className="text-center py-10 text-zinc-500">
        Nenhuma atividade recente
      </div>
    );
  return (
  <div
    className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      2xl:grid-cols-3 
      gap-4 sm:gap-6 lg:gap-8
    "
  >
    {data.map((projectData: any) => (
      <div
        key={projectData.projectId}
        className="
          bg-white dark:bg-zinc-900 
          rounded-2xl 
          border border-zinc-200 dark:border-zinc-800 
          p-4 sm:p-6 
          shadow-sm hover:shadow-lg 
          transition-all duration-300
        "
      >
        {/* HEADER DO PROJETO */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-white break-words">
            {projectData.projectName}
          </h2>

          <span
            className="
              text-[10px] sm:text-xs 
              bg-zinc-100 dark:bg-zinc-800 
              px-2 sm:px-3 py-1 
              rounded-full 
              text-zinc-600 dark:text-zinc-300 
              whitespace-nowrap
            "
          >
            {projectData.activities.length} atividades
          </span>
        </div>

        {/* TIMELINE */}
        <div className="relative border-l border-zinc-200 dark:border-zinc-700 pl-4 sm:pl-5 space-y-5 sm:space-y-6">
          {projectData.activities.slice(0, 5).map((activity: any) => (
            <div key={activity.id} className="relative">
              
              {/* DOT */}
              <div
                className="
                  absolute 
                  -left-2.5 sm:-left-3 
                  top-1.5 
                  w-3.5 h-3.5 sm:w-4 sm:h-4 
                  bg-white dark:bg-zinc-900 
                  border-2 border-zinc-300 dark:border-zinc-600 
                  rounded-full 
                  flex items-center justify-center
                "
              >
                {getIcon(activity.type)}
              </div>

              {/* CARD INTERNO */}
              <div
                className="
                  bg-zinc-50 dark:bg-zinc-800/40 
                  rounded-xl 
                  p-3 sm:p-4 
                  hover:bg-zinc-100 dark:hover:bg-zinc-800 
                  transition-all duration-200
                "
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                  
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 break-words">
                      <span className="font-semibold">
                        {activity.user?.name}
                      </span>{" "}
                      {formatActivity(activity.type)}
                    </p>

                    {activity.task && (
                      <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 break-words">
                        Task:{" "}
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          {activity.task.title}
                        </span>
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] sm:text-xs text-zinc-400 whitespace-nowrap sm:ml-4 self-start sm:self-auto">
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
