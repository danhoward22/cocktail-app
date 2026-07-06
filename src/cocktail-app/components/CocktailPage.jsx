import { useCocktail } from "../hooks/useCocktail"
import { Cocktail } from "./Cocktail"
import styles from "./CocktailPage.module.css"

export function CocktailPage() {
  const [cocktail, isPending] = useCocktail()

  return (
    <div className={styles.page}>
      {isPending ? 
        <p className={styles.loading}>⌛ Loading...</p> : 
        (cocktail && <Cocktail cocktail={cocktail}/>)
      }
    </div>
  )
}
