import { arrayContainsSubstring } from "../../shared/utils/arrayUtils"
import { getLocalStorage, setLocalStorage } from "../../shared/utils/localStorageUtils"

const drinks = new Map([
  [1, {id:1, name:"Manhattan", notes:"Stir, serve up.", source:""}],
  [2, {id:2, name:"Vesper", notes:"Stir, serve up.", source:""}],
  [3, {id:3, name:"Martini", notes:"Stir, serve up.", source:""}],
  [4, {id:4, name:"Old Fashioned", notes:"Build in glass with ice.", source:"My brain"}],
  [5, {id:5, name:"Mai Tai", 
    notes:"Shake, serve on rocks. Arrange mint and spent lime shell like an island with a palm tree.", 
    source:""
  }],
  [6, {id:6, name:"Mojito", 
    notes:"Shake rum, lime, syrup, and mint. Pour over ice in a Collins glass. Top with club soda.",
    source:""
  }],
  [7, {id:7, name:"Chocolate Milk", 
    notes:"Add all ingredients to a soda siphon, and charge with one N2O cartridge. Serve with a side of Fernet Branca \"Oreo\" cookies. Makes 6 6oz drinks",
    source:"Jamie Boudreau"
  }],
])

const ingredients = new Map([
  [1, {id:1, name:"Whiskey", parent_id:null}],
  [2, {id:2, name:"Rye Whiskey", parent_id:1}],
  [3, {id:3, name:"Sweet Vermouth", parent_id:null}],
  [4, {id:4, name:"Cherry", parent_id:null}],
  [5, {id:5, name:"Gin", parent_id:null}],
  [6, {id:6, name:"Vodka", parent_id:null}],
  [7, {id:7, name:"Blanc Vermouth", parent_id:null}],
  [8, {id:8, name:"Lillet Blanc", parent_id:7}],
  [9, {id:9, name:"Lemon Twist", parent_id:null}],
  [10, {id:10, name:"Dry Vermouth", parent_id:null}],
  [11, {id:11, name:"Orange Bitters", parent_id:null}],
  [12, {id:12, name:"Bourbon", parent_id:1}],
  [13, {id:13, name:"Simple Syrup", parent_id:null}],
  [14, {id:14, name:"Angostura Bitters", parent_id:null}],
  [15, {id:15, name:"Orange Peel", parent_id:null}],
  [16, {id:16, name:"Rum", parent_id:null}],
  [17, {id:17, name:"Jamaican Rum", parent_id:16}],
  [18, {id:18, name:"Lost Spirits Jamaica Rum", parent_id:17}],
  [19, {id:19, name:"Lime Juice", parent_id:null}],
  [20, {id:20, name:"Orange Curaçao", parent_id:null}],
  [21, {id:21, name:"Orgeat", parent_id:null}],
  [22, {id:22, name:"Mint Sprig", parent_id:null}],
  [23, {id:23, name:"Lime Shell", parent_id:null}],
  [24, {id:24, name:"White Rum", parent_id:16}],
  [25, {id:25, name:"Mint Leaves", parent_id:null}],
  [26, {id:26, name:"Club Soda", parent_id:null}],
  [27, {id:27, name:"Lime Wheel", parent_id:null}],
  [28, {id:28, name:"Brandy", parent_id:null}],
  [29, {id:29, name:"Cognac", parent_id:28}],
  [30, {id:30, name:"Scotch", parent_id:1}],
  [31, {id:31, name:"Ardbeg", parent_id:30}],
  [32, {id:32, name:"Creme de Cacao", parent_id:null}],
  [33, {id:33, name:"Tempus Fugit Creme de Cacao", parent_id:32}],
  [34, {id:34, name:"Water", parent_id:null}],
  [35, {id:35, name:"Milk", parent_id:null}],
  [36, {id:36, name:"Cream", parent_id:null}],
  [37, {id:37, name:"Egg White", parent_id:null}],
])

