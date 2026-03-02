"use client";

import { X } from "lucide-react";
import { useNotifications } from "@//hooks/user/userNotification";

type Props = {
  open: boolean;
  close: () => void;
};

export function NotificationList({ open, close }: Props) {
  const { data, isLoading, markAsRead } = useNotifications();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* BACKDROP */}
      <div
        onClick={close}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-2xl border-l animate-slideInRight flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Notificações</h2>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {isLoading && (
            <div className="space-y-3">
              <div className="h-16 bg-zinc-100 animate-pulse rounded-lg" />
              <div className="h-16 bg-zinc-100 animate-pulse rounded-lg" />
            </div>
          )}

          {!isLoading && !data?.length && (
            <div className="text-center text-zinc-500 py-10">
              Nenhuma notificação
            </div>
          )}

          {data?.map((notif: any) => (
            <div
              key={notif.id}
              onClick={() => markAsRead.mutate(notif.id)}
              className={`
                p-4 rounded-xl border cursor-pointer transition
                hover:shadow-md
                ${
                  notif.isRead
                    ? "bg-zinc-50 dark:bg-zinc-800"
                    : "bg-white dark:bg-zinc-900 border-blue-500"
                }
              `}
            >
              <p className="text-sm">{notif.message}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-zinc-400">
                  {new Date(notif.createdAt).toLocaleString()}
                </span>

                {!notif.isRead && (
                  <span className="text-xs text-blue-500 font-medium">
                    Nova
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* animação */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
