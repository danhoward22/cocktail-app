export default function ErrorMessage({error, className}){
    return (error ? <div className={className}>{error.message}</div> : <></>)
}