import { cocktailListQueryOptions } from "../cocktail-app/queries/cocktailQueries"

export function cocktailListLoader(queryClient){
  return () => {
    queryClient.query(cocktailListQueryOptions())
  }
}