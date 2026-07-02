import { Suspense } from "react"
import { Outlet, useLoaderData } from "react-router"

import { CocktailSearchToggle } from "./CocktailSearchToggle"
import { CocktailSearchBar } from "./CocktailSearchBar"
import { CocktailList } from "./CocktailList"

import { useDeferredQuery } from "../../shared/hooks/useDeferredQuery"
import { useSearchBy } from "../hooks/useSearchBy"

import { filterCocktails } from "../utils/cocktailUtils"

import styles from "./CocktailSearchPage.module.css"

export function CocktailSearchPage() {
  const cocktails = useLoaderData()
  const [searchBy, setSearchBy] = useSearchBy()
  const [query, setQuery, deferredQuery] = useDeferredQuery()
  const filteredCocktails = filterCocktails(cocktails, deferredQuery, searchBy)

  return (
    <div className={styles.page}>
      <CocktailSearchToggle searchBy={searchBy} setSearchBy={setSearchBy}/>
      <CocktailSearchBar query={query} setQuery={setQuery} />
      <CocktailList cocktails={filteredCocktails}/>
      <Outlet/>
    </div>
  )
}
