import { Link } from "react-router"
import styles from "./CocktailApp.module.css"

export function CocktailApp() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Cocktail App Home Page</h1>
      <Link className={styles.cta} to="/cocktails">Search Cocktails</Link>
    </div>
  )
}
