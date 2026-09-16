import { Outlet, useLocation, useMatches } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { SearchBar } from "/src/shared/components/ui/SearchBar"
import { IngredientList } from "./IngredientList"
import { Loading } from "/src/shared/components/Loading"

import { ingredientListQueryOptions } from "../../queries/ingredientQueries"
import { useDeferredQuery } from "/src/shared/hooks/useDeferredQuery"
import { filterIngredients } from "../../utils/ingredientUtils"

import styles from "./IngredientSearchPage.module.css"

export function IngredientSearchPage() {
  const {
    data: ingredients,
    isPending,
    isError,
    error
  } = useQuery(ingredientListQueryOptions())
  const [query, setQuery, deferredQuery] = useDeferredQuery()

  const matches = useMatches()
  const hasSelectedIngredient = matches.some((match) => match.params?.ingredientId)

  let listMarkup = null
  if(isPending){
    listMarkup = <Loading message={"Loading Ingredients..."} />
  }else if(isError){
    listMarkup = (
      <div className={styles.error}>
        <p>{error ? error.message : "Ingredient list failed"}</p>
      </div>
    )
  }else{
    const filteredIngredients = filterIngredients(ingredients, deferredQuery)
    listMarkup = <IngredientList ingredients={filteredIngredients}/>
  }

  const location = useLocation()
  return (
    <div className={styles.page}>
      <div className={styles.searchControls}>
        <SearchBar query={query} setQuery={setQuery} placeholder="Search Ingredients..." />
      </div>
      {listMarkup}
      {hasSelectedIngredient &&
        <div className={styles.detail}>
          <Outlet/>
        </div>
      }
    </div>
  )
}
