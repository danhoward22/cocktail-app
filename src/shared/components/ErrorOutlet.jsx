import styles from "./ErrorOutlet.module.css"

export function ErrorOutlet({message, cancelPath}){
    return(
        <div className={styles.card}>
            <p>{message}</p>
            <Link to={cancelPath} className={styles.close}>Close</Link>
        </div>
    )
}