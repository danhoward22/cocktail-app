import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { IngredientForm } from "../../components/IngredientForm"
import { Loading } from "/src/shared/components/Loading"
import { ErrorOutlet } from "/src/shared/components/ErrorOutlet"
import { ingredientQueryOptions } from "../../queries/ingredientQueries"
//import styles from "./EditIngredientPage.module.css"

export function EditIngredientPage() {
  const {ingredientId} = useParams()
  const {
    data: ingredient,
    isLoading,
    isError,
    error
  } = useQuery(ingredientQueryOptions(ingredientId))
  const cancelPath = `/ingredients`

  if (isLoading) return <Loading message="Loading Ingredient..." variant="secondary"/>
  if (isError) return <ErrorOutlet message={error ? error.message : "Ingredient not found"} cancelPath={cancelPath}/>

  return <IngredientForm cancelPath={cancelPath} ingredient={ingredient} />
}