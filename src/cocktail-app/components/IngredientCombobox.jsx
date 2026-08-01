import { List } from "react-window"
import { ComboboxRow } from "/src/shared/components/ComboboxRow";
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import { useIngredientCombobox } from "../hooks/useIngredientCombobox"
import styles from "./IngredientCombobox.module.css"

export function IngredientCombobox({
  value,
  onChange,
  error,
  label,
}){
  const {
      isOpen,
      getInputProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      items,
      highlightedIndex,
      selectedItem,
      setInputValue,
      loading,
      noResults
  } = useIngredientCombobox({
      initialId: value || null,
      onChange: onChange,
  })

  const menuOpen = isOpen && (items.length > 0 || noResults)

  return (
    <div className={styles.combobox}>
      <div>
        <label className={styles.label} {...getLabelProps()}>{label}: {selectedItem?.name}</label>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            placeholder={"Search Ingredients..."}
            {...getInputProps()}
          />
          {loading && <span className={styles.spinner}>⏳</span>}
          <button
            className={styles.clearButton}
            aria-label="clear input"
            type="button"
            onClick={() => {
              setInputValue("")
            }}
            tabIndex={-1}
          >
            &#215;
          </button>
        </div>
      </div>
      <ul
        className={menuOpen ? styles.menu : `${styles.menu} ${styles.menuHidden}`}
        {...getMenuProps()}
      >
          {isOpen &&
              <List rowComponent={ComboboxRow}
                rowCount={items.length} 
                rowHeight={25} 
                rowProps={{items, selectedItem, highlightedIndex, getItemProps}}
              />
          }
          {isOpen && noResults && <li className={styles.noResults}>No matching ingredients</li>}
      </ul>
      <ErrorMessage error={error} />
    </div>
  )
}
