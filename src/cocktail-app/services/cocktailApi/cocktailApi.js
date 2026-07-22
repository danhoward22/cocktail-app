export async function fetchCocktailList(){
//   const response = await fetch(`/api/cocktails/all`);
//   return response.json();
}

export async function fetchCocktail(cocktailId){
//   const response = await fetch(`/api/cocktails/${cocktailId}`);
//   return response.json();

//OR

//   //to do: update to API call. Simulate delay for now.
// //   if (activeController) {
// //     activeController.abort();
// //   }

// //   activeController = new AbortController();

// //   try {
// //     const response = await fetch(`https://example.com{userId}`, {
// //       signal: activeController.signal
// //     });
    
// //     const data = await response.json();
// //     console.log("User data loaded:", data);
// //   } catch (error) {
// //     if (error.name === 'AbortError') {
// //       console.log("Previous request successfully aborted.");
// //     } else {
// //       console.error("Fetch error:", error);
// //     }
// //   }

}

export async function fetchFilteredIngredients(inputValue){
//   const response = await fetch(`/api/ingredients`);
//  set inputValue filter string
//   return response.json();
}
