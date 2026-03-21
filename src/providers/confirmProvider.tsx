"use client"

import { useState } from "react"
import { createContext, useContext } from "react"

type ConfirmOptions = {
  title: string
  description?: string
}

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextType | null>(null)

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error("useConfirm must be used within provider")
  return ctx.confirm
}


export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const [resolveFn, setResolveFn] = useState<(value: boolean) => void>()

  function confirm(options: ConfirmOptions) {
    setOptions(options)
    setOpen(true)

    return new Promise<boolean>((resolve) => {
      setResolveFn(() => resolve)
    })
  }

  function handleConfirm() {
    resolveFn?.(true)
    setOpen(false)
  }

  function handleCancel() {
    resolveFn?.(false)
    setOpen(false)
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className=" bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold">
              {options?.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              {options?.description}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}