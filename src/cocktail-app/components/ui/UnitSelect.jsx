import { forwardRef } from "react"
import { units } from "../../utils/unitUtils"

export const UnitSelect = forwardRef(({isInput=false, ...rest}, ref) => {
    return <select ref={ref} className="unit-select" {...rest}>
        {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
        {isInput && <option key="piece" value="">piece(s)</option>}
    </select>
})
