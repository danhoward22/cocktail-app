import { CocktailForm } from "../../components/CocktailForm"
import { getDefaultCocktail } from "../../utils/cocktailUtils"
import styles from "./AddCocktailPage.module.css"

export function AddCocktailPage() {

  return (
    <div className={styles.page}>
      <CocktailForm cocktail={getDefaultCocktail()}/>
    </div>
  )
}