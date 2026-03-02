"use client";

import Image from "next/image";
import { LoginCard } from "@//components/login/Login";
import { RegisterCard } from "@//components/login/Register";
import { TogglePanel } from "@//components/login/TogglePanel";
import { useState } from "react";
import bglogin from "../../../assets/bglogin.png"
export default function Login() {
  const [active, setActive] = useState(false);

  return (
    <main className="flex items-center justify-center h-dvh">
      <Image src={bglogin} alt="imagem de fundo" fill className="object-cover relative"/>
      <section
        className={`group relative overflow-hidden bg-white rounded-[30px]
        shadow-[0_5px_15px_rgba(0,0,0,0.35)]
        w-3xl max-w-full min-h-120
        ${active ? "active" : ""}`}
      >
        <RegisterCard />
        <LoginCard />
        <TogglePanel setActive={setActive} />
      </section>
    </main>
  );
}
