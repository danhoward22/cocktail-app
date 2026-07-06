import { useMemo, useState } from "react"
import { getClosestFraction, convertUnits } from "../utils/unitUtils"

export function useMeasure(quantity, baseUnits){
    const [units, setUnits] = useState(baseUnits)

    const qty = useMemo(()=>{
        let q = quantity
        if(baseUnits!=units){
            q = convertUnits(quantity,baseUnits,units)
        }
        
        if(units=="mL"){ return Math.round(q * 10) / 10 }
        if(units=="drops"){ return Math.round(q) }

        return getClosestFraction(q)
    },[units])

    return [qty, units, setUnits]
}