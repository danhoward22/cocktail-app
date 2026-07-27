import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cocktailSchema } from "../schemas/cocktail-app.schemas"

export function useCocktailForm(cocktail){
    const defaultIngredients = cocktail ? 
        cocktail.ingredients.map((ingredient) => {
            return {id:ingredient.id, qty:ingredient.qty, units:ingredient.units}
        })
        : [{id:"",qty:"", units:"oz"}]
    
    const defaultGarnishes = cocktail ? 
        cocktail.garnishes.map((garnish) => {
            return {id:garnish.id, qty:garnish.qty}
        })
        : []

    const form = useForm({
        resolver:zodResolver(cocktailSchema),
        defaultValues:{
            ingredients: [{id:3, qty:"2", units:"oz"}],//defaultIngredients,
            garnishes: defaultGarnishes,
        },
    })

    //const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    const ingredientFieldArray = useFieldArray({
        control: form.control,
        name: "ingredients",
    });
    const garnishFieldArray = useFieldArray({
        control: form.control,
        name: "garnishes",
    });

    return {...form, ingredientFieldArray, garnishFieldArray }
}