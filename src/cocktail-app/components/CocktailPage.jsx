import { Link } from "react-router"
import { useCocktail } from "../hooks/useCocktail"
import { Cocktail } from "./Cocktail"
import styles from "./CocktailPage.module.css"

export function CocktailPage() {
  const [cocktail, isPending] = useCocktail()

  return (
    <div className={styles.page}>
      {isPending ? 
        <div className={styles.loading}>
          <p className={styles.loadingText}>⌛ Loading...</p>
        </div>
        : (cocktail ?
          <Cocktail cocktail={cocktail}/>
          : <div className={styles.loading}>
            <p className={styles.loadingText}>Cocktail not found</p>
            <Link to='/cocktails' className={styles.close}>Close</Link>
          </div>
        )
      }
    </div>
  )
}