const drinkIngredients = [
  {drink_id:1, ingredient_id:2, qty:2, units:"oz", is_garnish:false},
  {drink_id:1, ingredient_id:3, qty:1, units:"oz", is_garnish:false},
  {drink_id:1, ingredient_id:14, qty:1, units:"dash", is_garnish:false},
  {drink_id:2, ingredient_id:5, qty:3, units:"oz", is_garnish:false},
  {drink_id:2, ingredient_id:6, qty:1, units:"oz", is_garnish:false},
  {drink_id:2, ingredient_id:8, qty:.5, units:"oz", is_garnish:false},
  {drink_id:3, ingredient_id:5, qty:3, units:"oz", is_garnish:false},
  {drink_id:3, ingredient_id:10, qty:1.5, units:"oz", is_garnish:false},
  {drink_id:3, ingredient_id:11, qty:2, units:"dash", is_garnish:false},
  {drink_id:4, ingredient_id:12, qty:2, units:"oz", is_garnish:false},
  {drink_id:4, ingredient_id:13, qty:.25, units:"oz", is_garnish:false},
  {drink_id:4, ingredient_id:14, qty:1, units:"dash", is_garnish:false},
  {drink_id:5, ingredient_id:18, qty:2, units:"oz", is_garnish:false},
  {drink_id:5, ingredient_id:20, qty:.5, units:"oz", is_garnish:false},
  {drink_id:5, ingredient_id:19, qty:1, units:"oz", is_garnish:false},
  {drink_id:5, ingredient_id:21, qty:.5, units:"oz", is_garnish:false},
  {drink_id:6, ingredient_id:24, qty:2, units:"oz", is_garnish:false},
  {drink_id:6, ingredient_id:19, qty:1, units:"oz", is_garnish:false},
  {drink_id:6, ingredient_id:13, qty:.5, units:"oz", is_garnish:false},
  {drink_id:6, ingredient_id:25, qty:7, units:"", is_garnish:false},
  {drink_id:6, ingredient_id:26, qty:3, units:"oz", is_garnish:false},
  {drink_id:1, ingredient_id:4, qty:1, units:"", is_garnish:true},
  {drink_id:2, ingredient_id:9, qty:1, units:"", is_garnish:true},
  {drink_id:3, ingredient_id:9, qty:1, units:"", is_garnish:true},
  {drink_id:4, ingredient_id:4, qty:2, units:"", is_garnish:true},
  {drink_id:4, ingredient_id:15, qty:1, units:"", is_garnish:true},
  {drink_id:5, ingredient_id:22, qty:1, units:"", is_garnish:true},
  {drink_id:5, ingredient_id:23, qty:1, units:"", is_garnish:true},
  {drink_id:6, ingredient_id:22, qty:1, units:"", is_garnish:true},
  {drink_id:6, ingredient_id:27, qty:1, units:"", is_garnish:true},
  {drink_id:7, ingredient_id:29, qty:6, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:31, qty:3, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:33, qty:3, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:34, qty:6, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:35, qty:7, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:36, qty:1, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:37, qty:3, units:"oz", is_garnish:false},
  {drink_id:7, ingredient_id:14, qty:.5, units:"oz", is_garnish:false},
]

// const cocktails = [
//   {
//     id:1,
//     name:"Manhattan",
//     ingredients:[
//       {id:2, name:"Rye Whiskey", parents:["Whiskey"], qty:2, units:"oz"},
//       {id:3, name:"Sweet Vermouth", parents:[], qty:1, units:"oz"},
//       {id:14, name:"Angostura Bitters", parents:[], qty:1, units:"dash"},
//     ],
//     garnishes:[{id:4, name:"Cherry", qty:1}],
//     notes:"Stir, serve up."
//   },
//   {
//     id:2,
//     name:"Vesper",
//     ingredients:[
//       {id:5, name:"Gin", parents:[], qty:3, units:"oz"},
//       {id:6, name:"Vodka", parents:[], qty:1, units:"oz"},
//       {id:8, name:"Lillet Blanc", parents:["Blanc Vermouth"], qty:.5, units:"oz"},
//     ],
//     garnishes:[{id:9,name:"Lemon Twist",qty:1}],
//     notes:"Stir, serve up."
//   },
//   {
//     id:3,
//     name:"Martini",
//     ingredients:[
//       {id:5, name:"Gin", parents:[], qty:3, units:"oz"},
//       {id:10, name:"Dry Vermouth", parents:[], qty:1.5, units:"oz"},
//       {id:11, name:"Orange Bitters", parents:[], qty:2, units:"dash"},
//     ],
//     garnishes:[{id:9,name:"Lemon Twist",qty:1}],
//     notes:"Stir, serve up."
//   },
//   {
//     id:4,
//     name:"Old Fashioned",
//     ingredients:[
//       {id:12, name:"Bourbon", parents:["Whiskey"], qty:2, units:"oz"},
//       {id:13, name:"Simple Syrup", parents:[], qty:.25, units:"oz"},
//       {id:14, name:"Angostura Bitters", parents:[], qty:1, units:"dash"},
//     ],
//     garnishes:[{id:4, name:"Cherry", qty:2},{id:15,name:"Orange Peel",qty:1}],
//     notes:"Build in glass with ice.",
//     source:"My brain"
//   },
//   {
//     id:5, name:"Mai Tai",
//     ingredients:[
//       {id:18, name:"Lost Spirits Jamaica Rum", parents:["Jamaican Rum","Rum"], qty:2, units:"oz"},
//       {id:20, name:"Orange Curaçao", parents:["Curaçao"], qty:.5, units:"oz"},
//       {id:19, name:"Lime Juice", parents:[], qty:1, units:"oz"},
//       {id:21, name:"Orgeat", parents:[], qty:.5, units:"oz"},
//     ],
//     garnishes:[{id:22, name:"Mint Sprig", qty:1}, {id:23, name:"Lime Shell", qty:1}],
//     notes:"Shake, serve on rocks. Arrange mint and spent lime shell like an island with a palm tree."
//   },
//   {
//     id:6, name:"Mojito",
//     ingredients:[
//       {id:24, name:"White Rum", parents:["Rum"], qty:2, units:"oz"},
//       {id:19, name:"Lime Juice", parents:[], qty:1, units:"oz"},
//       {id:13, name:"Simple Syrup", parents:[], qty:.5, units:"oz"},
//       {id:25, name:"Mint Leaves", parents:[], qty:7, units:""},
//       {id:26, name:"Club Soda", parents:[], qty:3, units:"oz"},
//     ],
//     garnishes:[{id:22, name:"Mint Sprig", qty:1}, {id:27, name:"Lime Wheel", qty:1}],
//     notes:"Shake rum, lime, syrup, and mint. Pour over ice in a Collins glass. Top with club soda."
//   },
// ]

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
export async function fetchCocktailObjectList(){
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cocktailList = []

  try{
    const drinkMap = getLocalStorage("drinks", drinks)
    const ingredientMap = getLocalStorage("ingredients", ingredients)
    const drinkContents = getLocalStorage("drinkIngredients", drinkIngredients)

    drinkMap.forEach((drink)=>{
      const ingredientList = []
      const garnishes = []

      drinkContents.forEach((content) => {
        if(content.drink_id==drink.id){
          const ingredient = ingredientMap.get(content.ingredient_id)

          if(content.is_garnish){
            garnishes.push({
              id: ingredient.id,
              name: ingredient.name,
              qty: drink.qty
            })
          }else{
            ingredientList.push({
              id: ingredient.id,
              name: ingredient.name,
              parents: getParentIngredientNames(ingredientMap, content.ingredient_id),
              qty: drink.qty,
              units: drink.units
            })
          }
        }
      })

      cocktailList.push({
        id: drink.id,
        name: drink.name,
        ingredients: ingredientList,
        garnishes: garnishes,
        notes: drink.notes,
        source: drink.source
      })
    })
  }catch (e) {
    console.error("Error parsing cocktails in fetchCocktailObjectList: ", e.message)
  }

  return cocktailList
}

