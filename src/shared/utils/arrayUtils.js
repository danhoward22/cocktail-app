export function arrayContainsSubstring(arr, substr){
  return arr.some(element => element.toLowerCase().includes(substr.toLowerCase()))
}