import { useRef } from "react"
import { useNavigate } from "react-router"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { createCocktail, updateCocktail } from "../services/cocktailApi"
import { cocktailSchema } from "../schemas/cocktail.schemas"
import { fractionToDecimal } from "../utils/unitUtils"
import { cocktailKeys } from "../queries/cocktailQueries"

export function useCocktailForm(cocktail){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const persistToastId = useRef()

    const defaultCocktail = cocktail ?
        {
            cocktailId: cocktail.id,
            cocktailName: cocktail.name,
            source: cocktail.source, 
            notes: cocktail.notes
        }
        : {cocktailName:"", sources:"", notes:""}

    const defaultIngredients = cocktail ? 
        cocktail.ingredients.map((ingredient) => {
            return {id:ingredient.id, qty:ingredient.qty, units:ingredient.units}
        })
        : [{id:0, qty:"", units:"oz"}]
    
    const defaultGarnishes = cocktail ? 
        cocktail.garnishes.map((garnish) => {
            return {id:garnish.id, qty:garnish.qty}
        })
        : []

    const {
        control,
        register,
        setValue,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = useForm({
        resolver:zodResolver(cocktailSchema),
        defaultValues:{
            ...defaultCocktail,
            ingredients: defaultIngredients,
            garnishes: defaultGarnishes,
        },
    })

    //const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    const ingredientFieldArray = useFieldArray({
        control: control,
        name: "ingredients",
    });
    const garnishFieldArray = useFieldArray({
        control: control,
        name: "garnishes",
    });

    function clearPersistentToast(){
        if(persistToastId.current){
            toast.dismiss(persistToastId.current)
            persistToastId.current = null
        }
    }

    const {mutateAsync: createMutation } = useMutation({
        mutationFn: createCocktail,
        onMutate: () => {
            persistToastId.current = toast("Saving...", { duration: 3000 })
        },
        onSuccess: (result) => {
            queryClient.setQueryData(cocktailKeys.detail(result.id), result)
            queryClient.invalidateQueries({ queryKey: cocktailKeys.lists() })
            toast.success(`${result.name} saved!`)
        },
        onError: (error, variables) => {
            toast.error(`${variables.name} failed to save: ${error.message}`)
        },
        onSettled: () => {
            clearPersistentToast()
        }
    })

    const {mutateAsync: updateMutation } = useMutation({
        mutationFn: (newCocktail) => updateCocktail(newCocktail),
        onMutate: () => {
            persistToastId.current = toast("Saving...", { duration: 5000 })
        },
        onSuccess: (result) => {
            queryClient.setQueryData(cocktailKeys.detail(result.id), result)
            //queryClient.invalidateQueries({ queryKey: cocktailKeys.detail(result.id) })
            queryClient.invalidateQueries({ queryKey: cocktailKeys.lists() })
            toast.success(`${result.name} saved!`)
        },
        onError: (error, variables) => {
            toast.error(`${variables.name} failed to update: ${error.message}`)
        },
        onSettled: () => {
            clearPersistentToast()
        }
    })

    const onSubmit = async (data) => {
        try{
            const newCocktail = {
                name: data.cocktailName,
                notes: data.notes,
                source: data.source,
                ingredients: data.ingredients.map(i => {
                    return { id:i.id, qty:fractionToDecimal(i.qty), units:i.units }
                }),
                garnishes: data.garnishes.map(g => {
                    return { id:g.id, qty:fractionToDecimal(g.qty), units:"" }
                })
            }

            if(cocktail){
                console.log(`update ${newCocktail.name} (${cocktail.id}): `, newCocktail)
                await updateMutation({id:cocktail.id, ...newCocktail})
                navigate(`/cocktails/${cocktail.id}`)
            }else{
                console.log("new cocktail: ", newCocktail)
                const newCocktailId = await createMutation(newCocktail)
                navigate(`/cocktails/${newCocktailId}`)
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
        setValue,
        errors,
        isSubmitting: isSubmitting || createMutation.isPending || updateMutation.isPending,
        isSubmitSuccessful,
        ingredientFieldArray,
        garnishFieldArray,
        handleCocktailSubmit: handleSubmit(onSubmit),
    }
}