export function ComboboxRow({index, items, style, selectedItem, highlightedIndex, getItemProps}) {
  const item=items[index]

  return( 
    <li styles={style}
        className={`py-2 px-3 shadow-sm flex flex-col text-zinc-900 dark:text-zinc-100 
        ${highlightedIndex === index &&
            'bg-blue-300 !text-black dark:bg-sky-700 dark:!text-white'} 
        ${selectedItem === item &&
            'font-bold !text-black dark:!text-white'}`
        }
        key={item.id}
        {...getItemProps({item, index})}
    >
        <span>{item.name}</span>
    </li>
  )
}

//<li {...getItemProps({item:items[index], index})} style={style}>{items?.[index]?.name}</li>