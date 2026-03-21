"use client";

import { useLogin } from "@//query/user/useLogin";
import { useAuth } from "@//services/auth.guard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
const loginMutation =useLogin()
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    
    e.preventDefault();
setisLoading(true)
     loginMutation.mutate(
      {  email, password },
      {
        onSuccess: () => {
          toast.success("Login feito!");
          router.push("/");
          setisLoading(false)
        },
        onError: () => {
          toast.error("Erro ao fazer Login");
        },
      }
      
    );
  }

  return (
    <section className="absolute top-0 left-0 w-1/2 h-full z-20 transition-all duration-700 ease-in-out group-[.active]:translate-x-full">
      <form onSubmit={handleSubmit} className="bg-white dark:text-gray-900 flex flex-col items-center justify-center px-10 h-full">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>

        <span className="text-xs mb-4">use your email password</span>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
        />

        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
        />

        <button
        type="submit" 
          className={`bg-[#512da8] text-white text-xs py-3 px-10 rounded-lg uppercase font-semibold transition-all ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
          }`}>
            {isLoading ? "carregando..." : "entrar"}
        </button>
      </form>
    </section>
  );
}
