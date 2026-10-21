import * as mockApi from './cocktailApi.mock';
import * as realApi from './cocktailApi';

const useMock = import.meta.env.VITE_USE_MOCK_API === 'true';
const api = useMock ? mockApi : realApi;

export const { 
    fetchIngredientList,
    fetchFilteredIngredients,
    fetchIngredient,
    createIngredient,
    updateIngredient,
} = api;

export const {
    fetchCocktailList,
    fetchCocktail,
    createCocktail,
    updateCocktail,
} = realApi;