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

//   const showToast = (message) => {
//     const id = Date.now();
    
//     // Add new toast to state
//     setToasts((prev) => [...prev, { id, message }]);

//     // Auto-remove this specific toast after 3000ms
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((toast) => toast.id !== id));
//     }, 3000);
//   };

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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.name}>
                <label>Ingredient Name</label>
                <input type="text" {...register("ingredientName")} />
                <ErrorMessage className={styles.error} error={errors.ingredientName} />
            </div>
            <div className={styles.parent}>
                <Controller name='parentId' control={control}
                    render={({field: {onChange, value}, fieldState:{error}})=>{
                        return <IngredientCombobox label="Parent" value={value ?? 0} onChange={onChange} error={error}/>
                    }}
                />
            </div>
            <SubmitButton isSubmitting={isSubmitting}/>
            <ErrorMessage className={styles.error} error={errors.root} />
            <FadeoutMessage showFadeout={isSubmitSuccessful}>Ingredient Saved!</FadeoutMessage>
        </form>
    )
}
