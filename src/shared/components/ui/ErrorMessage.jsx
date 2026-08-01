export default function ErrorMessage({error, className}){
    return (error ? <div style={className ? undefined : { color: 'red' }} className={className}>{error.message}</div> : <></>)
}