export default function ClickButton({execute, children}){
    return <button type="button" onClick={()=>{execute()}}>{children}</button>
}