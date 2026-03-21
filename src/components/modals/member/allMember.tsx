import { X } from "lucide-react"
import { memberType, PropsModalMember, RolesMember } from "@//types/manyType"
import { useRemoveMember } from "@//query/project/useDeleteProject"
import { useParams } from "next/navigation"
import { useAuth } from "@//services/auth.guard"
import { useUpdateRoleMember } from "@//query/project/useAddMember"


export function ModalMembers({ open, close, data }: PropsModalMember) {
  
  const {projectId}=useParams<{projectId:string}>()
  const { user } = useAuth()
  const remove =useRemoveMember(projectId)
  const updateRole = useUpdateRoleMember(projectId)
  const currentMember = data.find((member)=>member.user.id === user.id)
  const canRemove = currentMember?.role === "ADMIN" || currentMember?.role === "OWNER";

  function canManageMembers(role?: RolesMember) {
  return role === "OWNER" || role === "ADMIN"
  }
 return (
  <div
    className={`
      fixed inset-0 z-50 
      transition-opacity duration-300
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
    onClick={close}
  >
    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

    {/* DRAWER */}
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
        absolute right-0 top-0 h-full w-full sm:max-w-md
        
        bg-white dark:bg-zinc-900
        
        border-l border-zinc-200 dark:border-zinc-800
        
        shadow-xl 
        
        p-4 sm:p-6
        
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Membros do projeto
        </h2>

        <button
          onClick={close}
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3 overflow-y-auto pr-1 max-h-[calc(100vh-80px)]">
        {data.map((member, index) => {
          const canChangeRole =
            canManageMembers(currentMember?.role) &&
            member.user.id !== user.id &&
            !(currentMember?.role === "ADMIN" && member.role === "OWNER");

          return (
            <div
              key={index}
              className="
                flex flex-col sm:flex-row sm:items-center sm:justify-between
                gap-3
                
                border border-zinc-200 dark:border-zinc-800
                rounded-xl 
                p-3
                
                bg-zinc-50 dark:bg-zinc-800/40
                
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition
              "
            >
              {/* INFO */}
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base text-zinc-800 dark:text-zinc-100 truncate">
                  {member.user.name}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Entrou em{" "}
                  {new Date(member.joinedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap items-center gap-2">
                {canChangeRole ? (
                  <select
                    value={member.role}
                    onChange={(e) =>
                      updateRole.mutate({
                        memberId: member.id,
                        role: e.target.value as RolesMember,
                      })
                    }
                    className={`
                      text-xs font-semibold px-2 py-1 rounded-md
                      border border-zinc-200 dark:border-zinc-700
                      bg-white dark:bg-zinc-900
                      text-zinc-700 dark:text-zinc-200
                    `}
                  >
                    {Object.values(RolesMember).map((role) => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`
                      text-xs font-semibold px-2 py-1 rounded-md
                      ${
                        member.role === RolesMember.MEMBER
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                          : member.role === "ADMIN"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "bg-zinc-200 text-red-600 dark:bg-zinc-700 dark:text-red-400"
                      }
                    `}
                  >
                    {member.role}
                  </span>
                )}

                {canRemove && member.user.id !== user.id && (
                  <button
                    className="
                      text-red-500 hover:text-red-600 
                      text-xs sm:text-sm 
                      border border-red-200 dark:border-red-900/40
                      rounded-md px-2 py-1
                      hover:bg-red-50 dark:hover:bg-red-900/20
                      transition
                    "
                    onClick={() => remove.mutate(member.user.id)}
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}

