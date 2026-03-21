"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, User, Users, MessageCircle, Settings } from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Projetos", href: "/projects", icon: Folder },
  { label: "Usuário", href: "/user", icon: User },
  { label: "Amigos", href: "/friends", icon: Users },
  { label: "Conversas", href: "/chat", icon: MessageCircle },
  { label: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar({ open, setOpen }: any) {
  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-10 bg-black/50 backdrop-blur-sm transition-all duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-zinc-900
          border-r border-zinc-200 dark:border-zinc-800 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-end px-6 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-lg font-bold text-purple-600">
            Flow-Do
          </h1>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menu.map((item) => {
            const active = pathname === item.href;
            const Icon= item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex gap-2 items-center px-4 py-2.5 rounded-lg text-sm font-medium transition
                  ${active ? "bg-purple-600 text-white"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
              >
              <span className="text-lg">{<Icon size={18}/>}</span>
              {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div
          className="p-4 border-t border-zinc-200 dark:border-zinc-800
            flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span className="truncate">Usuário</span>

          <button
            className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <Settings size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}