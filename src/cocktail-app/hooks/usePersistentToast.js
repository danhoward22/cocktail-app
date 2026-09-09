import { useRef } from "react"
import toast from "react-hot-toast"

export function usePersistentToast(defaultText, persistTime = 5000){
    const persistToastId = useRef()

    function show(text){
        persistToastId.current = toast(text || defaultText, { duration: persistTime })
    }

    function clear(){
        if(persistToastId.current){
            toast.dismiss(persistToastId.current)
            persistToastId.current = null
        }
    }

    return {show, clear}
}