import { List } from "react-window"
import { ComboboxRow } from "/src/shared/components/ComboboxRow";
import { useIngredientCombobox } from "../hooks/useIngredientCombobox"
export function IngredientCombobox({
  value,
  onChange,
  error,
}){
    const {
        isOpen,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
        selectItem,
        items,
        loading,
        noResults
    } = useIngredientCombobox({
        initialId: value || null,
        onChange: onChange,
    })
    
    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
            <span>Selected: {selectedItem?.name}</span>
          <div className="flex shadow-sm bg-white dark:bg-zinc-900 gap-0.5">
            <input
              placeholder={selectedItem ? selectedItem.name : "Search Ingredients..."}
              className="w-full p-1.5"
              {...getInputProps()}
            />
         {loading && <span style={{ marginLeft: '-25px' }}>⏳</span>}
            <button
              aria-label="clear selection"
              className="px-2"
              type="button"
              onClick={() => {
                selectItem(null)
              }}
              tabIndex={-1}
            >
              &#215;
            </button>
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white dark:bg-zinc-900 mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && 'hidden'
          }`}
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
        {error && <span style={{ color: 'red' }}>{error.message}</span>}
      </div>
    )
}

// // Task: Create a Row component that receives index, items, and style as props and renders the item
// // Render a div with the item inside using items[index]
// // Pass the style prop to the div
// function Row({index, items, style}) {
//   return <div style={style}>{items[index]}</div>
// }

// function App() {
//   return (
//     <div>
//       <h1>Virtualization Pattern</h1>
//       <p>Rendering {items.length} items efficiently:</p>

//       {/* Task: Replace the regular list rendering with List component */}
//       <List rowComponent={Row} rowCount={items.length} rowHeight={25} rowProps={{items}}/>
//     </div>
//   );
// }

// export default App;