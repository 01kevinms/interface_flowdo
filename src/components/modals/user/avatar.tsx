"use client"
import { PropsAvatarModal } from "@//types/manyType"
import { AvatarSelector } from "@//utils/manyUtils"
import { useState } from "react"

export function AvatarModal({open,name,avatar,loading,onClose,onSelect,onSave}: PropsAvatarModal) {
  const [seedBase, setSeedBase] = useState(() => Math.random().toString(36))

  function generateNewAvatars() {
    setSeedBase(Math.random().toString(36))
  }

  if (!open) return null

 return (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    {/* MODAL */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6
        space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Escolher avatar
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          ✕
        </button>
      </div>

      {/* SELECTOR */}
      <AvatarSelector
        name={name}
        seedBase={seedBase}
        onSelect={onSelect}
      />

      {/* PREVIEW */}
      {avatar && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={avatar}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full
              border border-zinc-200 dark:border-zinc-800 object-cover"
          />

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <button
              onClick={generateNewAvatars}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700text-white px-4 py-2 rounded-lg text-smtransition"
            >
              Gerar novos
            </button>

            <button
              onClick={onSave}
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              {loading ? "Salvando..." : "Salvar avatar"}
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}