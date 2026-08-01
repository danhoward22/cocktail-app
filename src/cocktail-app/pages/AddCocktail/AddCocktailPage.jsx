import { Link } from "react-router"
import { CocktailForm } from "../../components/CocktailForm"
import styles from "./AddCocktailPage.module.css"

export function AddCocktailPage() {

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>New Recipe</p>
          <h1 className={styles.title}>Add a Cocktail</h1>
        </div>
        <Link to="/cocktails" className={styles.close}>Close</Link>
      </div>
      <CocktailForm />
    </div>
  )
}
