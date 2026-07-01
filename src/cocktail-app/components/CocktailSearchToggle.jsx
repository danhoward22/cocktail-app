export function CocktailSearchToggle({searchBy, setSearchBy}) {

  return (
    <div style={{border:"1px solid white"}}>
      <p>Search By: </p>
      <label>
        <input
          type="radio"
          name="searchBy"
          value="name"
          checked={searchBy === 'name'}
          onChange={()=>{setSearchBy('name')}}
        />
        Name
      </label>

      <label>
        <input
          type="radio"
          name="searchBy"
          value="ingredient"
          checked={searchBy === 'ingredient'}
          onChange={()=>{setSearchBy('ingredient')}}
        />
        Ingredient
      </label>
    </div>
  )
}