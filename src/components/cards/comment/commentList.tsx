"use client";

import { useComments } from "@//hooks/project/useComments";
import { CommentCard } from "./CardComments";


export function CommentsList({ taskId }: {taskId: string}) {
  const { data: comments, isLoading } = useComments(taskId);
  if (isLoading) {
    return (
      <p className="text-sm text-zinc-400">
        Carregando comentários...
      </p>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <p className="text-sm text-zinc-500 italic">
        Nenhum comentário ainda
      </p>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      {comments.map((comment:any) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
