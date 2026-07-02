import { VirtualNavList } from '../../shared/components/VirtualNavList'
import styles from './CocktailList.module.css'

export function CocktailList({cocktails}) {
  if(cocktails.length===0){
    return (
      <div className={styles.empty}>No cocktails found</div>
    )
  }

  const renderItem = (item) => {
    return (
      <>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.itemIngredients}>{item.ingredients.join(", ")}</div>
      </>
    )
  }

  return (
    <div className={styles.list}>
      <VirtualNavList items={cocktails} rowHeight={56} renderItem={renderItem} pathPrefix="/cocktails/"/>
    </div>
  )
}
