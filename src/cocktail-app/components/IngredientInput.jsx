import { Controller } from "react-hook-form"
import { IngredientCombobox } from "./IngredientCombobox"
import { MeasureInput } from "./MeasureInput"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"

import styles from "./IngredientInput.module.css"

export function IngredientInput({index, register, control, remove, errors, isGarnish=false}){
    const fieldIndex = `${isGarnish ? "garnishes" : "ingredients"}.${index}`

    return (
        <li className={styles.ingredient}>
            <span className={styles.name}>
                <Controller name={`${fieldIndex}.id`} control={control}
                    render={({field: {onChange, value}, fieldState:{error}})=>(
                        <IngredientCombobox value={value ?? ""} onChange={onChange} error={error}/>
                    )}
                />
            </span>
            <MeasureInput fieldIndex={fieldIndex} isGarnish={isGarnish} register={register} errors={errors}/> 
            <button type="button" onClick={()=>{remove(fieldIndex)}}>Remove</button>
        </li>
    )
}
// {
//     id: 0,
//     name: "",
//     parents: [],
//     qty: 0,
//     units: ""
// }


// import { Controller } from 'react-hook-form';
// import { useSelect } from 'downshift';

// function CustomThreeInputRow({ index, register, control, onRemove }) {
//   const items = ['Admin', 'Editor', 'Viewer']; // Example selection options

//   return (
//     <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      
//       {/* Input 1: Native HTML */}
//       <input 
//         {...register(`items.${index}.firstName`)} 
//         placeholder="First Name" 
//       />

//       {/* Input 2: Native HTML */}
//       <input 
//         {...register(`items.${index}.lastName`)} 
//         placeholder="Last Name" 
//       />

//       {/* Input 3: Controlled Custom Downshift Select List */}
//       <Controller
//         name={`items.${index}.role`}
//         control={control}
//         render={({ field: { onChange, value } }) => {
//           // Initialize Downshift inside the Controller render scope
//           const {
//             isOpen,
//             getToggleButtonProps,
//             getMenuProps,
//             getItemProps,
//             highlightedIndex,
//           } = useSelect({
//             items,
//             selectedItem: value || null,
//             // Crucial: Update React Hook Form when a selection happens
//             onSelectedItemChange: ({ selectedItem }) => {
//               onChange(selectedItem);
//             },
//           });

//           return (
//             <div style={{ position: 'relative', width: '150px' }}>
//               {/* Trigger Button */}
//               <button type="button" {...getToggleButtonProps()}>
//                 {value || 'Select Role'}
//               </button>

//               {/* Selection Menu */}
//               <ul {...getMenuProps()} style={{ 
//                 display: isOpen ? 'block' : 'none', 
//                 position: 'absolute', 
//                 backgroundColor: 'white',
//                 border: '1px solid #ccc',
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0,
//                 width: '100%',
//                 zIndex: 10
//               }}>
//                 {isOpen &&
//                   items.map((item, itemIndex) => (
//                     <li
//                       style={{
//                         backgroundColor: highlightedIndex === itemIndex ? '#bde4ff' : 'white',
//                         padding: '4px 8px',
//                         cursor: 'pointer',
//                       }}
//                       key={`${item}${itemIndex}`}
//                       {...getItemProps({ item, index: itemIndex })}
//                     >
//                       {item}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           );
//         }}
//       />

//       <button type="button" onClick={onRemove}>Delete Row</button>
//     </div>
//   );
// }
