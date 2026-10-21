const BASE_URL = `${import.meta.env.VITE_API_DOMAIN}/api/cocktails`

export async function fetchCocktailList(){
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Failed to fetch cocktail list')
    return response.json()
}

export async function fetchCocktail(cocktailId){
    const response = await fetch(`${BASE_URL}/${cocktailId}`)
    if (!response.ok) throw new Error('Failed to fetch cocktail')
    return response.json()
}

export async function createCocktail(newCocktail){
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCocktail),
    });
    if (!response.ok) throw new Error('Failed to create cocktail')
    return response.json()
}

export async function updateCocktail(cocktail){
    const response = await fetch(`BASE_URL/${cocktail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cocktail),
    });
    if (!response.ok) throw new Error('Failed to update cocktail')
    return response.json()
}

export async function fetchIngredientList(){}

export async function fetchFilteredIngredients(inputValue){
//   const response = await fetch(`/api/ingredients`);
//  set inputValue filter string
//   return response.json();
}

export async function fetchIngredient(ingredientId){}

export async function createIngredient(newIngredient){}

export async function updateIngredient(ingredient){}