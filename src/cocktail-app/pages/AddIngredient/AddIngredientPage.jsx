import { IngredientForm } from "../../components/IngredientForm"
import styles from "./AddIngredientPage.module.css"

export function AddIngredientPage() {

  return (
    <div className={styles.page}>
      <IngredientForm />
    </div>
  )
}