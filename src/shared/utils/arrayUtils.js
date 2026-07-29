export function arrayContainsSubstring(arr, substr){
  return arr.some(element => element.toLowerCase().includes(substr.toLowerCase()))
}

export function simpleArraysEqual(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
}