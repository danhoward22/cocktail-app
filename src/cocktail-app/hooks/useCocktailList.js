import { useState, useTransition } from "react";
import { fetchCocktailList } from "../services/cocktailApi";

export function useCocktailList(){
  const [cocktailList, setCocktailList] = useState(null)
  const [isPending, startTransition] = useTransition()

  try {
    startTransition(async () => {
      const data = await fetchCocktailList()
      
      //second startTransition required to set state after an await.
      //planned for fix in future version of React.
      startTransition(() => {
        setCocktailList(data);
      });
    })
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return [cocktailList, isPending]
}