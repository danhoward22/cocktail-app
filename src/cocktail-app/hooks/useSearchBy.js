import { useState } from "react";

export function useSearchBy() {
  const [type, setType] = useState("name");
  const setSearchBy = (searchBy) => {
    switch(searchBy){
      case "name":
      case "ingredient":
        setType(searchBy);
        break;
      default: break;
    }
  }
  return [type, setSearchBy];
}