import { fetchIngredientList, fetchIngredient, fetchFilteredIngredients } from "../services/cocktailApi";

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

export const ingredientListQueryOptions = () => ({
    queryKey: ingredientKeys.lists(),
    queryFn: fetchIngredientList,
    staleTime: 1000 * 300,
})

export const ingredientQueryOptions = (ingredientId, enabled=true) => ({
    queryKey: ingredientKeys.detail(ingredientId),
    queryFn: () => fetchIngredient(ingredientId),
    staleTime: 1000 * 300,
    enabled: enabled && !!ingredientId,
})