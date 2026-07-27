export default function SubmitButton({isSubmitting}){
    return (
        <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving..." : "Submit"}
        </button>
    )
}