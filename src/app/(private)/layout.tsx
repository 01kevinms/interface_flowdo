"use client";


import { Sidebar } from "@//components/menu";
import { Navbar } from "@//components/menu/NavBar";
import { ReactQueryProvider } from "@//providers/reac-query";
import {  useAuth } from "@//services/auth.guard";
import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) redirect("/login");

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
          <ReactQueryProvider>
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
                   {children}
          
        </main>
          </ReactQueryProvider>
      </div>
    </div>
  );
}
