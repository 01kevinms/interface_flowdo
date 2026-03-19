import { updateProfile } from "@//routes/post.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useUpdateProfile(){
const qc = useQueryClient()

return useMutation({
    mutationFn:(avatar:string)=>updateProfile(avatar),
    onSuccess:()=>{
        qc.invalidateQueries({
            queryKey:["avatar"]
        })
        toast.success("atualizado com sucesso")
    }
})
}