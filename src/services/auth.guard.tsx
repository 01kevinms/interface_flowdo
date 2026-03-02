"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextType, User } from "../types/manyType";
import { LoginUser, RefreshToken, RegisterUser }  from '@//routes/post.routes';

type JwtPayload = {
  id: string;
  name: string;
  email: string;
  exp: number;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
    const accessToken = localStorage.getItem("accessToken");    
    const refreshToken = localStorage.getItem("accessToken");

    if(!accessToken || !refreshToken){
      setLoading(false)
      return
    }
    
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      
      if (decoded.exp * 1000 < Date.now()) {
          setToken(accessToken);
          setUser({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
          });
          setLoading(false);
          return;
      }
      
      const {newAccessToken} = await RefreshToken(refreshToken)
      localStorage.setItem("accessToken",newAccessToken)
      const newDecoded = jwtDecode<JwtPayload>(newAccessToken)

      setToken(newAccessToken)
      setUser({
        id:newDecoded.id,
        name: newDecoded.name,
        email:newDecoded.email
      })
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setToken(null)
      setUser(null)
    } finally {
      setLoading(false);
    }
  }
  loadSession()
  }, []);
  
  async function login(email: string, password: string) {
    const { accessToken, refreshToken } = await LoginUser(email, password);
    
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const decoded = jwtDecode<JwtPayload>(accessToken);

    setToken(accessToken)
    setUser({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    });
  }

  async function register(name: string, email: string, password: string) {
    await RegisterUser(name, email, password);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
};
