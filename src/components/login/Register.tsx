"use client";

import { useAuth } from "@//services/auth.guard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterCard() {
  const[name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const{register}=useAuth()
  const route = useRouter()

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await register(name,email,password)
      route.push("/");
    } catch(err:any){
  console.error("Erro:", err.response?.data || err.message)
}
console.log(name,email)
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
      <form onSubmit={handleSubmit} className="bg-white flex flex-col items-center justify-center px-10 h-full">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <span className="text-xs mb-4">
           use your email for registration
        </span>

        <input
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          autoComplete="username"
        />
        <input
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          autoComplete="current-email"
        />
        <input
          className="bg-[#eee] my-2 py-3 px-4 text-sm rounded-lg w-full outline-none"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          autoComplete="current-password"
          type="password"
        />

        <button type="submit" className="bg-[#512da8] text-white text-xs py-3 px-10 rounded-lg uppercase font-semibold">
          Create
        </button>
      </form>
    </section>
  );
}
