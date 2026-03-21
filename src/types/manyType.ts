import { StaticImageData } from "next/image";
export interface User {
  id:string
  name:string
  email: string
}
export interface AuthContextType { 
  user: any 
  token:string | null
  login: (
    email: string, 
    password: string) => Promise<void>
  logout: () => void;
  register:(
    name: string, 
    email: string, 
    password: string) => Promise<void>; 
  loading: any;
  }
   export interface Profile { 
      id: string;
      avatarUrl?: string
      name: string; 
      email: string;
      stats?:{
        doingTasksCount: number
        completedTasksCount: number
        createdProjectsCount:number
      }
      }
export type FriendPending = {
  id: string
  createdAt: string
  user: {
    id: string
    name: string
    avatar: string
  }
}
export interface ProjectTypes {
  id?:any;
  owner?:{name?:string};
  ownerId?:string
  name: string;
  members: memberType
  description: string;
  task: Tasks[];
  createdAt?: Date | string | any;
}

export interface memberType{
  id:string
  joinedAt:string
  role: RolesMember
  user:{
    name:string,
    id:string
  }
}

export interface TaskPending{
  id?:string
  title: string;
  description: string;
  priority: TaskPriority;
  requestedBy:{
    name:string
  }
}
export interface Tasks {
  id?:string | any
  doingById?: string
  doingBy?:{
    id:string
    name:string
  }
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  comments?:ComentsProps[]
}


export interface Comments{
id?:string
content:string;
authorId?:string
}

export interface ComentsProps{
id?:string
content:string;
createdAt?:string
author?:{
  name:string
};
}
export type EmptyStateProps = {
  title: string;
  description: string;
  image: StaticImageData | string;
  action?: React.ReactNode;
};

export type EmptyKey = "projects" | "tasks";
export type ModalProps = {
  open: boolean;
  onClose: () => void;
};
export type ModalTask={
  onClose: () => void;
  open: boolean;
  projectId: string;
}

export interface addMemberType{
email:string
role:RolesMember
}

export interface updateRoleType{
role:RolesMember,
memberId:string
}

export type PropsTaskColum = {
     title: string; 
     tasks: Tasks[]; 
     projectId: any; 
};

export type PropsTaskCharts = {
  pending: number;
  doing: number;
  done: number;
};

export type PropsModalMember = {
  open: boolean
  close: () => void
  data: memberType[]
}

export type PropsAddMember = {
  projectId: string;
  open: boolean;
  onClose: () => void;
  member:any[]
};

export type PropsAvatarModal = {
  open: boolean
  name: string
  avatar: string | null
  loading: boolean
  onClose: () => void
  onSelect: (avatar: string) => void
  onSave: () => void
}

export type Theme = "light" | "dark"
export interface ThemeContextType{
  theme:Theme
  toggleTheme:()=>void
}

export enum TaskStatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export enum RolesMember{
  MEMBER="MEMBER",
  ADMIN = "ADMIN",
  OWNER = "OWNER"
}

export enum TaskPriority {
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}