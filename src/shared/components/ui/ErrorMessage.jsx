import styles from "./ErrorMessage.module.css"

export default function ErrorMessage({error, variant = "text", className}) {
    if (!error) return null

    const variantClass = styles[variant] || styles.text
    const classes = className ? `${variantClass} ${className}` : variantClass

    return <div className={classes} role={variant === "banner" ? "alert" : undefined}>{error.message}</div>
}
