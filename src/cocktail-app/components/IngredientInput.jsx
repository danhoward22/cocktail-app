import { useEffect, useState } from "react"
// import AsyncSelect from "react-select/async"
import { UnitSelect } from "./ui/UnitSelect"
import { fetchFilteredIngredients } from "../services/cocktailApi"
import styles from "./IngredientInput.module.css"

export function IngredientInput({ingredient}){
    const [cocktailId, setCocktailId] = useState(ingredient.id)
    const [qty, setQty] = useState(ingredient.qty==0 ? "" : ingredient.qty)
    const [units, setUnits] = useState(ingredient.units)

    const handleQtyChange = (e) => {
        setQty(e.target.value)
        if(isNaN(e.target.value)) e.target.className = `${styles.qty} ${styles.error}`
        else e.target.className = styles.qty
    }

    return (
        <li className={styles.ingredient}>
            <span className={styles.name}>
                <label>Ingredient</label>
                {/* {<AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={fetchFilteredIngredients}
                    isSearchable={true}
                    isClearable={true}
                    placeholder="Type to filter..."
                    styles={styles}
                    defaultValue={ingredient.id > 0 ? {value: ingredient.id, label:ingredient.name} : null}
                    onChange={(e)=>{e ? setCocktailId(e.value) : setCocktailId(null)}}
                />} */}
            </span>
            <span className={styles.measure}>
                <label>Qty</label>
                <input type="text" className={styles.qty} value={qty} onChange={handleQtyChange}/>
                <UnitSelect value={units} onChange={(e)=>{setUnits(e.target.value)}} isInput={true}/>
            </span>
        </li>
    )
}
// {
//     id: 0,
//     name: "",
//     parents: [],
//     qty: 0,
//     units: ""
// }
