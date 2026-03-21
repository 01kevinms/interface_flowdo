"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateComment } from "@//query/project/useComments";
import { useAuth } from "@//services/auth.guard";

export function CreateCommentModal({taskId,onClose,}
  : {taskId: string,onClose: () => void}) {
  const {user} = useAuth()
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreateComment(taskId,user.name,user.id);

  function handleSubmit() {
    mutate({ content },{onSuccess: () => {onClose();
    },}
    );
  }

 return (
  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
    
    {/* OVERLAY */}
    <div
      className="
        absolute inset-0 
        bg-black/50 backdrop-blur-sm
      "
      onClick={onClose}
    />

    {/* MODAL */}
    <div
      className="
        relative z-10 
        w-full 
        sm:max-w-md 
        
        rounded-t-2xl sm:rounded-2xl
        
        bg-white dark:bg-zinc-900
        
        p-4 sm:p-6 
        
        border border-zinc-200 dark:border-zinc-800
        
        shadow-lg
        
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      {/* HEADER */}
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-100">
          Comentário da task
        </h3>

        <button
          onClick={onClose}
          className="
            p-1 rounded-md 
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            transition
          "
        >
          <X size={18} />
        </button>
      </header>

      {/* TEXTAREA */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva seu comentário..."
        className="
          w-full 
          min-h-[100px] sm:min-h-[120px]
          
          rounded-lg 
          border border-zinc-200 dark:border-zinc-800
          
          bg-white dark:bg-zinc-950
          
          p-2 sm:p-3 
          text-sm text-zinc-800 dark:text-zinc-100
          
          outline-none 
          focus:ring-2 focus:ring-green-500
          
          resize-none
        "
      />

      {/* ACTION */}
      <button
        onClick={handleSubmit}
        disabled={!content || isPending}
        className="
          mt-4 w-full 
          
          rounded-lg 
          
          bg-green-600 hover:bg-green-700
          disabled:bg-green-400
          
          py-2 sm:py-2.5 
          text-sm font-medium text-white
          
          transition
        "
      >
        {isPending ? "Enviando..." : "Comentar"}
      </button>
    </div>
  </div>
);
}
