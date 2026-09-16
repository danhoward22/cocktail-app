import { VirtualNavList } from '/src/shared/components/VirtualNavList'
import styles from './IngredientList.module.css'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export function IngredientList({ingredients}) {
  const {doesSessionExist} = useSessionContext()
  if(ingredients.length===0){
    return (
      <div className={styles.list}>
        <div className={styles.empty}>No ingredients found</div>
      </div>
    )
  }

  const renderItem = (item) => {
    return (
      <div className={styles.itemName}>
        {item.name}
      </div>
    )
  }
  
  const renderPath = (id) => (`/ingredients/${id}/edit`)

  return (
    <div className={styles.list}>
      <VirtualNavList
        items={ingredients} rowHeight={56} rowClassName={styles.link}
        renderItem={renderItem} renderPath={renderPath}
        disableLinks={!doesSessionExist}
      />
    </div>
  )
}