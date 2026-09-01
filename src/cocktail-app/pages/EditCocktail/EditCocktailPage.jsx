import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { CocktailForm } from "../../components/CocktailForm"
import { Loading } from "/src/shared/components/Loading"
import { ErrorOutlet } from "/src/shared/components/ErrorOutlet"
import { cocktailQueryOptions } from "../../queries/cocktailQueries"
//import styles from "./EditCocktailPage.module.css"

export function EditCocktailPage() {
  const {cocktailId} = useParams()
  const {
    data: cocktail,
    isLoading,
    isError,
    error
  } = useQuery(cocktailQueryOptions(cocktailId))
  const cancelPath = `/cocktails/${cocktailId}`

  if (isLoading) return <Loading message="Loading Cocktail..." variant="secondary"/>
  if (isError) return <ErrorOutlet message={error ? error.message : "Cocktail not found"} cancelPath={cancelPath}/>

  return <CocktailForm cancelPath={cancelPath} cocktail={cocktail} />
}
