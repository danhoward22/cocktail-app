export function arrayContainsSubstring(arr, substr){
  return arr.some(element => element.toLowerCase().includes(substr.toLowerCase()))
}

export function simpleArraysEqual(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
}

export function objectIdExists(id, objArray){
  for(const obj of objArray.values()){
    if(obj.id === id){
      return true
    }
  }
  return false
}

export function objectNameExists(name, objArray){
  for(const obj of objArray.values()){
    if(obj.name.toLowerCase() === name.toLowerCase()){
      return true
    }
  }
  return false
}