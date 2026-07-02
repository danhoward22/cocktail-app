import {arrayContainsSubstring} from "../../shared/utils/arrayUtils"

export const cocktails = [
  {
    id:1,
    name:"Manhattan",
    ingredients:[
      {name:"Rye Whiskey", parents:["Whiskey"], qty:2, units:"oz"},
      {name:"Sweet Vermouth", parents:[], qty:1, units:"oz"},
      {name:"Angostura Bitters", parents:[], qty:2, units:"dash"},
    ],
    garnishes:["Cherry"],
    notes:"Stir, serve up."
  },
  {
    id:2,
    name:"Vesper",
    ingredients:[
      {name:"Gin", parents:[], qty:3, units:"oz"},
      {name:"Vodka", parents:[], qty:1, units:"oz"},
      {name:"Lillet Blanc", parents:["Blanc Vermouth"], qty:.5, units:"oz"},
    ],
    garnishes:["Lemon Twist"],
    notes:"Stir, serve up."
  },
  {
    id:3,
    name:"Martini",
    ingredients:[
      {name:"Gin", parents:[], qty:3, units:"oz"},
      {name:"Dry Vermouth", parents:[], qty:1.5, units:"oz"},
      {name:"Orange Bitters", parents:[], qty:2, units:"dash"},
    ],
    garnishes:["Lemon Twist"],
    notes:"Stir, serve up."
  },
  {
    id:4,
    name:"Old Fashioned",
    ingredients:[
      {name:"Bourbon", parents:["Whiskey"], qty:2, units:"oz"},
      {name:"Simple Syrup", parents:[], qty:.25, units:"oz"},
      {name:"Angostura Bitters", parents:[], qty:2, units:"dash"},
    ],
    garnishes:["Cherry","Orange Peel"],
    notes:"Build in glass with ice."
  },
  {
    id:5, name:"Mai Tai",
    ingredients:[
      {name:"Lost Spirits Jamaica Rum", parents:["Jamaican Rum","Rum"], qty:2, units:"oz"},
      {name:"Orange Curaçao", parents:["Curaçao"], qty:.5, units:"oz"},
      {name:"Lime Juice", parents:[], qty:1, units:"oz"},
      {name:"Orgeat", parents:[], qty:.5, units:"oz"},
    ],
    garnishes:["Mint", "Lime Shell"],
    notes:"Shake, serve on rocks."
  }
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