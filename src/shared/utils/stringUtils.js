export function isNumeric(str) {
  if (typeof str !== 'string') return false; 
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export function normalize(s){
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
