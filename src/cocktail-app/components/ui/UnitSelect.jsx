import { forwardRef } from "react"
import { units } from "../../utils/unitUtils"
import styles from "./UnitSelect.module.css"

export const UnitSelect = forwardRef(({isInput=false, className, ...rest}, ref) => {
    const classes = className ? `${styles.select} ${className}` : styles.select
    return <select ref={ref} className={classes} {...rest}>
        {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
        {isInput && <option key="piece" value="">piece(s)</option>}
    </select>
})
