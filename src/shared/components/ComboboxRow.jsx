import styles from "./ComboboxRow.module.css"

export function ComboboxRow({index, items, style, selectedItem, highlightedIndex, getItemProps}) {
  const item = items[index]

  const classes = [
    styles.item,
    highlightedIndex === index && styles.highlighted,
    selectedItem === item && styles.selected,
  ].filter(Boolean).join(" ")

  return(
    <li style={style}
        key={item.id}
        className={classes}
        {...getItemProps({item, index})}
    >
        <span>{item.name}</span>
    </li>
  )
}
