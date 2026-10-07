import { Outlet, useMatches } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { CocktailSearchToggle } from "./CocktailSearchToggle"
import { SearchBar } from "/src/shared/components/ui/SearchBar"
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
      <div className={styles.searchControls}>
        <SearchBar query={query} setQuery={setQuery} placeholder="Search Cocktails..." />
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

// // searchIndex.js
// const normalize = (s) =>
//   s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// export function buildSearchIndex(cocktails) {
//   return cocktails.map((c) => {
//     const terms = [
//       c.name,
//       c.source,
//       ...c.ingredients.flatMap((i) => [i.name, ...i.parents]),
//       ...c.garnishes.map((g) => g.name),
//     ];
//     return { cocktail: c, haystack: normalize(terms.filter(Boolean).join(" ")) };
//   });
// }

// export function search(index, query) {
//   const tokens = normalize(query).split(/\s+/).filter(Boolean);
//   if (!tokens.length) return index.map((e) => e.cocktail);
//   return index
//     .filter((e) => tokens.every((t) => e.haystack.includes(t)))
//     .map((e) => e.cocktail);
// }

// // CocktailSearchPage
// const index = useMemo(() => buildSearchIndex(cocktails), [cocktails]);
// const results = useMemo(() => search(index, query), [index, query]);