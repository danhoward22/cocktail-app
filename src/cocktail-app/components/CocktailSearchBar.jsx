export function CocktailSearchBar({query, setQuery}) {
  return (
    <div style={{border:"1px solid white"}}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Cocktails..."
      />
    </div>
  )
}