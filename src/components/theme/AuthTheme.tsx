"use client"
import { Theme, ThemeContextType } from "@//types/manyType";
import React, { createContext, useContext, useEffect, useState } from "react";



const ThemeContext = createContext<ThemeContextType | undefined>(undefined); // Cria contexto com valor inicial undefined

export function useTheme(){
const context = useContext(ThemeContext)
if(!context) throw new Error("useTheme must be used within ThemeProvider")
    return context
}

export const ThemeProvider:React.FC<{children:React.ReactNode}>=({children})=>{
const[theme,setTheme]= useState<Theme>("light")

useEffect(()=>{
    const saved = localStorage.getItem("theme") as Theme | null
    if(saved){
        setTheme(saved)
        document.documentElement.classList.toggle("dark", saved === "dark")
    }else{
        document.documentElement.classList.remove("dark")
    }
},[])

function toggleTheme(){
    const newTheme: Theme =theme === "dark" ? "light" : "dark";
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme",newTheme)
}
return(
   <ThemeContext.Provider value={{ theme, toggleTheme }}> {/* Provedor do contexto */}
      {children} {/* Renderiza os filhos */}
    </ThemeContext.Provider>
    
)
}