import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

import { createIngredient } from "../services/cocktailApi"
import { ingredientSchema } from "../schemas/ingredient.schemas"

export function useIngredientForm(onSubmitSuccess){
    const navigate = useNavigate()

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = useForm({
        resolver:zodResolver(ingredientSchema),
        defaultValues:{
            ingredientName:"",
            parentId:0
        },
    })

    const onSubmit = async (data) => {
        console.log(data)
        try{
            const newIngredient = {
                name: data.ingredientName,
                parentId: data.parentId
            }
            const newIngredientId = await createIngredient(newIngredient)
            toast(`Ingredient ${data.ingredientName} created`)
            if(onSubmitSuccess){
                onSubmitSuccess(newIngredientId)
            }else{
                navigate("/");
            }
        }catch(e){
            setError("root", {message: `Submit failed! - ${e.message}`})
            console.error(e)
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