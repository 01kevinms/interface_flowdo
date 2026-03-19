import { Toaster } from "sonner";

export function ModalToast({children}:any){

    return(
        <>
        {children}
        <Toaster/>
        </>
    )
}