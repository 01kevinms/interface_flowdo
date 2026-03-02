"use client";

import { useState } from "react";
import { NotificationList } from "../modals/user/notification";
import { useNotifications } from "@//hooks/user/userNotification";
import { Bell } from "lucide-react";

export function Navbar() {
  const [open,setOpen]= useState(false)
  const {data}= useNotifications()

  const unreadCount=data?.filter((notify:any)=>!notify.isRead).length || 0;
  return (
     <header className="py-2 h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-[#512da8]">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 relative">
        
        {/* 🔔 NOTIFICATION BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="relative p-2 rounded-lg hover:bg-zinc-100 transition"
        >
          <Bell size={20} />

          {/* BADGE */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {open && (
          <NotificationList
            open={open}
            close={() => setOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
