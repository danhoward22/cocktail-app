import { VirtualNavList } from '/src/shared/components/VirtualNavList'
import styles from './CocktailList.module.css'

export function CocktailList({cocktails}) {
  if(cocktails.length===0){
    return (
      <div className={styles.list}>
        <div className={styles.empty}>No cocktails found</div>
      </div>
    )
  }

  const renderItem = (item) => {
    return (
      <>
        <div className={styles.itemName}>
          {item.name}
          {item.source && <span className={styles.itemSource}>{item.source}</span>}
        </div>
        <div className={styles.itemIngredients}>
          {[
            ...item.ingredients.map((i) => i.name),
            ...item.garnishes.map((g) => g.name)
          ].join(", ")}
        </div>
      </>
    )
  }
  
  const renderPath = (id) => (`/cocktails/${id}`)

  return (
    <div className={styles.list}>
      <VirtualNavList items={cocktails} rowHeight={56} rowClassName={styles.link}
        renderItem={renderItem} renderPath={renderPath}
      />
    </div>
  )
}
