import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpCircle,
  RotateCcw,
  PenLine,
  User,
} from "lucide-react";
import { useState } from "react";
import { TaskStatus } from "../types/manyType";

export function getIcon(type: string) {
  switch (type) {
    case "COMMENT_ADDED":
      return <MessageSquare size={16} className="text-blue-500" />;
    case "MEMBER_ADDED":
      return <User size={16} className="text-blue-500" />;
    case "TASK_APPROVED":
      return <CheckCircle size={16} className="text-green-500" />;
    case "TASK_CREATED":
      return <PenLine size={16} className="text-teal-500" />;  
    case "STATUS_CHANGED":
      return <RotateCcw size={16} className="text-green-800" />;  
    case "TASK_REJECTED":
      return <XCircle size={16} className="text-red-500" />;
    case "PRIORITY_CHANGED":
      return <ArrowUpCircle size={16} className="text-purple-500" />;
    default:
      return <Clock size={16} className="text-zinc-900" />;
  }
}

export function formatActivity(type: string) {
  switch (type) {
    case "COMMENT_ADDED":
      return "comentou na task";
    case "MEMBER_ADDED":
      return "um membro foi adicionado";
    case "TASK_CREATED":
      return "criou uma task";
    case "TASK_APPROVED":
      return "aprovou uma task";
    case "TASK_REJECTED":
      return "rejeitou uma task";
    case "STATUS_CHANGED":
      return "alterou o status";
    case "PRIORITY_CHANGED":
      return "alterou a prioridade";
    default:
      return type;
  }
}

export function formatRelative(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Agora";
  if (minutes < 60) return `Há ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours}h`;

  const days = Math.floor(hours / 24);
  return `Há ${days}d`;
}

type Props = {
  name: string
  onSelect: (avatar: string) => void
  defaultAvatar?: string
  seedBase:string
}

export function AvatarSelector({ name, onSelect, defaultAvatar,seedBase }: Props) {

  const [selected, setSelected] = useState<string | null>(defaultAvatar ?? null)

  const avatars = Array.from({ length: 8 }, (_, i) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}-${seedBase}-${i}`
  )

  function handleSelect(avatar: string) {
    setSelected(avatar)
    onSelect(avatar)
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {avatars.map((avatar) => {

        const isSelected = selected === avatar

        return (
          <button
            key={avatar}
            onClick={() => handleSelect(avatar)}
            className={`relative rounded-full transition transform
              ${isSelected ? "scale-110" : "hover:scale-105"}
            `}
          >
            <img
              src={avatar}
              className={`w-20 h-20 rounded-full border-2 
              ${isSelected ? "border-blue-500" : "border-zinc-300"}
              `}
            />

            {isSelected && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                ✓
              </div>
            )}

          </button>
        )
      })}
    </div>
  )
}

export function statusColor(status: TaskStatus | any) {
     switch (status) { 
        case TaskStatus.TODO: 
        return "bg-zinc-200 text-zinc-800"; 
        case TaskStatus.DOING: 
        return "bg-yellow-200 text-yellow-800"; 
        case TaskStatus.DONE: 
        return "bg-green-200 text-green-800";
        default: 
        return ""; 
      }
} 

export function MenuButton({ open, setOpen }: any) {
  return (
    <button
      onClick={() => setOpen((prev: any) => !prev)}
      className={`
        fixed top-4 left-4 z-[9999]
        w-10 h-10 flex items-center justify-center
        rounded-lg
        
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-md
        
        hover:bg-zinc-100 dark:hover:bg-zinc-800
        transition
      `}
    >
      <span
        className={`absolute h-[2px] w-6 bg-zinc-800 dark:bg-white transition-all duration-300 ${
          open ? "rotate-45" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute h-[2px] w-6 bg-zinc-800 dark:bg-white transition-all duration-300 ${
          open ? "-rotate-45" : "translate-y-2"
        }`}
      />
    </button>
  );
}

export function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}