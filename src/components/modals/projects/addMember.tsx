"use client";

import React, { useMemo, useState } from "react";
import { X, UserPlus } from "lucide-react";

import { useAddMember } from "@//query/project/useAddMember";
import { PropsAddMember, RolesMember } from "@//types/manyType";
import { useFriend } from "@//query/friends/useFriend";
import { useGetInvitesPending, useGetMembers } from "@//query/project/useProject";
import { useCancelInviteProject } from "@//query/project/useDeleteProject";
import { useAuth } from "@//services/auth.guard";


export function AddMemberModal({ projectId, open, onClose }: PropsAddMember) {
  const{user}= useAuth();
  const [form,setForm] = useState({
    email:"",
    role:"MEMBER" as RolesMember,
    search:""
  })
  const [tab, setTab] = useState<"friends" | "email">("friends");

  const addMember = useAddMember(projectId);
  const { data: friends = [] } = useFriend();
  const { data: members = [], isLoading } = useGetMembers(projectId);
  const { data: pendingMembers = [], isLoading: pendingload } = useGetInvitesPending(projectId);

const currentMember = members.find((member)=>member.user.id === user.id)
const canAdd = currentMember?.role === "ADMIN" || currentMember?.role === "OWNER  "
  const cancelInvite = useCancelInviteProject(projectId);
  const filteredFriends = friends.filter((f: any) =>
    f.name.toLowerCase().includes(form.search.toLowerCase())
  );

  const membersIds = useMemo(
    () => new Set(members.map((m: any) => m.user.id)),
    [members]
  );

  function handleAdd(email: string) {
    addMember.mutate({ email, role:form.role });
  }

  if (!open) return null;
  if (isLoading || pendingload) return <p>carregando...</p>;

  return (
  <div
    className="
      fixed inset-0 z-50 
      flex items-end sm:items-center justify-center
      
      bg-black/50 backdrop-blur-sm
    "
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        w-full sm:max-w-md
        
        rounded-t-2xl sm:rounded-2xl
        
        bg-white dark:bg-zinc-900
        
        border border-zinc-200 dark:border-zinc-800
        
        p-4 sm:p-6 
        
        space-y-5
        
        shadow-xl
        
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      {/* HEADER */}
      <header className="flex justify-between items-center">
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <UserPlus size={18} />
          Convidar membros
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X size={18} />
        </button>
      </header>

      {/* TABS */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setTab("friends")}
          className={`
            flex-1 py-2 text-xs sm:text-sm transition
            ${
              tab === "friends"
                ? "border-b-2 border-blue-600 font-medium text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
            }
          `}
        >
          Amigos
        </button>

        <button
          onClick={() => setTab("email")}
          className={`
            flex-1 py-2 text-xs sm:text-sm transition
            ${
              tab === "email"
                ? "border-b-2 border-blue-600 font-medium text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
            }
          `}
        >
          Por Email
        </button>
      </div>

      {/* TAB FRIENDS */}
      {tab === "friends" && (
        <>
          <input
            placeholder="Buscar amigo..."
            value={form.search}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, search: e.target.value }))
            }
            className="
              w-full 
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950
              text-sm text-zinc-800 dark:text-zinc-100
              rounded-lg p-2 outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {filteredFriends.map((friend: any) => {
              const isMember = membersIds.has(friend.id);

              const pendingInvite = pendingMembers.find(
                (m: any) =>
                  m.userId === friend.id && m.status === "PENDING"
              );

              const isPending = !!pendingInvite;

              return (
                <div
                  key={friend.id}
                  className="
                    flex items-center justify-between gap-2
                    p-2 rounded-lg
                    
                    hover:bg-zinc-100 dark:hover:bg-zinc-800
                    
                    transition
                  "
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={friend.avatar || "/avatar.png"}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 truncate">
                      {friend.name}
                    </span>
                  </div>

                  {isMember && (
                    <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-2 py-1 rounded-md whitespace-nowrap">
                      Já é membro
                    </span>
                  )}

                  {!isMember && !isPending && !canAdd &&(
                    <button
                      onClick={() => handleAdd(friend.email)}
                      className="
                        text-xs sm:text-sm 
                        bg-blue-600 hover:bg-blue-700
                        text-white 
                        px-2 py-1 rounded-md
                        transition
                      "
                    >
                      Convidar
                    </button>
                  )}

                  {!isMember && isPending && (
                    <button
                      onClick={() =>
                        cancelInvite.mutate(pendingInvite.id)
                      }
                      className="
                        text-xs sm:text-sm 
                        bg-yellow-500 hover:bg-yellow-600
                        text-white 
                        px-2 py-1 rounded-md
                        transition
                      "
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* TAB EMAIL */}
      {tab === "email" && (
        <div className="space-y-3">
          <input
            type="email"
            placeholder="email@exemplo.com"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="
              w-full 
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950
              text-sm text-zinc-800 dark:text-zinc-100
              rounded-lg p-2 outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

          <select
            value={form.role}
            onChange={(e) => {
              const value = e.target.value as RolesMember;
              setForm((prev) => ({ ...prev, role: value }));
            }}
            className="
              w-full 
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950
              text-sm text-zinc-800 dark:text-zinc-100
              rounded-lg p-2
            "
          >
            {Object.values(RolesMember).map((members) => (
              <option key={members} value={members}>
                {members}
              </option>
            ))}
          </select>

          <button
            disabled={!form.email || addMember.isPending}
            onClick={() => handleAdd(form.email)}
            className="
              w-full 
              bg-blue-600 hover:bg-blue-700
              disabled:bg-blue-400
              
              text-white 
              py-2 rounded-lg 
              text-sm font-medium
              
              transition
            "
          >
            {addMember.isPending
              ? "Enviando convite..."
              : "Enviar convite"}
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);
}