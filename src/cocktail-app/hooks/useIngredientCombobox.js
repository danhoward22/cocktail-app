import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCombobox } from "downshift";

import { useDebouncedValue } from "/src/shared/hooks/useDebouncedValue";
import { ingredientQueryOptions, ingredientSearchQueryOptions } from "../queries/ingredientQueries"

export function useIngredientCombobox({initialId, onChange}){
  const [filterValue, setFilterValue] = useState('')
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const skipSearchRef = useRef()
  const debouncedValue = useDebouncedValue(filterValue)
  
  const {
    isLoading:initialIsLoading,
    data: initialIngredient,
  } = useQuery(ingredientQueryOptions(initialId, skipSearchRef.current===undefined))

  const {
    data: items = [],
    isLoading,
    isSuccess,
  } = useQuery(ingredientSearchQueryOptions(debouncedValue, debouncedValue !== skipSearchRef.current))

  const combobox = useCombobox({
    inputValue: filterValue,
    onInputValueChange({ inputValue }) {
      setFilterValue(inputValue || '')
    },
    items,
    itemToString(item) {
      return item?.name ?? ''
    },
    selectedItem: selectedIngredient,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedIngredient(selectedItem || null)
      onChange(selectedItem?.id || 0)
      skipSearchRef.current = selectedItem?.name ?? null
    },
  })

  //sets the initial ingredient
  useEffect(() => {
    if (!initialId) {
      setSelectedIngredient(null)
      setFilterValue("")
    }else if (initialIngredient) {
      setSelectedIngredient(initialIngredient)
      setFilterValue(initialIngredient.name || "")
      skipSearchRef.current = initialIngredient.name
    }
  }, [initialIngredient, initialId])

  const noResults = !isLoading && isSuccess && items.length === 0

  return {...combobox, items, loading: isLoading || initialIsLoading, noResults}
}
