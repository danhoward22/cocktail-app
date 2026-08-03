import {createBrowserRouter, RouterProvider} from 'react-router'

import { CocktailAppFrame } from './cocktail-app/components/CocktailAppFrame'
import { CocktailHome } from './cocktail-app/pages/CocktailHome/CocktailHome'
import { CocktailSearchPage } from './cocktail-app/pages/CocktailSearch/CocktailSearchPage'
import {CocktailPage} from './cocktail-app/pages/CocktailPage/CocktailPage'
import { AddCocktailPage } from './cocktail-app/pages/AddCocktail/AddCocktailPage'
import { AddIngredientPage } from './cocktail-app/pages/AddIngredient/AddIngredientPage'
import { NotFoundPage } from './NotFoundPage'
import { cocktailLoader } from './loaders/cocktailLoader'
import { cocktailListLoader } from './loaders/cocktailListLoader'

const router = createBrowserRouter([
  {
    path:"/",
    element: <CocktailAppFrame/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true, 
        element: <CocktailHome/>
      },
      {
        path:"/cocktails",
        element: <CocktailSearchPage/>,
        loader: cocktailListLoader,
        children: [
          {
            path:"/cocktails/:cocktailId",
            element: <CocktailPage/>,
            loader: cocktailLoader,
          },
        ]
      },
      {
        path:"/new-cocktail",
        element:<AddCocktailPage/>,
        children: [
          {
            path:"/new-cocktail/new-ingredient",
            element: <AddIngredientPage/>
          },
        ]
      },
      {
        path:"/new-ingredient",
        element:<AddIngredientPage/>
      },
    ]
  },
])

function App() {

  return <RouterProvider router={router} />
}

export default App
