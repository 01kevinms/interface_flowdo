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
