import { useEffect } from "react"
import { IngredientInput } from "./IngredientInput"
import SubmitButton from "/src/shared/components/ui/SubmitButton"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import FadeoutMessage from "/src/shared/components/ui/FadeoutMessage"
import { useCocktailForm } from "../hooks/useCocktailForm"
import { fractionToDecimal } from "../utils/unitUtils"
import { createCocktail } from "../services/cocktailApi"
import styles from "./CocktailForm.module.css"

export function CocktailForm({cocktail}){

    const {
        control,
        register,
        handleSubmit,
        reset,
        setError,
        ingredientFieldArray,
        garnishFieldArray,
        formState: {errors,isSubmitting,isSubmitSuccessful}
    } = useCocktailForm(cocktail)

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset()
        }
    },[isSubmitSuccessful,reset])

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
            await createCocktail(newCocktail)
        }catch(e){
            setError("root", {message: "Submit failed!"})
            console.error(e)
        }
    }
    
    return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.name}>
                <label>Cocktail Name</label>
                <input type="text" {...register("cocktailName")} />
                <ErrorMessage className={styles.error} error={errors.cocktailName} />
            </div>
            <div className={styles.source}>
                <label>Source</label>
                <input {...register("source")} type="text" placeholder="book title, bartender, etc." />
                <ErrorMessage className={styles.error} error={errors.source} />
            </div>
            <div className={styles.ingredients}>
                <label>Ingredients</label>
                <ul>
                    {ingredientFieldArray.fields.map((field, index) => 
                        <IngredientInput key={field.id} index={index} register={register} control={control} remove={ingredientFieldArray.remove} errors={errors.ingredients?.[index]} /> 
                    )}
                </ul>
                <ErrorMessage className={styles.error} error={errors.ingredients?.root} />
                <button type="button" onClick={()=>{ingredientFieldArray.append({id:0,qty:"",units:"oz"})}}>Add Ingredient</button>
            </div>
            <div className={styles.garnishes}>
                <label>Garnishes</label>
                <ul>
                    {garnishFieldArray.fields.map((field, index) => 
                        <IngredientInput key={field.id} index={index} register={register} control={control} remove={garnishFieldArray.remove} errors={errors.garnishes?.[index]} isGarnish={true} />
                    )}
                </ul>
                <ErrorMessage className={styles.error} error={errors.garnishes?.root} />
                <button type="button" onClick={()=>{garnishFieldArray.append({id:0,qty:""})}}>Add Garnish</button>
            </div>
            <div className={styles.notes}>
                <label>Notes</label>
                <textarea {...register("notes")} placeholder="Enter instructions here..." />
                <ErrorMessage className={styles.error} error={errors.notes} />
            </div>
            <SubmitButton isSubmitting={isSubmitting}/>
            <ErrorMessage className={styles.error} error={errors.root} />
            <FadeoutMessage showFadeout={isSubmitSuccessful}>Cocktail Saved!</FadeoutMessage>
        </form>
    )
}
