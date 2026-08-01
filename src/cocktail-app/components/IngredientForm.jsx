import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import SubmitButton from "/src/shared/components/ui/SubmitButton"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import FadeoutMessage from "/src/shared/components/ui/FadeoutMessage"
import { IngredientCombobox } from "./IngredientCombobox"
import { createIngredient } from "../services/cocktailApi"
import { ingredientSchema } from "../schemas/ingredient.schemas"
import styles from "./IngredientForm.module.css"

export function IngredientForm({ingredient}){
    const {
        control,
        register,
        handleSubmit,
        reset,
        setError,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = useForm({
        resolver:zodResolver(ingredientSchema),
        defaultValues:{
            ingredientName:ingredient ? ingredient.name : "",
            parentId:ingredient ? ingredient.parentId : 0
        },
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    const onSubmit = async (data) => {
        console.log(data)
        try{
            const newIngredient = {
                name: data.ingredientName,
                parentId: data.parentId
            }
            await createIngredient(newIngredient)
        }catch(e){
            setError("root", {message: "Submit failed!"})
            console.error(e)
        }
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.header}>
                <div className={styles.nameField}>
                    <label className={styles.srOnly} htmlFor="ingredientName">Ingredient name</label>
                    <input id="ingredientName" className={styles.nameInput} type="text" placeholder="Name this ingredient" {...register("ingredientName")} />
                    <ErrorMessage error={errors.ingredientName} />
                </div>
            </div>

            <div className={styles.field}>
                <Controller name='parentId' control={control}
                    render={({field: {onChange, value}, fieldState:{error}})=>{
                        return <IngredientCombobox label="Parent ingredient" value={value ?? 0} onChange={onChange} error={error}/>
                    }}
                />
            </div>

            <div className={styles.actions}>
                <SubmitButton isSubmitting={isSubmitting}/>
                <ErrorMessage variant="banner" error={errors.root} />
            </div>

            <FadeoutMessage variant="toast" showFadeout={isSubmitSuccessful}>Ingredient saved</FadeoutMessage>
        </form>
    )
}
