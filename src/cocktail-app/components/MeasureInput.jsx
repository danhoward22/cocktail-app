import { UnitSelect } from "./ui/UnitSelect"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"

import styles from "./MeasureInput.module.css"

export function MeasureInput({fieldIndex, isGarnish, register, errors}){
    return(
        <span className={styles.measure}>
            <label>Qty</label>
            <input type="text" className={styles.qty} {...register(`${fieldIndex}.qty`)} />
            {isGarnish ?
                <span className={styles.unit}>piece(s)</span> :
                <UnitSelect isInput={true} {...register(`${fieldIndex}.units`)}/>
            }
            <ErrorMessage variant="field" error={errors?.qty} />
            <ErrorMessage variant="field" error={errors?.units} />
        </span>
    )
}
