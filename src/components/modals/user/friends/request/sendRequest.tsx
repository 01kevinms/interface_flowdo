import Loading from "@//components/emptyResponse/config";
import { useCancelRequest } from "@//query/friends/useCancelRequest";
import { useFriendRequest } from "@//query/friends/useFriend";


export function SentRequest({userId}:{userId:string}){
const{data:sent=[], isLoading}=useFriendRequest(userId)
const cancelRequest = useCancelRequest(userId)

if(isLoading)return <Loading/>
  if (sent.length === 0) {
    return <p className="text-zinc-500">Nenhum pedido enviado</p>
  }
  return(
   
    <div className="space-y-4">

      {sent.map((request: any) => (

        <div
          key={request.id}
          className="flex items-center gap-3 border p-3 rounded-lg"
        >

          <img
            src={request.userB?.avatar || "/default-avatar.png"}
            className="w-10 h-10 rounded-full"
          />

          <span>{request.userB?.name}</span>

          <span className="ml-auto text-sm text-zinc-500">
            Pendente
          </span>

          <button
            onClick={() => cancelRequest.mutate(request.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Cancelar
          </button>

        </div>

      ))}

    </div> 
  )
}