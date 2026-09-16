import { NavLink } from "react-router";
import styles from "./Navbar.module.css"
import { useSessionContext } from "supertokens-auth-react/recipe/session"
import { LoginButton } from "/src/shared/components/ui/LoginButton"

export function Navbar() {
  const {doesSessionExist} = useSessionContext()
  const linkClassName = ({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" end className={linkClassName}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails" className={linkClassName}>Cocktails</NavLink>
        </li>
        {doesSessionExist && <li>
          <NavLink to="/new-cocktail" className={linkClassName}>Add Cocktail</NavLink>
        </li>}
        <li>
          <NavLink to="/ingredients" className={linkClassName}>Ingredients</NavLink>
        </li>
        {doesSessionExist && <li>
          <NavLink to="/new-ingredient" className={linkClassName}>Add Ingredient</NavLink>
        </li>}
        <li>
          <LoginButton className={styles.navLink} variant="link"/>
        </li>
      </ul>
    </nav>
  );
}
