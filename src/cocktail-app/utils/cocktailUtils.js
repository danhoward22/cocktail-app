import { arrayContainsSubstring } from "/src/shared/utils/arrayUtils"

export function filterCocktails(cocktails, query, searchBy) {
  if(searchBy=="ingredient"){
    return cocktails.filter((cocktail) => {
      return (
        arrayContainsSubstring(cocktail.ingredients, query)
        || arrayContainsSubstring(cocktail.parentIngredients, query)
      )
    })
  }
  //default to search by name
  return cocktails.filter((cocktail) => cocktail.name.toLowerCase().includes(query.toLowerCase()))
}

export function getDefaultCocktail(){
  return {
    id: 0,
    name: "",
    ingredients: [],
    garnishes: [],
    notes: "",
    source: ""
  }
}

export function getDefaultCocktailIngredient(){
  return {
    id: 0,
    name: "",
    parents: [],
    parentId: null,
    qty: 0,
    units: "oz"
  }
}