import { cocktailQueryOptions } from "../cocktail-app/queries/cocktailQueries"

export function cocktailLoader(queryClient){
    return ({params}) => {
        const {cocktailId} = params
        queryClient.query(cocktailQueryOptions(cocktailId))
    }
}