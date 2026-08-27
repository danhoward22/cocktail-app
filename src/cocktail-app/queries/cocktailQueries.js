import { fetchCocktail, fetchCocktailList } from "../services/cocktailApi"

export const cocktailListQueryOptions = () => ({
    queryKey: ["cocktails"],
    queryFn: fetchCocktailList,
})

export const cocktailQueryOptions = (cocktailId) => ({
    queryKey: ["cocktails", cocktailId],
    queryFn: () => fetchCocktail(cocktailId),
    enabled: !!cocktailId
})