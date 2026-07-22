import { arrayContainsSubstring } from "/src/shared/utils/arrayUtils"

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

export function getDefaultIngredient(){
  return {
    id: 0,
    name: "",
    parents: [],
    qty: 0,
    units: "oz"
  }
}
