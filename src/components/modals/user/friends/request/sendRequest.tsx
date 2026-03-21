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
 return (
  <div className="space-y-3">
    {sent.map((request: any) => (
      <div
        key={request.id}
        className="
          flex items-center gap-3
          
          border border-zinc-200 dark:border-zinc-800
          
          bg-white dark:bg-zinc-900
          
          p-3 rounded-xl
          
          hover:bg-zinc-50 dark:hover:bg-zinc-800
          transition
        "
      >
        {/* AVATAR */}
        <img
          src={request.userB?.avatar || "/default-avatar.png"}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
        />

        {/* INFO */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">
            {request.userB?.name}
          </span>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Pendente
          </span>
        </div>

        {/* ACTION */}
        <button
          onClick={() => cancelRequest.mutate(request.id)}
          className="
            ml-auto 
            
            text-xs sm:text-sm
            
            bg-red-500 hover:bg-red-600
            text-white
            
            px-3 py-1.5 rounded-lg
            
            transition
          "
        >
          Cancelar
        </button>
      </div>
    ))}
  </div>
);
}