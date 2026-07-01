import { useState, useDeferredValue } from "react";

export function useDeferredQuery(){
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query)
  return [query, setQuery, deferredQuery]
}