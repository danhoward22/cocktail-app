import { NavLink } from "react-router";
import styles from "./Navbar.module.css"

export function Navbar() {
  const linkClassName = ({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" end className={linkClassName}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails" className={linkClassName}>Search</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails/new-cocktail" className={linkClassName}>Add Cocktail</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails/new-ingredient" className={linkClassName}>Add Ingredient</NavLink>
        </li>
      </ul>
    </nav>
  );
}
