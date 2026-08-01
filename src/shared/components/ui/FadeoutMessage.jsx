import { useEffect, useState } from "react"
import styles from "./FadeoutMessage.module.css"

export default function FadeoutMessage({showFadeout, variant = "inline", className, children}){
    const [isFadingOut,setIsFadingOut] = useState(false)

    useEffect(()=>{
        if(showFadeout){
            setIsFadingOut(true)
            const timeout = setTimeout(() => {
                setIsFadingOut(false)
            }, 3000);
            return () => clearTimeout(timeout)
        }
    },[showFadeout, setIsFadingOut])

    if(!isFadingOut) return null

    const classes = [styles.message, variant === "toast" ? styles.toast : null, className]
        .filter(Boolean)
        .join(" ")

    return <div className={classes} role="status">{children}</div>
}
