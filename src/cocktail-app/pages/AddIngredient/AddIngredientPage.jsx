import { Link } from "react-router"
import { IngredientForm } from "../../components/IngredientForm"
import styles from "./AddIngredientPage.module.css"

export function AddIngredientPage() {

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add an Ingredient</h1>
        {/* {<Link to="/cocktails" className={styles.close}>Close</Link>} */}
      </div>
      <IngredientForm />
    </div>
  )
}
