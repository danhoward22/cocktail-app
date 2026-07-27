import { CocktailForm } from "../../components/CocktailForm"
import styles from "./AddCocktailPage.module.css"

export function AddCocktailPage() {

  return (
    <div className={styles.page}>
      <CocktailForm />
    </div>
  )
}