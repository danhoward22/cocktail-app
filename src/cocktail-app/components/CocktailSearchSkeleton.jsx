import { CocktailSearchToggle } from "./CocktailSearchToggle"
import { CocktailSearchBar } from "./CocktailSearchBar"
import { useParams } from "react-router"

export function CocktailSearchSkeleton(){
  const {cocktailId} = useParams()
  return (
    <div>
      <CocktailSearchToggle/>
      <CocktailSearchBar/>
      <div>
        <p>⌛ Loading...</p>
      </div>
      {cocktailId && 
        <div>
            <p>⌛ Loading...</p>
        </div>
      }
    </div>
  )
}