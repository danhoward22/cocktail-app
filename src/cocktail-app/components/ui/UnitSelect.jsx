import { units } from "../../utils/unitUtils"

export function UnitSelect({value, onChange, isInput=false}){
    return <select className="unit-select" value={value} onChange={onChange}>
        {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
        {isInput && <option key="piece" value="">piece(s)</option>}
    </select>
}