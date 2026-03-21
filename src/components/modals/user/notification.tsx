"use client";

import { X } from "lucide-react";
import { useGetInvites, useNotifications } from "@//query/user/userNotification";
import { useAcceptInviteProject, useRejectInviteProject } from "@//query/project/useAddMember";
import { useAuth } from "@//services/auth.guard";

type Props = {
  open: boolean;
  close: () => void;
};
export function NotificationList({ open, close }: Props) {
  const { data, isLoading, markAsRead } = useNotifications()

  const { data: invites = [], isLoading: loadingInvites } = useGetInvites()
  const {user} = useAuth()
  const acceptInvite = useAcceptInviteProject(invites.id)
  const rejectInvite = useRejectInviteProject(invites.id,user.id)

  if (!open) return null

  return (
  <div className="fixed inset-0 z-50 flex items-start justify-end">
    {/* BACKDROP */}
    <div
      onClick={close}
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
    />

    {/* MODAL */}
    <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 animate-slideInRight flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Notificações
        </h2>

        <button
          onClick={close}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* CONVITES */}
        {loadingInvites ? (
          <div className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" />
        ) : (
          invites.map((invite: any) => (
            <div
              key={invite.id}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-blue-50 dark:bg-zinc-800 space-y-3"
            >
              <p className="text-sm text-zinc-700 dark:text-zinc-200">
                📩 Você foi convidado para o projeto{" "}
                <span className="font-semibold">
                  {invite.project.name}
                </span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => acceptInvite.mutate(invite.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg text-sm transition"
                >
                  Aceitar
                </button>

                <button
                  onClick={() => rejectInvite.mutate(invite.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-sm transition"
                >
                  Recusar
                </button>
              </div>
            </div>
          ))
        )}

        {/* LOADING NOTIFICAÇÕES */}
        {isLoading && (
          <div className="space-y-3">
            <div className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" />
            <div className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" />
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !data?.length && invites.length === 0 && (
          <div className="text-center text-zinc-500 dark:text-zinc-400 py-10">
            Nenhuma notificação
          </div>
        )}

        {/* NOTIFICAÇÕES */}
        {data?.map((notif: any) => (
          <div
            key={notif.id}
            onClick={() => markAsRead.mutate(notif.id)}
            className={`p-4 rounded-xl border cursor-pointer transition hover:shadow-md ${
              notif.isRead
                ? "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                : "bg-white dark:bg-zinc-900 border-blue-500"
            }`}
          >
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              {notif.message}
            </p>

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

    {/* ANIMAÇÃO */}
    <style jsx>{`
      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      .animate-slideInRight {
        animation: slideInRight 0.25s ease-out;
      }
    `}</style>
  </div>
);
}
