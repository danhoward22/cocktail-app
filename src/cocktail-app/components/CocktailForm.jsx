import { useState } from "react"
import { IngredientInput } from "../pages/AddCocktail/IngredientInput"
import { getDefaultIngredient } from "../utils/cocktailUtils"
import styles from "./CocktailForm.module.css"

export function CocktailForm({cocktail}){
    const [name, setName] = useState(cocktail.name)
    const [ingredientList, setIngredientList] = useState(cocktail.ingredients)
    
    return(
        <div className={styles.card}>
            <div className={styles.header}>
                <label>Name</label>
                <input type="text" className={styles.name} value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <ul className={styles.ingredients}>
                {ingredientList.map((ingredient)=> <IngredientInput key={ingredient.id} ingredient={ingredient} />)}
                <IngredientInput key="0" ingredient={getDefaultIngredient()} />
            </ul>
            <ul className={styles.garnishes}>
                {/*To Do: Garnishes*/}
            </ul>
            {cocktail.notes && <p className={styles.notes}>{cocktail.notes}</p>}
            {cocktail.source && <p className={styles.source}>Source: {cocktail.source}</p>}
        </div>
    )
}