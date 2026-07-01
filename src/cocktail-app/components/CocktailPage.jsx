import { useCocktail } from "../hooks/useCocktail"
import { Cocktail } from "./Cocktail"

export function CocktailPage() {
  const [cocktail, isPending] = useCocktail()

  return (
    <div style={{border:"1px solid white"}}>
      {isPending ? 
        <p>⌛ Loading...</p> : 
        (cocktail && <Cocktail cocktail={cocktail}/>)}
    </div>
  )
}