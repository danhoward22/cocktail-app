import {arrayContainsSubstring} from "../../shared/utils/arrayUtils"

const cocktails = [
  {
    id:1,
    name:"Manhattan",
    ingredients:[
      {id:1, name:"Rye Whiskey", parents:["Whiskey"], qty:2, units:"oz"},
      {id:2, name:"Sweet Vermouth", parents:[], qty:1, units:"oz"},
      {id:3, name:"Angostura Bitters", parents:[], qty:1, units:"dash"},
    ],
    garnishes:[{id:11, name:"Cherry", qty:1}],
    notes:"Stir, serve up."
  },
  {
    id:2,
    name:"Vesper",
    ingredients:[
      {id:4, name:"Gin", parents:[], qty:3, units:"oz"},
      {id:5, name:"Vodka", parents:[], qty:1, units:"oz"},
      {id:6, name:"Lillet Blanc", parents:["Blanc Vermouth"], qty:.5, units:"oz"},
    ],
    garnishes:[{id:12,name:"Lemon Twist",qty:1}],
    notes:"Stir, serve up."
  },
  {
    id:3,
    name:"Martini",
    ingredients:[
      {id:4, name:"Gin", parents:[], qty:3, units:"oz"},
      {id:7, name:"Dry Vermouth", parents:[], qty:1.5, units:"oz"},
      {id:8, name:"Orange Bitters", parents:[], qty:2, units:"dash"},
    ],
    garnishes:[{id:12,name:"Lemon Twist",qty:1}],
    notes:"Stir, serve up."
  },
  {
    id:4,
    name:"Old Fashioned",
    ingredients:[
      {id:9, name:"Bourbon", parents:["Whiskey"], qty:2, units:"oz"},
      {id:10, name:"Simple Syrup", parents:[], qty:.25, units:"oz"},
      {id:3, name:"Angostura Bitters", parents:[], qty:1, units:"dash"},
    ],
    garnishes:[{id:11, name:"Cherry", qty:2},{id:13,name:"Orange Peel",qty:1}],
    notes:"Build in glass with ice.",
    source:"My brain"
  },
  {
    id:5, name:"Mai Tai",
    ingredients:[
      {id:16, name:"Lost Spirits Jamaica Rum", parents:["Jamaican Rum","Rum"], qty:2, units:"oz"},
      {id:17, name:"Orange Curaçao", parents:["Curaçao"], qty:.5, units:"oz"},
      {id:18, name:"Lime Juice", parents:[], qty:1, units:"oz"},
      {id:19, name:"Orgeat", parents:[], qty:.5, units:"oz"},
    ],
    garnishes:[{id:14, name:"Mint Sprig", qty:1}, {id:15, name:"Lime Shell", qty:1}],
    notes:"Shake, serve on rocks."
  },
  {
    id:6, name:"Mojito",
    ingredients:[
      {id:20, name:"White Rum", parents:["Rum"], qty:2, units:"oz"},
      {id:18, name:"Lime Juice", parents:[], qty:1, units:"oz"},
      {id:10, name:"Simple Syrup", parents:[], qty:.5, units:"oz"},
      {id:21, name:"Mint Leaves", parents:[], qty:7, units:""},
      {id:23, name:"Club Soda", parents:[], qty:3, units:"oz"},
    ],
    garnishes:[{id:14, name:"Mint Sprig", qty:1}, {id:22, name:"Lime Wheel", qty:1}],
    notes:"Shake rum, lime, syrup, and mint. Pour over ice in a Collins glass. Top with club soda."
  },
]

export async function fetchCocktailList(){
  console.log("fetchCocktailList called")
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try{
    const cocktailList = cocktails.map((cocktail) => {
      return {
        id: cocktail.id,
        name: cocktail.name,
        ingredients: cocktail.ingredients.map((ingredient)=> ingredient.name),
        parentIngredients: cocktail.ingredients.flatMap(ingredient => ingredient.parents ),
      }
    })
    return cocktailList
  }catch (e) {
    console.log("Error in fetchCocktailList", e.message)
  }

  return []
}

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
export async function fetchCocktail(id) {
  //to do: update to API call. Simulate delay for now.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return cocktails.find((cocktail) => cocktail.id==id)
//   if (activeController) {
//     activeController.abort();
//   }

//   activeController = new AbortController();

//   try {
//     const response = await fetch(`https://example.com{userId}`, {
//       signal: activeController.signal
//     });
    
//     const data = await response.json();
//     console.log("User data loaded:", data);
//   } catch (error) {
//     if (error.name === 'AbortError') {
//       console.log("Previous request successfully aborted.");
//     } else {
//       console.error("Fetch error:", error);
//     }
//   }
}
