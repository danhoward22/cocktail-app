import { ingredientQueryOptions } from "../cocktail-app/queries/ingredientQueries"

export function ingredientLoader(queryClient){
    return ({params}) => {
        const {ingredientId} = params
        queryClient.query(ingredientQueryOptions(ingredientId))
    }
}