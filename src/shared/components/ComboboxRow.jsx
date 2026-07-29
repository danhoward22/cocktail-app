export function ComboboxRow({index, items, style, selectedItem, highlightedIndex, getItemProps}) {
  const item=items[index]

  return( 
    <li style={style} 
        key={item.id}
        className={
            `item
            ${highlightedIndex === index && 'highlighted'}
            ${selectedItem === item && ' selected'}`
        }
        {...getItemProps({item, index})}
    >
        <span>{item.name}</span>
    </li>
  )
}
