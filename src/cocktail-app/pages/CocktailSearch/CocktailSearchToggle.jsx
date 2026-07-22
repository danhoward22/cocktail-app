import styles from "./CocktailSearchToggle.module.css"

export function CocktailSearchToggle({searchBy, setSearchBy}) {

  return (
    <div className={styles.toggle}>
      <label className={styles.option}>
        <input
          type="radio"
          name="searchBy"
          value="name"
          checked={searchBy === 'name'}
          onChange={()=>{setSearchBy('name')}}
          className={styles.input}
        />
        Name
      </label>

      <label className={styles.option}>
        <input
          type="radio"
          name="searchBy"
          value="ingredient"
          checked={searchBy === 'ingredient'}
          onChange={()=>{setSearchBy('ingredient')}}
          className={styles.input}
        />
        Ingredient
      </label>
    </div>
  )
}
