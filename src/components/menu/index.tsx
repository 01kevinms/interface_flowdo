"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Projetos", href: "/projects" },
  { label: "Usuário", href: "/user" },
  { label: "Amigos", href: "/friends" },
  { label: "Conversas", href: "/chat" },
  { label: "Configurações", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-xl font-bold text-[#512da8]">MyApp</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  active
                    ? "bg-[#512da8] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t text-sm text-gray-500 flex justify-between">
        usuario <Settings/>
      </div>     
    </aside>
  );
}
