import { useState, useEffect, useRef } from "react";
import { useCombobox } from "downshift";

import { fetchIngredient, fetchFilteredIngredients } from "../services/cocktailApi";

export function useIngredientCombobox({initialId, onChange}){
  const [inputValue, setInputValue] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const isSelectingRef = useRef(false)

    const combobox = useCombobox({
        inputValue,
        onInputValueChange({ inputValue: newInputValue }) {
          setInputValue(newInputValue || '');
        },
        items,
        itemToString(item) {
            return item ? item.name : ''
        },
        selectedItem,
        onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
          setSelectedItem(newSelectedItem || null)
          onChange(newSelectedItem?.id || 0)
        },
        onStateChange: ({ type }) => {
          if (
            type === useCombobox.stateChangeTypes.ItemClick ||
            type === useCombobox.stateChangeTypes.InputKeyDownEnter
          ) {
            isSelectingRef.current = true
          }
        },
    })

    useEffect(() => {
      let active = true

      async function loadInitialData() {
        if(!initialId) {
          setSelectedItem(null)
          setInputValue("")
          return
        }
        try{
          const ingredient = await fetchIngredient(initialId)
          if(active && ingredient){
            setSelectedItem(ingredient);
            setInputValue(ingredient.name || "")
          }
        }catch(e){
          console.error(`Failed to load ingredient ID ${initialId}: `,e)
        }
      }

      loadInitialData();
      return () => {active=false}
    },[initialId])

    useEffect(() => {
      if (isSelectingRef.current) {
        isSelectingRef.current = false
        return
      }
      if (!inputValue) {
        setItems([])
        setLoading(false)
        return
      }

      let active = true
      setLoading(true)

      const timer = setTimeout(async () => {
        try {
          const response = await fetchFilteredIngredients(inputValue)
          if(active) setItems(response || []);
        } catch (error) {
          console.error('Fetch failed:', error);
        } finally {
          if(active) setLoading(false);
        }
      }, 300);

      return () => {
        active=false
        clearTimeout(timer);
      }
    }, [inputValue]);

    const noResults = items.length === 0 && !loading && !!inputValue;

    return {...combobox, items, loading, noResults}
}