export async function fetchCocktailList(){
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cocktailList = []

  try{
    const drinkMap = getLocalStorage("drinks", drinks)
    const ingredientMap = getLocalStorage("ingredients", ingredients)
    const drinkContents = getLocalStorage("drinkIngredients", drinkIngredients)

    drinkMap.forEach((drink)=>{
      const ingredientList = []
      const parentIngredients = []

      drinkContents.forEach((content) => {
        if(content.drink_id==drink.id){
          const ingredient = ingredientMap.get(content.ingredient_id)

          if(!content.is_garnish){
            ingredientList.push(ingredient.name)
            parentIngredients.push(...getParentIngredientNames(ingredientMap, content.ingredient_id))
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
// export async function fetchCocktailList(){

//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   try{
//     const cocktailList = cocktails.map((cocktail) => {
//       return {
//         id: cocktail.id,
//         name: cocktail.name,
//         ingredients: cocktail.ingredients.map((ingredient)=> ingredient.name),
//         parentIngredients: cocktail.ingredients.flatMap(ingredient => ingredient.parents ),
//       }
//     })
//     return cocktailList
//   }catch (e) {
//     console.error("Error in fetchCocktailList", e.message)
//   }

//   return []
// }


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

//let activeController = null;

//to do: update to api fetch
export async function fetchCocktail(id){
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try{
    const drinkMap = getLocalStorage("drinks", drinks)
    const ingredientMap = getLocalStorage("ingredients", ingredients)
    const drinkContents = getLocalStorage("drinkIngredients", drinkIngredients)

    const ingredientList = []
    const garnishes = []
    const drink = drinkMap.get(parseInt(id))

    drinkContents.forEach((content) => {
      if(content.drink_id==drink.id){
        const ingredient = ingredientMap.get(content.ingredient_id)

        if(content.is_garnish){
          garnishes.push({
            id: ingredient.id,
            name: ingredient.name,
            qty: drink.qty
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
      }
    })

    const cocktail={
      id: drink.id,
      name: drink.name,
      ingredients: ingredientList,
      garnishes: garnishes,
      notes: drink.notes,
      source: drink.source
    }

    return cocktail
  }catch (e) {
    console.error("Error parsing cocktail in fetchCocktail: ", e.message)
  }

  return null
}
// export async function fetchCocktail(id) {
//   //to do: update to API call. Simulate delay for now.
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return cocktails.find((cocktail) => cocktail.id==id)
// //   if (activeController) {
// //     activeController.abort();
// //   }

// //   activeController = new AbortController();

// //   try {
// //     const response = await fetch(`https://example.com{userId}`, {
// //       signal: activeController.signal
// //     });
    
// //     const data = await response.json();
// //     console.log("User data loaded:", data);
// //   } catch (error) {
// //     if (error.name === 'AbortError') {
// //       console.log("Previous request successfully aborted.");
// //     } else {
// //       console.error("Fetch error:", error);
// //     }
// //   }
// }
