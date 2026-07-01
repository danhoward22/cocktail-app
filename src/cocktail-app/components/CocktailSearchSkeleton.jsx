import { CocktailSearchToggle } from "./CocktailSearchToggle"
import { CocktailSearchBar } from "./CocktailSearchBar"
import { useParams } from "react-router"

export function CocktailSearchSkeleton(){
  const {cocktailId} = useParams()
  return (
    <div>
      <CocktailSearchToggle/>
      <CocktailSearchBar/>
      <div style={{border:"1px solid white"}}>
        <p>⌛ Loading...</p>
      </div>
      {cocktailId && 
        <div style={{border:"1px solid white"}}>
            <p>⌛ Loading...</p>
        </div>
      }
    </div>
  )
}