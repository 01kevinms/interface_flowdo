"use client"
import { AvatarSelector } from "@//utils/manyUtils"
import { useState } from "react"

type Props = {
  open: boolean
  name: string
  avatar: string | null
  loading: boolean
  onClose: () => void
  onSelect: (avatar: string) => void
  onSave: () => void
}

export function AvatarModal({
  open,
  name,
  avatar,
  loading,
  onClose,
  onSelect,
  onSave
}: Props) {
 
  const [seedBase, setSeedBase] = useState(() => Math.random().toString(36))

  function generateNewAvatars() {
    setSeedBase(Math.random().toString(36))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-100 space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Escolher avatar</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <AvatarSelector
          name={name}
          seedBase={seedBase}
          onSelect={onSelect}
        />

        {avatar && (
          <div className="flex flex-col items-center gap-4">

            <img
              src={avatar}
              className="w-24 h-24 rounded-full border"
            />

            <div className="flex gap-4">

              <button
                onClick={generateNewAvatars}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Gerar outros avatar
              </button>

              <button
                onClick={onSave}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Salvando..." : "Salvar avatar"}
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}