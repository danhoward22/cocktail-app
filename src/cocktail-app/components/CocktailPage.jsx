import { useCocktail } from "../hooks/useCocktail"
import { Cocktail } from "./Cocktail"

export function CocktailPage() {
  const [cocktail, isPending] = useCocktail()

  return (
    <div>
      {isPending ? 
        <p>⌛ Loading...</p> : 
        (cocktail && <Cocktail cocktail={cocktail}/>)}
    </div>
  )
}