"use client";

import { useAddMember } from "@//query/project/useAddMember";
import React, { useMemo, useState } from "react";
import { X, UserPlus } from "lucide-react";
import { addMemberType, RolesMember } from "@//types/manyType";
import { useFriend } from "@//query/friends/useFriend";
import { useGetInvitesPending, useGetMembers } from "@//query/project/useProject";
import { useCancelInviteProject } from "@//query/project/useDeleteProject";
import { useAuth } from "@//services/auth.guard";

type Props = {
  projectId: string;
  open: boolean;
  onClose: () => void;
  member:any[]
};

export function AddMemberModal({ projectId, open, onClose }: Props) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-md p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UserPlus size={18} />
            Convidar membros
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {/* TABS */}
        <div className="flex border-b">
          <button
            onClick={() => setTab("friends")}
            className={`flex-1 py-2 text-sm ${
              tab === "friends"
                ? "border-b-2 border-blue-600 font-medium"
                : "text-zinc-500"
            }`}
          >
            Amigos
          </button>

          <button
            onClick={() => setTab("email")}
            className={`flex-1 py-2 text-sm ${
              tab === "email"
                ? "border-b-2 border-blue-600 font-medium"
                : "text-zinc-500"
            }`}
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
              onChange={(e) => setForm((prev)=>({...prev, search:e.target.value}))}
              className="w-full border rounded-lg p-2"
            />

            <div className="max-h-60 overflow-y-auto space-y-2">
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
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.avatar}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm">{friend.name}</span>
                    </div>

                    {isMember && (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                        Já é membro
                      </span>
                    )}

                    {!isMember && !isPending && canAdd &&(
                      <button
                        onClick={() => handleAdd(friend.email)}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg"
                      >
                        Convidar
                      </button>
                    )}

                    {!isMember && isPending && (
                      <button
                        onClick={() =>
                          cancelInvite.mutate(pendingInvite.id)
                        }
                        className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-lg"
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
              onChange={(e) => setForm((prev)=>({...prev, email:e.target.value}))}
              className="w-full border rounded-lg p-2"
            />

            <select
              value={form.role}
              onChange={(e:React.ChangeEvent<HTMLSelectElement>) => 
                {const value = e.target.value as RolesMember
                  setForm((prev)=>({...prev, role:value}))}}
              className="w-full border rounded-lg p-2"
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
              className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
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
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}