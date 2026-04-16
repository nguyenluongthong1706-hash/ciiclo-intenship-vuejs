import { makeReaction, removeReaction} from '@/services/postService'
import type { ReactionType } from '@/types/Object'
import { useToast } from 'vue-toastification'
 
const toast = useToast()

const handleReact = async ( {id, type}:{id:string, type:ReactionType} ) => {
    try {
        const res = await makeReaction(id, {type: type})
        
        toast.success(res.message)
    } catch (e :any) {
        toast.error(e.response?.data.message)
    }
}

const handleUnreact = async (id:string) => {
    try {
        const res = await removeReaction(id)


        toast.success(res.message)
    } catch (e :any) {
        toast.error(e.response?.data.message)
    }
}

export {handleReact,handleUnreact}