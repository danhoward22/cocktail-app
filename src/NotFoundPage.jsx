import { Link } from "react-router"
import styles from "./NotFoundPage.module.css"

export function NotFoundPage() {
    return <div className={styles.page}>
        <p className={styles.message}>404 Not Found</p>
        <Link className={styles.link} to="/">Home</Link>
    </div>
}
