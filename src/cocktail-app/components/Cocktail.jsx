import styles from "./Cocktail.module.css"
import { Ingredient } from "./Ingredient"

export function Cocktail({cocktail}){
    return(
        <div className={styles.card}>
            <h1 className={styles.name}>{cocktail.name}</h1>
            
            <ul className={styles.ingredients}>
                {cocktail.ingredients.map((ingredient)=> <Ingredient key={ingredient.id} ingredient={ingredient} />)}
                <li className={styles.garnish}>Garnish{cocktail.garnishes.length > 1 && "es"}: {
                    cocktail.garnishes.map((garnish)=>{
                        return `${garnish.name}${garnish.qty > 1 ? ` x${garnish.qty}` : ""}`
                    }).join(", ")
                }</li>
            </ul>
            <p className={styles.notes}>{cocktail.notes}</p>
            {cocktail.source && <p className={styles.source}>Source: {cocktail.source}</p>}
        </div>
    )
}