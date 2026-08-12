import { Controller } from "react-hook-form"
import { IngredientCombobox } from "./IngredientCombobox"
import { MeasureInput } from "./MeasureInput"

import styles from "./IngredientInput.module.css"

export function IngredientInput({index, register, control, remove, errors, launchModal, isGarnish=false}){
    const fieldIndex = `${isGarnish ? "garnishes" : "ingredients"}.${index}`
    const label=`${isGarnish ? "Garnish" : "Ingredient"} ${index+1}`

    return (
        <li className={styles.ingredient}>
            <span className={styles.name}>
                <Controller name={`${fieldIndex}.id`} control={control}
                    render={({field: {onChange, value}, fieldState:{error}})=>{
                        return <IngredientCombobox 
                            label={label} value={value ?? 0}
                            onChange={onChange} error={error}
                            onCreateIngredient={()=>{launchModal(`${fieldIndex}.id`)}}
                        />
                    }}
                />
            </span>
            <MeasureInput fieldIndex={fieldIndex} isGarnish={isGarnish} register={register} errors={errors}/> 
            <button
                type="button"
                className={styles.removeButton}
                onClick={()=>{remove(index)}}
                aria-label={`Remove ${label.toLowerCase()}`}
            >
                &#215;
            </button>
        </li>
    )
}
