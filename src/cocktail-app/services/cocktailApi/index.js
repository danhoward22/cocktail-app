import * as mockApi from './cocktailApi.mock';
import * as realApi from './cocktailApi';

const useMock = import.meta.env.VITE_USE_MOCK_API === 'true';
const api = useMock ? mockApi : realApi;

export const { fetchCocktailList, fetchCocktail, fetchFilteredIngredients } = api;