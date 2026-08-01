import { NavLink } from "react-router";

export function Navbar({styles}) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails">Search</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails/new-cocktail">Add Cocktail</NavLink>
        </li>
        <li>
          <NavLink to="/cocktails/new-ingredient">Add Ingredient</NavLink>
        </li>
      </ul>
    </nav>
  );
}