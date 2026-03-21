import { RegisterCard } from '@//components/login/Register';
import { useAuth } from "@//services/auth.guard";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}
export function useLogin(){
    const{login}= useAuth()

    return useMutation<void,any,LoginData>({
        mutationFn:async({email,password})=>{
            return await login(email,password)
        },
    })
}


// Hook que retorna apenas valores simples
export function useRegister() {
  const { register } = useAuth();

  const mutation = useMutation<void, any, RegisterData>({
    mutationFn: async ({ name, email, password }) => {
      return await register(name, email, password);
    },
  });

  // Retorna só os valores simples que TypeScript consegue entender
  return {
    mutate: mutation.mutate,
    error: mutation.error,
  };
}
