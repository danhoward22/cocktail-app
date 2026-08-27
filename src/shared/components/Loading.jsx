import styles from "./Loading.module.css"

const VARIANT_MAP = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function Loading({message, variant = "primary"}){
    const className = `${styles.loading} ${VARIANT_MAP[variant] || styles.primary}`

    return(
        <div className={className}>
            <p className={styles.loadingText}>⌛ {message}</p>
        </div>
    )
}