import { Link } from "react-router"

export function CocktailApp() {
  return (
    <div>
      <h1>Cocktail App Home Page</h1>
      <Link to="/cocktails">Search Cocktails</Link>
    </div>
  )
}