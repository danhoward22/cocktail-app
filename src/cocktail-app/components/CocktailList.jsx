import { VirtualNavList } from '../../shared/components/VirtualNavList'

export function CocktailList({cocktails}) {
  if(cocktails.length===0){
    return (
      <div style={{border:"1px solid white"}}>
        No cocktails found
      </div>
    )
  }

  return (
    <div style={{border:"1px solid white"}}>
      <VirtualNavList items={cocktails} rowHeight={50} pathPrefix="/cocktails/"/>
    </div>
  )
}