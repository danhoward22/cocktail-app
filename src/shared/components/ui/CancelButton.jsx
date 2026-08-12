import { useNavigate } from "react-router"
import styles from "./CancelButton.module.css"

export default function CancelButton({path}){
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(path)
    }
    return (
        <button type="button" className={styles.button} onClick={handleClick}>Cancel</button>
    )
}
