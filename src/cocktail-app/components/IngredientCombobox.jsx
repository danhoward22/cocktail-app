import { List } from "react-window"
import { ComboboxRow } from "/src/shared/components/ComboboxRow";
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import { useIngredientCombobox } from "../hooks/useIngredientCombobox"
import styles from "./IngredientCombobox.module.css"

export function IngredientCombobox({value, onChange, error, label, canDeselect, onCreateIngredient}){
  const {
      isOpen,
      getInputProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      items,
      highlightedIndex,
      selectedItem,
      selectItem,
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
        <label className={styles.label} {...getLabelProps()}>
          {label}: {selectedItem?.name ?? (canDeselect && "None")}
          {canDeselect && selectedItem && (
            <button 
              className={styles.deselectButton} 
              aria-label="clear selection" 
              type="button" 
              onClick={() => selectItem(null)}
            >&#215;</button>
          )}
        </label>
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
          {isOpen && noResults && onCreateIngredient &&
            <li className={styles.add} onClick={onCreateIngredient}>Add a New Ingredient</li>
          }
      </ul>
      <ErrorMessage error={error} />
    </div>
  )
}
