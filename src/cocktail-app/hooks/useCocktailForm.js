import { useNavigate } from "react-router"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cocktailSchema } from "../schemas/cocktail.schemas"
import toast from "react-hot-toast"
import { fractionToDecimal } from "../utils/unitUtils"
import { createCocktail } from "../services/cocktailApi"

export function useCocktailForm(cocktail){
    const navigate = useNavigate()
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

    const onSubmit = async (data) => {
        console.log(data)
        try{
            const newCocktail = {
                name: data.cocktailName,
                notes: data.notes,
                source: data.source,
                ingredients: data.ingredients.map(i => {
                    return { id:i.id, qty:fractionToDecimal(i.qty), units:i.units }
                }),
                garnishes: data.garnishes.map(g => {
                    return { id:g.id, qty:fractionToDecimal(g.qty) }
                })
            }
            if(data.cocktailId){
                //await updateCocktail({id:data.cocktailId, ...newCocktail})
                toast(`${newCocktail.name} recipe updated`)
                navigate(`/cocktails/${data.cocktailId}`)
            }else{
                console.log("new cocktail: ",newCocktail)
                const newCocktailId = await createCocktail(newCocktail)
                toast(`${newCocktail.name} recipe saved`)
                navigate(`/cocktails/${newCocktailId}`)
            }
        }catch(e){
            setError("root", {message: `Submit failed! - ${e.message}`})
            console.error(e)
        }
    }

    return {
        control,
        register,
        setValue,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        ingredientFieldArray,
        garnishFieldArray,
        handleCocktailSubmit: handleSubmit(onSubmit),
    }
}