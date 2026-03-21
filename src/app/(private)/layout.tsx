"use client";


import { Sidebar } from "@//components/menu";
import { Navbar } from "@//components/menu/NavBar";
import { ThemeProvider } from "@//components/theme/AuthTheme";
import { ConfirmProvider } from "@//providers/confirmProvider";
import { ReactQueryProvider } from "@//providers/reac-query";
import {  useAuth } from "@//services/auth.guard";
import { MenuButton } from "@//utils/manyUtils";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Toaster } from "sonner";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const[open,setOpen]= useState(false)
  
  if (loading) return null;
  if (!user) redirect("/login");

  return (
    <div className="flex h-screen">
      <MenuButton open={open} setOpen={setOpen}/>
      <Sidebar open={open} setOpen={setOpen}/>
      <div className="flex-1 flex flex-col">
          <ReactQueryProvider>
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 dark:bg-zinc-800">
          <ConfirmProvider>
                   {children}
          </ConfirmProvider>
          <Toaster richColors />
        </main>
          </ReactQueryProvider>
      </div>
    </div>
  );
}
