import styles from "./CocktailSearchBar.module.css"

export function CocktailSearchBar({query, setQuery}) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Cocktails..."
        className={styles.input}
      />
    </div>
  )
}
