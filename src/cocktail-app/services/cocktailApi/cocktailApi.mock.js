import { arrayContainsSubstring } from "/src/shared/utils/arrayUtils"
import { getLocalStorage, setLocalStorage } from "/src/shared/utils/localStorageUtils"
import { drinkData, ingredientData, drinkIngredientData } from "../../data/mockData"

function getParentIngredientNames(ingredientArray, parentId){
  const parentNames = []
  const parent = ingredientArray.find(i => i.id==parentId)
  parentNames.push(parent.name)
  if(parent.parent_id){
    parentNames.push(...getParentIngredientNames(ingredientArray, parent.parent_id))
  }

  return parentNames
}

function parseCocktailObject(drink, contents, ingredientArray){
  const ingredientList = []
  const garnishes = []

  contents.forEach((content) => {
    try{
      const ingredient = ingredientArray.find(i => i.id==content.ingredient_id)
      if(content.is_garnish){
        garnishes.push({
          id: ingredient.id,
          name: ingredient.name,
          qty: content.qty
        })
      }else{
        const parents = ingredient?.parent_id ? getParentIngredientNames(ingredientArray, ingredient.parent_id) : []
        ingredientList.push({
          id: ingredient.id,
          name: ingredient.name,
          parents: parents,
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
//     const drinkArray = getLocalStorage("drinkData") || drinkData
//     const ingredientArray = getLocalStorage("ingredientData") || ingredientData
//     const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

//     drinkArray.forEach((drink)=>{
//       try{
//         const contents = drinkContents.filter((content)=> content.drink_id==drink.id)
//         cocktailList.push(parseCocktailObject(drink, contents, ingredientArray))
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
    const drinkArray = getLocalStorage("drinkData") || drinkData
    const ingredientArray = getLocalStorage("ingredientData") || ingredientData
    const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

    drinkArray.forEach((drink)=>{
      const ingredientList = []
      const parentIngredients = []
      const contents = drinkContents.filter((content)=> content.drink_id==drink.id)

      contents.forEach((content) => {
        if(!content.is_garnish){
          try{
            const ingredient=ingredientArray.find(i => i.id==content.ingredient_id)
            ingredientList.push(ingredient.name)
            if(ingredient?.parent_id) parentIngredients.push(...getParentIngredientNames(ingredientArray, ingredient.parent_id))
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
    const drinkArray = getLocalStorage("drinkData") || drinkData
    const ingredientArray = getLocalStorage("ingredientData") || ingredientData
    const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

    const drink = drinkArray.find(d => d.id==parseInt(id))
    const contents = drinkContents.filter((content)=> content.drink_id==drink.id)
    return parseCocktailObject(drink, contents, ingredientArray)
  }catch (e) {
    console.error("Error parsing cocktail in fetchCocktail: ", e.message)
  }

  return null
}

export async function fetchFilteredIngredients(inputValue){
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const options = []
  let i = 0
  
  const ingredientArray = getLocalStorage("ingredientData") || ingredientData
  ingredientArray.forEach((ingredient) => {
    const parents = ingredient?.parent_id ? getParentIngredientNames(ingredientArray, ingredient.parent_id) : []
    if(i < 200 && arrayContainsSubstring([...parents, ingredient.name],inputValue)){
      options.push(ingredient)
      i++
    }
  })

  return options
}

export async function fetchIngredient(ingredientId){
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ingredientArray = getLocalStorage("ingredientData") || ingredientData
  const i=ingredientArray.find(i => i.id==parseInt(ingredientId))
  return {
    id:i.id,
    name:i.name,
    parentId:i.parent_id
  }
}

export async function createCocktail(newCocktail){
  //same name and ingredients - Identical recipe already exists
  //same name, different ingredients, no source - edit name or source to differentiate
  //id doesn't exist (ingredient, garnish)
  //invalid units
  await new Promise((resolve) => setTimeout(resolve, 1000))

  //check for existing drink name
  const drinkArray = getLocalStorage("drinkData") || drinkData
  let existingDrinkId = null
  let existingSource = ""
  for(const drink of drinkArray.values()){
    if(drink.name.toLowerCase() === newCocktail.name.toLowerCase()){
      existingDrinkId = drink.id
      existingSource = drink.source
      break
    }
  }

  const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData
  if(existingDrinkId){
    const existingDrinkContent = drinkContents.filter(content => content.drink_id === existingDrinkId)
    //check for same recipe
    if(newCocktail.ingredients.length + newCocktail.garnishes.length == existingDrinkContent.length){
      let sameRecipe = true
      for(const content of existingDrinkContent){
        if(content.is_garnish){
          const sameGarnish = newCocktail.garnishes.some(g => (content.id==g.id && content.qty==g.qty))
          if(!sameGarnish){
            sameRecipe=false
            break
          }
        }else{
          const sameIngredient = newCocktail.ingredients.some(g => (content.id==g.id && content.qty==g.qty && content.units==g.units))
          if(!sameIngredient){
            sameRecipe=false
            break
          }
        }
      }

      if(sameRecipe){
        const error = new Error("Identical recipe already exists");
        //error.status = response.status; // Attach custom metadata
        //error.info = errorData;
        throw error;
      }
    }
    //check for source
    if(newCocktail.source=="" || existingSource.toLowerCase() == newCocktail.source.toLowerCase()){
        const error = new Error("Same cocktail name exists. Edit name or source to differentiate");
        //error.status = response.status; // Attach custom metadata
        //error.info = errorData;
        throw error;
    }
  }

  let newIndex=0;
  drinkArray.forEach(d => {
    if(d.id > newIndex) newIndex = d.id
  })
  newIndex++

  drinkArray.push({
    id:newIndex,
    name:newCocktail.name,
    notes:newCocktail.notes,
    source:newCocktail.source
  })
  setLocalStorage("drinkData", drinkArray)

  newCocktail.ingredients.forEach(i =>{
    drinkContents.push({
      drink_id:newIndex,
      ingredient_id:i.id,
      qty:i.qty,
      units:i.units,
      is_garnish:false
    })
  })
  newCocktail.garnishes.forEach(g =>{
    drinkContents.push({
      drink_id:newIndex,
      ingredient_id:g.id,
      qty:g.qty,
      units:"",
      is_garnish:true
    })
  })
  setLocalStorage("drinkIngredientData", drinkContents)

  return newIndex
}

export async function createIngredient(newIngredient){
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const ingredientArray = getLocalStorage("ingredientData") || ingredientData
  if(ingredientArray.some(i => i.name.toLowerCase()===newIngredient.name.toLowerCase())){
    const error = new Error("Ingredient already exists");
    //error.status = response.status; // Attach custom metadata
    //error.info = errorData;
    throw error;
  }

  let newIndex=0;
  ingredientArray.forEach(i => {
    if(i.id > newIndex) newIndex = i.id;
  })
  newIndex++

  ingredientArray.push({
    id: newIndex,
    name: newIngredient.name,
    parent_id: newIngredient.parentId ? newIngredient.parentId : null
  })
  setLocalStorage("ingredientData", ingredientArray)

  return newIndex
}