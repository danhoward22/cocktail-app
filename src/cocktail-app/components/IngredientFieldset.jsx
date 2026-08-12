import { IngredientInput } from "./IngredientInput"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import styles from "./IngredientFieldset.module.css"

export function IngredientFieldset({control, register, fieldArray, errors, launchModal, isGarnish}){
    const append = ()=>{
        fieldArray.append(
            isGarnish ? {id:0,qty:""} : {id:0,qty:"",units:"oz"}
        )
    }
    return(
        <fieldset className={styles.fieldGroup}>
            <legend className={styles.legend}>
                {isGarnish ? 'Garnishes' : 'Ingredients'}
            </legend>
            <ul className={styles.rows}>
                {fieldArray.fields.map((field, index) => 
                    <IngredientInput
                        key={field.id}
                        index={index}
                        register={register}
                        control={control}
                        remove={fieldArray.remove}
                        errors={errors?.[index]}
                        launchModal={launchModal}
                        isGarnish={isGarnish}
                    />
                )}
            </ul>
            <ErrorMessage error={errors?.root} />
            <button type="button" className={styles.addRow} onClick={append}>
                + Add {isGarnish ? 'garnish' : 'ingredient'}
            </button>
        </fieldset>
    )
}