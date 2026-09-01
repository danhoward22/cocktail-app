import { arrayContainsSubstring, objectIdExists, objectNameExists } from "/src/shared/utils/arrayUtils"
import { getLocalStorage, setLocalStorage } from "/src/shared/utils/localStorageUtils"
import { isValidId } from "../../utils/cocktailUtils"
import { units } from "../../utils/unitUtils"
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
        ingredientList.push({
          id: ingredient.id,
          name: ingredient.name,
          parentId: ingredient.parent_id,
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

export async function fetchCocktailList(){
  await new Promise((resolve) => setTimeout(resolve, 1000))
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
        parentIngredients: [...new Set(parentIngredients)],
        source:drink.source
      })
    })
  }catch (e) {
    console.error("Error parsing cocktails in fetchCocktailList: ", e.message)
  }

  return cocktailList
}

export async function fetchCocktail(id){
  await new Promise((resolve) => setTimeout(resolve, 1000))
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

function getObjectIdError(obj, objArray, errorPrefix = ""){
  if(!Object.hasOwn(obj, "id")){
    return new Error(`${errorPrefix}ID missing.`)
  }else if(!isValidId(obj.id)){
    return new Error(`${errorPrefix}ID ${obj.id} is not valid.`)
  }else if(!objectIdExists(obj.id, objArray)){
    return new Error(`${errorPrefix}ID ${obj.id} does not exist.`)
  }
  return null
}

function getCocktailIngredientErrors(ingredient, ingredientArr = null, errorPrefix=""){
  const ingredientArray = ingredientArr || getLocalStorage("ingredientData") || ingredientData
  const propErrors = []

  //validate ID
  const idError = getObjectIdError(ingredient, ingredientArray, errorPrefix)
  if(idError) propErrors.push(idError)

  //validate qty
  if(!Number.isFinite(ingredient.qty)){
    propErrors.push(new Error(`${errorPrefix}quantity is invalid: ${ingredient.qty}`))
  }
  //validate units
  if(!units.includes(ingredient.units) && ingredient.units!==""){
    propErrors.push(new Error(`${errorPrefix} units are invalid: ${ingredient.units}`))
  }

  return propErrors
}
//TODO: finalize validateCocktail
function validateCocktail(cocktail, drinkArr = null, drinkIngredientArr = null, forUpdate = false){
  const propErrors = []
  const drinkArray = drinkArr || getLocalStorage("drinkData") || drinkData

  //validate id
  if(forUpdate){
    const idError = getObjectIdError(cocktail, drinkArray, "Cocktail ")
    if(idError) propErrors.push(idError)
  }

  //validate name
  if(!cocktail.name){
      propErrors.push(new Error("Cocktail name is missing."))
  }

  //validate ingredients
  const ingredientArray = getLocalStorage("ingredientData") || ingredientData
  if(cocktail.ingredients.length < 1){
      propErrors.push(new Error("Ingredients missing."))
  }else{
    const iId = []
    const iDupe = []
    cocktail.ingredients.forEach((ingredient, index)=>{
      const iErrors = getCocktailIngredientErrors(ingredient, ingredientArray, `Ingredient[${index}] `)
      iErrors.forEach(e => { propErrors.push(e) })
      //check for duplicates
      if(iId.includes(ingredient.id) && !iDupe.includes(ingredient.id)){
        const dupe = ingredientArray.find(i => i.id==ingredient.id)
        propErrors.push(new Error(`Duplicate ingredient: ${dupe.name}`))
        iDupe.push(ingredient.id)
      }else{
        iId.push(ingredient.id)
      }
    })
  }

  //validate garnishes
  const gId = []
  const gDupe = []
  cocktail.garnishes?.forEach((garnish, index)=>{
    const gErrors = getCocktailIngredientErrors(garnish, ingredientArray, `Garnish[${index}] `)
    gErrors.forEach((e) => { propErrors.push(e) })
    //check for duplicates
    if(gId.includes(garnish.id) && !gDupe.includes(garnish.id)){
      const dupe = ingredientArray.find(i => i.id==garnish.id)
      propErrors.push(new Error(`Duplicate garnish: ${dupe.name}`))
      gDupe.push(garnish.id)
    }else{
      gId.push(garnish.id)
    }
  })

  //throw prop errors
  if(propErrors.length > 1){
    throw new AggregateError(propErrors, 'Invalid cocktail object')
  }else if(propErrors.length == 1){
    throw propErrors[0]
  }

  const drinkContents = drinkIngredientArr || getLocalStorage("drinkIngredientData") || drinkIngredientData

  //check for existing drink name
  const cocktailId = cocktail.id || 0
  const existingDrinks = []
  drinkArray.forEach(drink => {
    if(drink.id != cocktailId && drink.name.toLowerCase() === cocktail.name.toLowerCase()){
      existingDrinks.push(drink)
    }
  })

  for(const existingDrink of existingDrinks.values()){
    const existingDrinkContent = drinkContents.filter(content => content.drink_id === existingDrink.id)
    //check for same recipe
    if(cocktail.ingredients.length + cocktail.garnishes.length == existingDrinkContent.length){
      let sameRecipe = true
      for(const content of existingDrinkContent){
        if(content.is_garnish){
          const sameGarnish = cocktail.garnishes.some(g => (content.id==g.id && content.qty==g.qty))
          if(!sameGarnish){
            sameRecipe=false
            break
          }
        }else{
          const sameIngredient = cocktail.ingredients.some(g => (content.id==g.id && content.qty==g.qty && content.units==g.units))
          if(!sameIngredient){
            sameRecipe=false
            break
          }
        }
      }
      //same name and ingredients - identical recipe
      if(sameRecipe){
        throw new Error("Identical recipe already exists")
      }
    }
    //same name, different ingredients, same or no source
    if(cocktail.source=="" || existingDrink.source.toLowerCase() == cocktail.source.toLowerCase()){
      throw new Error("Same cocktail name exists. Edit name or source to differentiate")
    }
  }
}

export async function createCocktail(newCocktail){
  const drinkArray = getLocalStorage("drinkData") || drinkData
  const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

  validateCocktail(newCocktail, drinkArray, drinkContents)

  let newIndex=0
  drinkArray.forEach(d => {
    if(d.id > newIndex) newIndex = d.id
  })
  newIndex++

  drinkArray.push({
    id:newIndex,
    name:newCocktail.name,
    notes:newCocktail.notes || "",
    source:newCocktail.source || "",
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

  return await fetchCocktail(newIndex)
}

export async function updateCocktail(cocktail){
  const drinkArray = getLocalStorage("drinkData") || drinkData
  const drinkContents = getLocalStorage("drinkIngredientData") || drinkIngredientData

  validateCocktail(cocktail, drinkArray, drinkContents, true)

  const existingDrink = drinkArray.find(d => d.id===cocktail.id)
  existingDrink.name = cocktail.name
  existingDrink.notes = cocktail.notes
  existingDrink.source = cocktail.source
  setLocalStorage("drinkData", drinkArray)
  console.log(drinkArray)

  const newDrinkContents = drinkContents.filter(dc => dc.drink_id!=cocktail.id)

  cocktail.ingredients.forEach(i =>{
    newDrinkContents.push({
      drink_id:cocktail.id,
      ingredient_id:i.id,
      qty:i.qty,
      units:i.units,
      is_garnish:false
    })
  })
  cocktail.garnishes.forEach(g =>{
    newDrinkContents.push({
      drink_id:cocktail.id,
      ingredient_id:g.id,
      qty:g.qty,
      units:"",
      is_garnish:true
    })
  })
  setLocalStorage("drinkIngredientData", newDrinkContents)
  console.log(newDrinkContents)

  return await fetchCocktail(cocktail.id)
}

function validateIngredient(ingredient, ingredientArr = null, forUpdate = false){
  const ingredientArray = ingredientArr || getLocalStorage("ingredientData") || ingredientData
  const propErrors = []
  
  //validate ID
  if(forUpdate){
    const idError = getObjectIdError(ingredient, ingredientArray, "Ingredient ")
    if(idError) propErrors.push(idError)
  }
  //validate name
  if(!ingredient.name){
    propErrors.push(new Error("Ingredient name is missing."))
  }else if(objectNameExists(obj.name, objArray)){
    propErrors.push(new Error(`Ingredient already exists.`))
  }

  //validate parentId
  if(ingredient.parentId){
    const pError = getObjectIdError({id: ingredient.parentId}, ingredientArray, "Parent ")
    if(pError) propErrors.push(pError)
  }

  //throw prop errors
  if(propErrors.length > 1){
    throw new AggregateError(propErrors, 'Invalid ingredient')
  }else if(propErrors.length == 1){
    throw propErrors[0]
  }
}

export async function fetchFilteredIngredients(inputValue){
  await new Promise((resolve) => setTimeout(resolve, 1000))
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

export async function createIngredient(newIngredient){
  const ingredientArray = getLocalStorage("ingredientData") || ingredientData
  validateIngredient(newIngredient, ingredientArray)

  let newIndex=0
  ingredientArray.forEach(i => {
    if(i.id > newIndex) newIndex = i.id
  })
  newIndex++

  ingredientArray.push({
    id: newIndex,
    name: newIngredient.name,
    parent_id: newIngredient.parentId ? newIngredient.parentId : null
  })
  setLocalStorage("ingredientData", ingredientArray)

  return await fetchIngredient(newIndex)
}

export async function updateIngredient(ingredient){
  const ingredientArray = getLocalStorage("ingredientData") || ingredientData
  validateIngredient(ingredient, ingredientArray, true)

  const oldIngredient = ingredientArray.find(i => i.id===ingredient.id)
  oldIngredient.name = ingredient.name
  oldIngredient.parent_id = ingredient.parentId ? ingredient.parentId : null

  setLocalStorage("ingredientData", ingredientArray)

  return await fetchIngredient(ingredient.id)
}