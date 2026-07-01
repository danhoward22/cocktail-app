export function Cocktail({cocktail}){
    return(
        <>
            <h1>{cocktail.name}</h1>
            <ul>
                {cocktail.ingredients.map((ingredient)=>{
                    return <li>{ingredient.name} {ingredient.qty}{ingredient.units}</li>
                })}
                {cocktail.garnishes.length == 1 && <li>Garnish: {cocktail.garnishes[0]}</li>}
                {cocktail.garnishes.length > 1 && 
                    <li>Garnishes: {cocktail.garnishes.map((garnish)=> garnish ).join(", ")}</li>
                }
            </ul>
            <p>{cocktail.notes}</p>
        </>
    )
}