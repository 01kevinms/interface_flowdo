"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateComment } from "@//hooks/project/useComments";
import { useAuth } from "@//services/auth.guard";

export function CreateCommentModal({taskId,onClose,}
  : {taskId: string,onClose: () => void}) {
  const {user} = useAuth()
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreateComment(taskId,user.id);

  function handleSubmit() {
    mutate({ content },{onSuccess: () => {onClose();
    },}
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6">
        <header className="mb-4 flex justify-between">
          <h3 className="font-semibold">
            Comentário da task
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </header>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva seu comentário..."
          className="w-full rounded border p-2"
        />

        <button
          onClick={handleSubmit}
          disabled={!content || isPending}
          className="mt-3 w-full rounded bg-green-600 py-2 text-white"
        >
          {isPending ? "Enviando..." : "Comentar"}
        </button>
      </div>
    </div>
  );
}
