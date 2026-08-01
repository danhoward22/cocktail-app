import { useEffect, useState } from "react"

export default function FadeoutMessage({showFadeout, className, children}){
    const [isFadingOut,setIsFadingOut] = useState(false)

    useEffect(()=>{
        if(showFadeout){
            setIsFadingOut(true)
            const timeout = setTimeout(() => {
                setIsFadingOut(false)
            }, 3000);
        }
    },[showFadeout, setIsFadingOut])

    return(
        isFadingOut ? 
        <>
            <style>
                {`@keyframes fadeout {
                from { opacity: 1; }
                to { opacity: 0; }
                }`}
            </style>
            <div style={{animation: "fadeout 2.9s ease-out forwards"}} className={className}>{children}</div>
        </>
        : <></>
    )
}