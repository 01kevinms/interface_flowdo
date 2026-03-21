"use client";

import { useRegister } from "@//query/user/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function RegisterCard() {
  const[name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoading,setisLoading]= useState(false)
  const router = useRouter()
  const registerMutation =useRegister()
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setisLoading(true)
    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Registro feito!");
          router.push("/");
          setisLoading(false)
        },
        onError: () => {
          toast.error("Erro ao registrar");
        },
      }
      
    );
  }
  return (
    <section
      className="
      absolute top-0 left-0 w-1/2 h-full opacity-0 z-10
      transition-all duration-700 ease-in-out
      group-[.active]:translate-x-full
      group-[.active]:opacity-100
      group-[.active]:z-30
      group-[.active]:animate-[fadeIn_0.7s]" //animate: keyframe in globals.css
    >
      <form onSubmit={handleSubmit} className="bg-white dark:text-gray-900 flex flex-col items-center justify-center px-10 h-full">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <span className="text-xs mb-4">
           use your email for registration
        </span>

       <input
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          autoComplete="name"
        />

        <input
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          autoComplete="new-password"
          type="password"
        />

       <button
          type="submit"
          disabled={isLoading} // desabilita enquanto carrega
          className={`bg-[#512da8] text-white text-xs py-3 px-10 rounded-lg uppercase font-semibold transition-all ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
          }`}
        >
          {isLoading ? "carregando..." : "Criar"} 
        </button>
      </form>
    </section>
  );
}
