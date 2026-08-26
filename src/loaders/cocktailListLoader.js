import { fetchCocktailList } from "../cocktail-app/services/cocktailApi";

export function cocktailListLoader(){
    const cocktailsPromise = fetchCocktailList()
    return {cocktailsPromise}
}