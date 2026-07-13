import { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router";
import { fetchCocktail } from "../utils/cocktailUtils";

export function useCocktail(){
  const {cocktailId} = useParams()
  const [cocktail, setCocktail] = useState(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const updateCocktail = async () => {
      try {
        startTransition(async () => {
          const data = await fetchCocktail(cocktailId)
          
          //second startTransition required to set state after an await.
          //planned for fix in future version of React.
          startTransition(() => {
            setCocktail(data);
          });
        })
      } catch (error) {
        console.error("Error fetching data:", error);
        setCocktail(null)
      }
    };

    if (cocktailId) { updateCocktail(); }
    
  }, [cocktailId]);

  return [cocktail, isPending]
}