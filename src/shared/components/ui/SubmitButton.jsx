import styles from "./SubmitButton.module.css"

export default function SubmitButton({isSubmitting}){
    return (
        <button className={styles.button} disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving..." : "Save"}
        </button>
    )
}
