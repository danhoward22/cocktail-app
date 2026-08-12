import { Controller } from "react-hook-form"

import SubmitButton from "/src/shared/components/ui/SubmitButton"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import { IngredientCombobox } from "./IngredientCombobox"
import { useIngredientForm } from "../hooks/useIngredientForm"

import styles from "./IngredientForm.module.css"

export function IngredientForm({onSubmitSuccess}){

    const {
        control,
        register,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        handleIngredientSubmit,
    } = useIngredientForm(onSubmitSuccess)

    return(
        <form className={styles.form} onSubmit={handleIngredientSubmit} noValidate>
            <div className={styles.nameField}>
                <label className={styles.srOnly} htmlFor="ingredientName">Ingredient name</label>
                <input type="text" id="ingredientName" className={styles.nameInput}
                    placeholder="Name this ingredient" {...register("ingredientName")} />
                <ErrorMessage error={errors.ingredientName} />
            </div>

            <div className={styles.field}>
                <Controller name='parentId' control={control}
                    render={({field: {onChange, value}, fieldState:{error}})=>{
                        return <IngredientCombobox
                            label="Parent ingredient"
                            value={value ?? 0}
                            onChange={onChange}
                            error={error}
                            canDeselect={true}/>
                    }}
                />
            </div>

            <div className={styles.actions}>
                <SubmitButton isSubmitting={isSubmitting}/>
                <ErrorMessage variant="banner" error={errors.root} />
            </div>
        </form>
    )
}
