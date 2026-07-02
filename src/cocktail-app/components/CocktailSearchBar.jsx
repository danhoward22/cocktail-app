export function CocktailSearchBar({query, setQuery}) {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Cocktails..."
      />
    </div>
  )
}