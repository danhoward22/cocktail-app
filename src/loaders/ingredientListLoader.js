import { ingredientListQueryOptions } from "../cocktail-app/queries/ingredientQueries"

export function ingredientListLoader(queryClient){
  return () => {
    queryClient.query(ingredientListQueryOptions())
  }
}