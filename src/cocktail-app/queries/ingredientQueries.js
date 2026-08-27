import { fetchIngredient, fetchFilteredIngredients } from "../services/cocktailApi";

export const ingredientSearchQueryOptions = (inputValue) => ({
    queryKey: ["ingredientSearch",inputValue],
    queryFn: () => fetchFilteredIngredients(inputValue),
})

export const ingredientQueryOptions = (ingredientId) => ({
    queryKey: ["ingredients", ingredientId],
    queryFn: () => fetchIngredient(ingredientId),
    enabled: !!ingredientId,
})