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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.header}>
                <div className={styles.nameField}>
                    <label className={styles.srOnly} htmlFor="cocktailName">Cocktail name</label>
                    <input id="cocktailName" className={styles.nameInput} type="text" placeholder="Name this cocktail" {...register("cocktailName")} />
                    <ErrorMessage error={errors.cocktailName} />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="source">Source</label>
                <input id="source" className={styles.input} {...register("source")} type="text" placeholder="Book title, bartender, etc." />
                <ErrorMessage error={errors.source} />
            </div>

            <fieldset className={styles.fieldGroup}>
                <legend className={styles.legend}>Ingredients</legend>
                <ul className={styles.rows}>
                    {ingredientFieldArray.fields.map((field, index) => 
                        <IngredientInput key={field.id} index={index} register={register} control={control} remove={ingredientFieldArray.remove} errors={errors.ingredients?.[index]} /> 
                    )}
                </ul>
                <ErrorMessage error={errors.ingredients?.root} />
                <button type="button" className={styles.addRow} onClick={()=>{ingredientFieldArray.append({id:0,qty:"",units:"oz"})}}>+ Add ingredient</button>
            </fieldset>

            <fieldset className={styles.fieldGroup}>
                <legend className={styles.legend}>Garnish</legend>
                <ul className={styles.rows}>
                    {garnishFieldArray.fields.map((field, index) => 
                        <IngredientInput key={field.id} index={index} register={register} control={control} remove={garnishFieldArray.remove} errors={errors.garnishes?.[index]} isGarnish={true} />
                    )}
                </ul>
                <ErrorMessage error={errors.garnishes?.root} />
                <button type="button" className={styles.addRow} onClick={()=>{garnishFieldArray.append({id:0,qty:""})}}>+ Add garnish</button>
            </fieldset>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="notes">Notes</label>
                <textarea id="notes" className={styles.textarea} {...register("notes")} placeholder="Enter instructions here..." />
                <ErrorMessage error={errors.notes} />
            </div>

            <div className={styles.actions}>
                <SubmitButton isSubmitting={isSubmitting}/>
                <ErrorMessage variant="banner" error={errors.root} />
            </div>

            <FadeoutMessage variant="toast" showFadeout={isSubmitSuccessful}>Cocktail saved</FadeoutMessage>
        </form>
    )
}
