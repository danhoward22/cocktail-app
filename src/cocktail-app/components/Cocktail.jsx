import styles from "./Cocktail.module.css"

export function Cocktail({cocktail}){
    return(
        <div className={styles.card}>
            <h1 className={styles.name}>{cocktail.name}</h1>
            <ul className={styles.ingredients}>
                {cocktail.ingredients.map((ingredient)=>{
                    return (
                        <li className={styles.ingredient}>
                            <span className={styles.ingredientName}>{ingredient.name}</span>
                            <span className={styles.measure}>{ingredient.qty}{ingredient.units}</span>
                        </li>
                    )
                })}
                {cocktail.garnishes.length == 1 && <li className={styles.garnish}>Garnish: {cocktail.garnishes[0]}</li>}
                {cocktail.garnishes.length > 1 && 
                    <li className={styles.garnish}>Garnishes: {cocktail.garnishes.map((garnish)=> garnish ).join(", ")}</li>
                }
            </ul>
            <p className={styles.notes}>{cocktail.notes}</p>
        </div>
    )
}
