import { Link } from "react-router"
import { IngredientForm } from "../../components/IngredientForm"
import styles from "./AddIngredientPage.module.css"

export function AddIngredientPage() {

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>New Ingredient</p>
          <h1 className={styles.title}>Add an Ingredient</h1>
        </div>
        <Link to="/cocktails" className={styles.close}>Close</Link>
      </div>
      <IngredientForm />
    </div>
  )
}
