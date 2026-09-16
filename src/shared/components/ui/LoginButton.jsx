import { useSessionContext } from "supertokens-auth-react/recipe/session"
import styles from "./LoginButton.module.css"
import { signOut } from "supertokens-auth-react/recipe/passwordless"
import { redirectToAuth } from "supertokens-auth-react"

const VARIANT_MAP = {
  button: styles.button,
  link: styles.link,
};

export function LoginButton({className="", variant="button"}){
    const classNames = `${className} ${VARIANT_MAP[variant] || styles.button}`
    const {doesSessionExist} = useSessionContext()

    return(
        <>
            {!doesSessionExist && <button onClick={redirectToAuth} className={classNames}>Login</button>}
            {doesSessionExist && <button onClick={signOut} className={classNames}>Logout</button>}
        </>
    )
}