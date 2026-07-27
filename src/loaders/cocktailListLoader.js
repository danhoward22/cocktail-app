import { fetchCocktailList } from "../cocktail-app/services/cocktailApi/cocktailApi.mock";

export function cocktailListLoader(){
    const cocktailsPromise = fetchCocktailList()
    return {cocktailsPromise}
}