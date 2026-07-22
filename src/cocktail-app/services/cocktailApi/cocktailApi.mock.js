import { drinkData, ingredientData, drinkIngredientData } from "../../data/mockData"
import { getLocalStorage } from "../../../shared/utils/localStorageUtils"

function getParentIngredientNames(ingredientMap, targetId){
  const parentNames = []
  const parentId = ingredientMap.get(targetId).parent_id
  if(parentId){
    const parent = ingredientMap.get(parentId)
    parentNames.push(parent.name)
    if(parent.parent_id){
      parentNames.push(...getParentIngredientNames(ingredientMap, parentId))
    }
  }

  return parentNames
}

function parseCocktailObject(drink, contents, ingredientMap){
  const ingredientList = []
  const garnishes = []

  contents.forEach((content) => {
    try{
      const ingredient = ingredientMap.get(content.ingredient_id)
      if(content.is_garnish){
        garnishes.push({
          id: ingredient.id,
          name: ingredient.name,
          qty: content.qty
        })
      }else{
        ingredientList.push({
          id: ingredient.id,
          name: ingredient.name,
          parents: getParentIngredientNames(ingredientMap, content.ingredient_id),
          qty: content.qty,
          units: content.units
        })
      }
    }catch(e){
      console.log("Error parsing ingredient in parseCocktailObject: ", e.message, "ingredient: ",content)
    }
  })

  return {
    id: drink.id,
    name: drink.name,
    ingredients: ingredientList,
    garnishes: garnishes,
    notes: drink.notes,
    source: drink.source
  }
}

// async function fetchCocktailObjectList(){
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const cocktailList = []

//   try{
//     const drinkMap = getLocalStorage("drinkData") || drinkData
//     const ingredientMap = getLocalStorage("ingredientData") || ingredientData
//     const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

//     drinkMap.forEach((drink)=>{
//       try{
//         const contents = drinkContents.filter((content)=> content.drink_id==drink.id)
//         cocktailList.push(parseCocktailObject(drink, contents, ingredientMap))
//       }catch(e){
//         console.error("Error parsing cocktail in fetchCocktailObjectList: ", e.message, "drink:", drink)
//       }
//     })
//   }catch (e) {
//     console.error("Error parsing cocktails in fetchCocktailObjectList: ", e.message)
//   }

//   return cocktailList
// }

export async function fetchCocktailList(){
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cocktailList = []

  try{
    const drinkMap = getLocalStorage("drinkData") || drinkData
    const ingredientMap = getLocalStorage("ingredientData") || ingredientData
    const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

    drinkMap.forEach((drink)=>{
      const ingredientList = []
      const parentIngredients = []
      const contents = drinkContents.filter((content)=> content.drink_id==drink.id)

      contents.forEach((content) => {
        if(!content.is_garnish){
          try{
            ingredientList.push(ingredientMap.get(content.ingredient_id).name)
            parentIngredients.push(...getParentIngredientNames(ingredientMap, content.ingredient_id))
          }catch(e){
            console.error("Error parsing cocktail ingredients in fetchCocktailList: ", e.message, "drink:", drink, "ingredient:",content)
          }
        }
      })

      cocktailList.push({
        id: drink.id,
        name: drink.name,
        ingredients: ingredientList,
        parentIngredients: parentIngredients,
        source:drink.source
      })
    })
  }catch (e) {
    console.error("Error parsing cocktails in fetchCocktailList: ", e.message)
  }

  return cocktailList
}

export async function fetchCocktail(id){
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try{
    const drinkMap = getLocalStorage("drinkData") || drinkData
    const ingredientMap = getLocalStorage("ingredientData") || ingredientData
    const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

    const drink = drinkMap.get(parseInt(id))
    const contents = drinkContents.filter((content)=> content.drink_id==drink.id)
    return parseCocktailObject(drink, contents, ingredientMap)
  }catch (e) {
    console.error("Error parsing cocktail in fetchCocktail: ", e.message)
  }

  return null
}

function filterIngredients(inputValue) {
  const options = []
  ingredientData.forEach((i) => {
    if(i.name.toLowerCase().includes(inputValue.toLowerCase())){
      options.push({value: i.id, label: i.name})
    }
  })
  return options
}

export async function fetchFilteredIngredients(inputValue){
    return (new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterIngredients(inputValue));
      }, 1000);
    }))
}
