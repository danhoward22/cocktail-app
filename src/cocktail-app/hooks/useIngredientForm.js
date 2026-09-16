import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { createIngredient, updateIngredient } from "../services/cocktailApi"
import { ingredientSchema } from "../schemas/ingredient.schemas"
import { ingredientKeys } from "../queries/ingredientQueries"
import { useRecipeMutation } from "./useRecipeMutation"

export function useIngredientForm(ingredient, onSubmitSuccess){
    const navigate = useNavigate()

    const currentIngredient = ingredient ?
    {
        ingredientId: ingredient.id,
        ingredientName: ingredient.name,
        parentId: ingredient.parentId,
    }
    : {
        ingredientName: "",
        parentId: 0
    }

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = useForm({
        resolver:zodResolver(ingredientSchema),
        values:currentIngredient,
    })

    const {
        createMutation,
        updateMutation
    } = useRecipeMutation(ingredientKeys, createIngredient, updateIngredient)

    const onSubmit = async (data) => {
        console.log(data)
        try{
            const newIngredient = {
                name: data.ingredientName,
                parentId: data.parentId
            }

            if(ingredient){
                console.log(`update ${newIngredient.name} (${ingredient.id}): `, newIngredient)
                await updateMutation({id:ingredient.id, ...newIngredient})
                //navigate(`/ingredients/${ingredient.id}`)
                navigate("/");
            }else{
                console.log("new cocktail: ", newIngredient)
                const {id:newIngredientId} = await createMutation(newIngredient)
                if(onSubmitSuccess){
                    onSubmitSuccess(newIngredientId)
                }else{
                    //navigate(`/ingredients/${newIngredientId}`)
                    navigate("/");
                }
            }
        }catch(err){
            let messages = `Submit failed! - ${err.message}`
            if(err instanceof AggregateError){
                messages += `:\n` + err.errors.map(e => `- ${e.message}`).join("\n")
            }
            setError("root", {message: messages})
            console.error(messages)
        }
    }

    return {
        control,
        register,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        handleIngredientSubmit:handleSubmit(onSubmit)
    }
}