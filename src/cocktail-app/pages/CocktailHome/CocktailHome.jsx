import { Link } from "react-router"
import styles from "./CocktailHome.module.css"

export function CocktailHome() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Cocktail App Home Page</h1>
      <div className={styles.actions}>
        <Link className={styles.primary} to="/cocktails">Search Cocktails</Link>
        <Link className={styles.secondary} to="/cocktails/new-cocktail">Add Cocktail</Link>
        <Link className={styles.secondary} to="/cocktails/new-ingredient">Add Ingredient</Link>
      </div>
    </div>
  )
}
