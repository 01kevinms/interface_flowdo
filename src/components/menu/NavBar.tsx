"use client";

import { useState } from "react";
import { NotificationList } from "../modals/user/notification";
import { useNotifications } from "@//query/user/userNotification";
import { Bell } from "lucide-react";
import {  usePathname } from "next/navigation";

export function Navbar() {
  const pathName =usePathname()
  const routeNames: Record<string, string> = {
    "/": "Dashboard",
    "/projects": "Projetos",
    "/user": "Usuário",
    "/friends": "Amigos",
    "/chat": "Conversas",
    "/settings": "Configurações",
  };
  const [openNotification,setOpenNotification]= useState(false)
  const {data}= useNotifications()
  const unreadCount=data?.filter((notify:any)=>!notify.isRead).length || 0;

return (
  <header className="h-16 px-4 sm:px-6 flex items-center justify-around bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0">
    
    {/* LEFT */}
    <div className="flex items-center gap-3">
     <h1 className="text-lg font-semibold ">
      {routeNames[pathName] || "Página"}
      </h1>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={() => setOpenNotification(true)}
        className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
      >
        <Bell size={20} className="text-zinc-700 dark:text-zinc-200" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] px-1 rounded-full font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {openNotification && (
        <NotificationList
          open={openNotification}
          close={() => setOpenNotification(false)}
        />
      )}
    </div>
  </header>
);
}
