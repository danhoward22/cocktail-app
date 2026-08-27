import { queryClient } from "../queryClient"
import { cocktailListQueryOptions } from "../cocktail-app/queries/cocktailQueries"

export function cocktailListLoader(){
  queryClient.query(cocktailListQueryOptions())
}