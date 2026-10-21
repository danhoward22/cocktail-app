import { normalize } from "/src/shared/utils/stringUtils"

export function buildSearchIndex(cocktails, searchBy) {
  return cocktails.map((c) => {
    if(searchBy=="ingredient"){
      const terms = [
        ...c.ingredients.flatMap((i) => [i.name, ...i.parents]),
        ...c.garnishes.map((g) => g.name),
      ]
      return { cocktail: c, haystack: normalize(terms.filter(Boolean).join(" ")) }
    }
    //default to search by name
    return { cocktail: c, haystack: normalize(c.name) }
  });
}

export function searchCocktails(index, query) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean)
  if (!tokens.length) return index.map((e) => e.cocktail)
  return index
    .filter((e) => tokens.every((t) => e.haystack.includes(t)))
    .map((e) => e.cocktail)
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
    qty: 0,
    units: "oz"
  }
}

// Object structure returned in API
// const cocktails = [
//   {
//     id:5,
//     name:"Mai Tai",
//     ingredients:[
//       {id:18, name:"Lost Spirits Jamaica Rum", parents:["Jamaican Rum","Rum"], qty:2, units:"oz"},
//       {id:20, name:"Orange Curaçao", parents:["Curaçao"], qty:.5, units:"oz"},
//       {id:19, name:"Lime Juice", parents:[], qty:1, units:"oz"},
//       {id:21, name:"Orgeat", parents:[], qty:.5, units:"oz"},
//     ],
//     garnishes:[
//       {id:22, name:"Mint Sprig", qty:1},
//       {id:23, name:"Lime Shell", qty:1},
//     ],
//     notes:"Shake, serve on rocks. Arrange mint and spent lime shell like an island with a palm tree.",
//     source:"",
//   },
// ]