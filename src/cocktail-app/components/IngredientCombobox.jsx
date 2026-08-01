import { List } from "react-window"
import { ComboboxRow } from "/src/shared/components/ComboboxRow";
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import { useIngredientCombobox } from "../hooks/useIngredientCombobox"
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
  
  return (
    <div>
      <div>
        <label {...getLabelProps()}>{label}: {selectedItem?.name}</label>
        <div>
          <input
            placeholder={"Search Ingredients..."}
            {...getInputProps()}
          />
          {loading && <span style={{ marginLeft: '-25px' }}>⏳</span>}
          <button
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
        className={(isOpen && items.length) ? undefined : 'hidden'}
        {...getMenuProps()}
      >
          {isOpen &&
              <List rowComponent={ComboboxRow}
                rowCount={items.length} 
                rowHeight={25} 
                rowProps={{items, selectedItem, highlightedIndex, getItemProps}}
              />
          }
          {isOpen && noResults && <li>No matching ingredients</li>}
      </ul>
      <ErrorMessage error={error} />
    </div>
  )
}
