import { units } from "../utils/unitUtils"

export function UnitSelect({value, onChange}){
    return <select className="unit-select" value={value} onChange={onChange}>
        {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
    </select>
}