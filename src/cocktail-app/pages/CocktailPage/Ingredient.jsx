import { UnitSelect } from "../../components/ui/UnitSelect"
import { useMeasure } from "../../hooks/useMeasure"
import styles from "./Ingredient.module.css"

export function Ingredient({ingredient}){
    const [quantity, units, setUnits] = useMeasure(ingredient.qty,ingredient.units)
    const handleUnitChange = (event) => {
        setUnits(event.target.value)
    }

    return (
        <li className={styles.ingredient}>
            <span className={styles.ingredientName}>{ingredient.name}</span>
            <span className={styles.measure}>
                {quantity}
                {units ?
                    <UnitSelect value={units} onChange={handleUnitChange}/>
                    : <span>piece{quantity>1 && "s"}</span>
                }
            </span>
        </li>
    )
}