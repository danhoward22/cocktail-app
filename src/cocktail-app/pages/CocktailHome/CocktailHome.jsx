import { Link } from "react-router"
import styles from "./CocktailHome.module.css"
import { useSessionContext } from "supertokens-auth-react/recipe/session"

export function CocktailHome() {
  const {doesSessionExist} = useSessionContext()
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Cocktail App Home Page</h1>
      <div className={styles.actions}>
        <Link className={styles.primary} to="/cocktails">Search Cocktails</Link>
        {doesSessionExist && <Link className={styles.secondary} to="/new-cocktail">Add Cocktail</Link>}
      </div>
      <div className={styles.actions}>
        <Link className={styles.primary} to="/ingredients">Search Ingredients</Link>
        {doesSessionExist && <Link className={styles.secondary} to="/new-ingredient">Add Ingredient</Link>}
      </div>
    </div>
  )
}
