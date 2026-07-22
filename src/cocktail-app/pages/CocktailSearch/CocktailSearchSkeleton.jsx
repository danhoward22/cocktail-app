import { CocktailSearchToggle } from "./CocktailSearchToggle"
import { CocktailSearchBar } from "./CocktailSearchBar"
import { useParams } from "react-router"
import styles from "./CocktailSearchPage.module.css"

export function CocktailSearchSkeleton(){
  const {cocktailId} = useParams()
  return (
    <div className={`${styles.page} ${cocktailId ? styles.withOutlet : ''}`}>
      <div className={styles.searchControls}>
        <CocktailSearchBar/>
        <CocktailSearchToggle/>
      </div>
      <div className={styles.loading}>
        <p className={styles.loadingText}>⌛ Loading...</p>
      </div>
      {cocktailId && 
        <div className={styles.loading}>
            <p className={styles.loadingText}>⌛ Loading...</p>
        </div>
      }
    </div>
  )
}
