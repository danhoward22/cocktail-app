import { useMemo } from "react"
import { filterCocktails } from "../utils/cocktailUtils"

export function useFilteredCocktailsPromise(cocktailsPromise, query, searchBy){
    return useMemo(()=>{
        return cocktailsPromise.then((cocktails)=>{
            return filterCocktails(cocktails, query, searchBy)
        })
    },[query, cocktailsPromise, searchBy])
}