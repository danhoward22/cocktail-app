import { fetchIngredient, fetchFilteredIngredients } from "../services/cocktailApi";

export const ingredientKeys = {
  all: ['ingredients'],  
  lists: () => [...ingredientKeys.all, 'list'],
  list: (filter) => [...ingredientKeys.lists(), filter],
  details: () => [...ingredientKeys.all, 'detail'],
  detail: (id) => [...ingredientKeys.details(), String(id)],
}

export const ingredientSearchQueryOptions = (filter, enabled=true) => ({
    queryKey: ingredientKeys.list(filter),
    queryFn: () => fetchFilteredIngredients(filter),
    staleTime: 1000 * 300,
    enabled: enabled && !!filter
})

export const ingredientQueryOptions = (ingredientId) => ({
    queryKey: ingredientKeys.detail(ingredientId),
    queryFn: () => fetchIngredient(ingredientId),
    staleTime: 1000 * 300,
    enabled: !!ingredientId,
})