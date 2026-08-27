import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { Cocktail } from "./Cocktail"
import { Loading } from "/src/shared/components/Loading"
import { ErrorOutlet } from "/src/shared/components/ErrorOutlet"
import { cocktailQueryOptions } from "../../queries/cocktailQueries"
import styles from "./CocktailPage.module.css"

export function CocktailPage() {
  const {cocktailId} = useParams()
  const {
    data: cocktail,
    isPending,
    isError,
    error
  } = useQuery(cocktailQueryOptions(cocktailId))

  if (isPending) return <Loading message="Loading Cocktail..." variant="secondary" />
  if (isError) return <ErrorOutlet message={error ? error.message : "Cocktail not found"} cancelPath="/cocktails"/>

  return (
    <div className={styles.page}>
      <Cocktail cocktail={cocktail}/>
    </div>
  )
}