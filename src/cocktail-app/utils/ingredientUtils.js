export function filterIngredients(ingredients, query) {
  return ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(query.toLowerCase()))
}

export function getDefaultIngredient(){
  return {
    id: 0,
    name: "",
    parentId: null
  }
}