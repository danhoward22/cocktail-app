import { fetchCocktail } from "../cocktail-app/services/cocktailApi/cocktailApi.mock";

export function cocktailLoader({params}){
    const cocktailPromise = fetchCocktail(params.cocktailId)
    return {cocktailPromise}
}