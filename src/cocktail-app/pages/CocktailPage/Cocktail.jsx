import { useRef, useState, use } from "react"
import { Link } from "react-router"

import { Garnishes } from "./Garnishes"
import { Ingredient } from "./Ingredient"

import styles from "./Cocktail.module.css"

export function Cocktail({cocktailPromise}){
    const cocktail = use(cocktailPromise)

    if(!cocktail){ return(
        <div className={styles.card}>
            <p>Cocktail not found</p>
            <Link to='/cocktails' className={styles.close}>Close</Link>
        </div>
    )}

    const [isScrolled, setIsScrolled] = useState(false)
    const cardRef = useRef(null)

    if (typeof cocktail.name !== "string") {
        console.warn("Cocktail is missing a name:", cocktail);
    }

    if (!Array.isArray(cocktail.ingredients)) {
        console.warn(`Cocktail "${cocktail.name ?? "unknown"}" has malformed ingredients:`, cocktail.ingredients);
    }
    const ingredients = Array.isArray(cocktail.ingredients) ? cocktail.ingredients : [];

    const handleScroll = () => {
        if(cardRef.current){
            setIsScrolled(cardRef.current.scrollTop > 2);
        }
    }

    return(
        <div className={styles.card} ref={cardRef} onScroll={handleScroll}>
            <div className={isScrolled ? `${styles.header} ${styles.sticky}`:styles.header}>
                <h1 className={styles.name}>{cocktail.name ?? "Untitled cocktail"}</h1>
                <Link to={`/cocktails/${cocktail.id}/edit`} className={styles.close}>Edit</Link>
                <Link to='/cocktails' className={styles.close}>Close</Link>
            </div>
            <ul className={styles.ingredients}>
                {ingredients.map((ingredient)=> <Ingredient key={ingredient.id} ingredient={ingredient} />)}
                <Garnishes garnishes={cocktail.garnishes} styles={styles} />
            </ul>
            {cocktail.notes && <p className={styles.notes}>{cocktail.notes}</p>}
            {cocktail.source && <p className={styles.source}>Source: {cocktail.source}</p>}
        </div>
    )
}
