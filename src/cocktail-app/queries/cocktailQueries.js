import { fetchCocktail, fetchCocktailList } from "../services/cocktailApi"

export const cocktailKeys = {
  all: ['cocktails'],  
  lists: () => [...cocktailKeys.all, 'list'],
  //list: (filters) => [...cocktailKeys.lists(), filters],
  details: () => [...cocktailKeys.all, 'detail'],
  detail: (id) => [...cocktailKeys.details(), String(id)],
}

export const cocktailListQueryOptions = () => ({
    queryKey: cocktailKeys.lists(),
    queryFn: fetchCocktailList,
    staleTime: 1000 * 300,
})

export const cocktailQueryOptions = (cocktailId) => ({
    queryKey: cocktailKeys.detail(cocktailId),
    queryFn: () => fetchCocktail(cocktailId),
    staleTime: 1000 * 300,
    enabled: !!cocktailId
})