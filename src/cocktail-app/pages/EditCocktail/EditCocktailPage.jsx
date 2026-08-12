import { useLoaderData } from "react-router"
import { CocktailForm } from "../../components/CocktailForm"
import styles from "./EditCocktailPage.module.css"

export function EditCocktailPage() {
  const { cocktailPromise, cocktailId } = useLoaderData()
  const cancelPath = `/cocktails/${cocktailId}`

  return (
      <CocktailForm cancelPath={cancelPath} cocktailPromise={cocktailPromise} />
  )
}
