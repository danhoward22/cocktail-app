import { use, useState } from "react"
import { IngredientFieldset } from "./IngredientFieldset"
import { IngredientForm } from "./IngredientForm"
import Modal from "/src/shared/components/Modal"
import SubmitButton from "/src/shared/components/ui/SubmitButton"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import CancelButton from "/src/shared/components/ui/CancelButton"
import { useCocktailForm } from "../hooks/useCocktailForm"
import styles from "./CocktailForm.module.css"

export function CocktailForm({cancelPath, cocktailPromise}){
    const cocktail = cocktailPromise ? use(cocktailPromise) : null
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fieldToUpdate, setFieldToUpdate] = useState(null)

    const {
        control,
        register,
        setValue,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        handleCocktailSubmit,
        ingredientFieldArray,
        garnishFieldArray,
    } = useCocktailForm(cocktail)

    const launchModal = (fieldName) => {
        setFieldToUpdate(fieldName)
        setIsModalOpen(true)
    }
    const handleModalClose = ()=>{
        setIsModalOpen(false)
        setFieldToUpdate(null)
    }
    const handleIngredientSubmit = (ingredientId) => {
        setValue(fieldToUpdate, ingredientId)
        handleModalClose()
    }

    return(
        <>
            <form className={styles.form} onSubmit={handleCocktailSubmit} noValidate>
                <div className={styles.nameField}>
                    <label className={styles.srOnly} htmlFor="cocktailName">Cocktail name</label>
                    <input id="cocktailName" className={styles.nameInput} type="text" placeholder="Name this cocktail" {...register("cocktailName")} />
                    <ErrorMessage error={errors.cocktailName} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="source">Source</label>
                    <input id="source" className={styles.input} {...register("source")} type="text" placeholder="Book title, bartender, etc." />
                    <ErrorMessage error={errors.source} />
                </div>

                <IngredientFieldset 
                    control={control}
                    register={register}
                    fieldArray={ingredientFieldArray}
                    errors={errors.ingredients}
                    launchModal={launchModal}
                />

                <IngredientFieldset 
                    control={control}
                    register={register}
                    fieldArray={garnishFieldArray}
                    errors={errors.garnishes}
                    launchModal={launchModal}
                    isGarnish={true}
                />

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="notes">Notes</label>
                    <textarea id="notes" className={styles.textarea} {...register("notes")} placeholder="Enter instructions here..." />
                    <ErrorMessage error={errors.notes} />
                </div>

                <div className={styles.actions}>
                    <SubmitButton isSubmitting={isSubmitting}/>
                    {cancelPath && <CancelButton path={cancelPath}/>}
                    <ErrorMessage variant="banner" error={errors.root} />
                </div>
            </form>
            {isModalOpen && <Modal title="Add an Ingredient" isOpen={isModalOpen} onClose={handleModalClose}>
                <IngredientForm onSubmitSuccess={handleIngredientSubmit}/>
            </Modal>}
        </>
    )
}
