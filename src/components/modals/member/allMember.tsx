import { X } from "lucide-react"
import { memberType, RolesMember } from "@//types/manyType"

type Props = {
  open: boolean
  close: () => void
  data: memberType[]
}
export function ModalMembers({ open, close, data }: Props) {
  return (
    <div
      className={`
        fixed inset-0 z-50 transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={close}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          absolute right-0 top-0 h-full w-full max-w-md
          bg-white dark:bg-zinc-900
          shadow-lg p-6
          transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Membros do projeto</h2>
          <button onClick={close}>
            <X className="w-5 h-5 text-zinc-500 hover:text-zinc-800" />
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3 overflow-y-auto">
          {data.map((member, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-lg p-3"
            >
              <div>
                <p className="font-medium">{member.user.name}</p>
                <p className="text-xs text-zinc-500">
                  Entrou em {new Date(member.joinedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

               <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  member.role === RolesMember.MEMBER
                    ? "bg-purple-100 text-purple-700"
                    : member.role === "ADMIN"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-red-600"
                }`}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

