import { VirtualNavList } from '../../shared/components/VirtualNavList'

export function CocktailList({cocktails}) {
  if(cocktails.length===0){
    return (
      <div>No cocktails found</div>
    )
  }

  const renderItem = (item) => {
    return (
      <>
        <div>{item.name}</div>
        <div>{item.ingredients.join()}</div>
      </>
    )
  }

  return (
    <VirtualNavList items={cocktails} rowHeight={50} renderItem={renderItem} pathPrefix="/cocktails/"/>
  )
}