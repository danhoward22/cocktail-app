import { Link, useLoaderData } from "react-router"
import { Cocktail } from "./Cocktail"
import styles from "./CocktailPage.module.css"
import { Suspense } from "react"

export function CocktailPage() {
  const {cocktailPromise} = useLoaderData()

  return (
    <div className={styles.page}>
      <Suspense fallback={
        <div className={styles.loading}>
          <p className={styles.loadingText}>⌛ Loading Cocktail...</p>
        </div>
      }>
        <Cocktail cocktailPromise={cocktailPromise}/>
      </Suspense>
    </div>
  )
}