import { UnitSelect } from "./UnitSelect"
import { useMeasure } from "../hooks/useMeasure"
import styles from "./Ingredient.module.css"

export function Ingredient({ingredient}){
    const [quantity, units, setUnits] = useMeasure(ingredient.qty,ingredient.units)
    const handleUnitChage = (event) => {
        setUnits(event.target.value)
    }

    return (
        <li className={styles.ingredient}>
            <span className={styles.ingredientName}>{ingredient.name}</span>
            <span className={styles.measure}>
                {quantity}
                {units ?
                    <UnitSelect value={units} onChange={handleUnitChage}/>
                    : <span>piece{quantity>1 && "s"}</span>
                }
            </span>
        </li>
    )
}