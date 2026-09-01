import { Outlet, useMatches } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { CocktailSearchToggle } from "./CocktailSearchToggle"
import { CocktailSearchBar } from "./CocktailSearchBar"
import { CocktailList } from "./CocktailList"
import { Loading } from "/src/shared/components/Loading"

import { cocktailListQueryOptions } from "../../queries/cocktailQueries"
import { useDeferredQuery } from "/src/shared/hooks/useDeferredQuery"
import { useSearchBy } from "../../hooks/useSearchBy"
import { filterCocktails } from "../../utils/cocktailUtils"

import styles from "./CocktailSearchPage.module.css"

export function CocktailSearchPage() {
  const {
    data: cocktails,
    isPending,
    isError,
    error
  } = useQuery(cocktailListQueryOptions())
  const [searchBy, setSearchBy] = useSearchBy()
  const [query, setQuery, deferredQuery] = useDeferredQuery()

  const matches = useMatches()
  const hasSelectedCocktail = matches.some((match) => match.params?.cocktailId)

  let listMarkup = null
  if(isPending){
    listMarkup = <Loading message={"Loading Cocktails..."} />
  }else if(isError){
    listMarkup = (
      <div className={styles.error}>
        <p>{error ? error.message : "Cocktail list failed"}</p>
      </div>
    )
  }else{
    const filteredCocktails = filterCocktails(cocktails, deferredQuery, searchBy)
    listMarkup = <CocktailList cocktails={filteredCocktails}/>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cocktails</h1>
      </div>
      <div className={styles.searchControls}>
        <CocktailSearchBar query={query} setQuery={setQuery} />
        <CocktailSearchToggle searchBy={searchBy} setSearchBy={setSearchBy}/>
      </div>
      {listMarkup}
      {hasSelectedCocktail &&
        <div className={styles.detail}>
          <Outlet/>
        </div>
      }
    </div>
  )
}
