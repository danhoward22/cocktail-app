import styles from "./SearchBar.module.css"

export function SearchBar({query, setQuery, placeholder="Search..."}) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  )
}
