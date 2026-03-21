"use client";

import { ComentsProps } from "@//types/manyType";
import { MessageSquare } from "lucide-react";

type CommentCardProps = {
  comment: ComentsProps;
};

export function CommentCard({ comment }: CommentCardProps) {
 return (
  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800bg-white dark:bg-zinc-900 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
    {/* HEADER */}
    <header className="mb-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
      <div className="flex items-center gap-2 min-w-0">
        <MessageSquare size={14} />

        <span className="font-medium text-zinc-800 dark:text-zinc-100 truncate max-w-[120px] sm:max-w-none">
          {comment.author?.name ?? "Anônimo"}
        </span>
      </div>

      <span className="text-[10px] sm:text-xs text-zinc-400 whitespace-nowrap">
        •{" "}
        {comment.createdAt
          ? new Date(comment.createdAt).toLocaleDateString("pt-BR")
          : "agora"}
      </span>
    </header>

    {/* CONTENT */}
    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line break-words">
      {comment.content}
    </p>
  </div>
);
}
