"use client";

import { useAddMember } from "@//hooks/project/useAddMember";
import { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { addMemberType, RolesMember } from "@//types/manyType";

type Props = {
  projectId: string;
  open: boolean;
  onClose: () => void;
};

export function AddMemberModal({ projectId, open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<addMemberType | any>("MEMBER");
  const addMember = useAddMember(projectId);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    addMember.mutate(
    {email,role},
    { onSuccess: () => {
        setEmail("");
        onClose();
      },
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UserPlus size={18} />
            Adicionar membro
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800"
          >
            <X size={18} />
          </button>
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Email do usuário
            </label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
             value={role} 
             onChange={e=>setRole(e.target.value)}
             className="rounded-lg my-2 border px-2 py-2 text-sm"
             >
                {Object.values(RolesMember).map((members)=>(
                    <option value={members} key={members}>
                        {members}
                    </option>
                ))}
                    
            </select>
          </div>

          {addMember.isError && (
            <p className="text-red-500 text-sm">
              {(addMember.error as any)?.response?.data?.message ??
                "Erro ao adicionar membro"}
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-zinc-600 hover:bg-zinc-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={addMember.isPending}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              {addMember.isPending ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
