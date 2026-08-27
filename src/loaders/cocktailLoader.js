import { queryClient } from "../queryClient"
import { cocktailQueryOptions } from "../cocktail-app/queries/cocktailQueries"

export function cocktailLoader({params}){
    const {cocktailId} = params
    queryClient.query(cocktailQueryOptions(cocktailId))
}