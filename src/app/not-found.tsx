import Link from "next/link";

export default function NotFound() {
    
    return(
        <div className="">
            <h1>Pagina 404 nao encontrada</h1>

            <Link href="/">
            Voltar para Home
            </Link>
        </div>
    )
}