"use client";

import { ComentsProps } from "@//types/manyType";
import { MessageSquare } from "lucide-react";

type CommentCardProps = {
  comment: ComentsProps;
};

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
      <header className="mb-2 flex items-center gap-2 text-sm text-zinc-600">
        <MessageSquare size={16} />
        <span className="font-medium text-zinc-800">
          {comment.author?.name ?? "Anonimo"}
        </span>
        <span className="text-xs text-zinc-400">
          • {comment.createdAt
          ? new Date(comment.createdAt).toLocaleDateString("pt-BR") : "agora"}
        </span>
      </header>

      <p className="text-sm text-zinc-700 whitespace-pre-line">
        {comment.content}
      </p>
    </div>
  );
}
