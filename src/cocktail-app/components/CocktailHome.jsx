import { Link } from "react-router"
import styles from "./CocktailHome.module.css"

export function CocktailHome() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Cocktail App Home Page</h1>
      <Link className={styles.cta} to="/cocktails">Search Cocktails</Link>
      <Link className={styles.cta} to="/cocktails/new-cocktail">Add Cocktail</Link>
    </div>
  )
}