import {createBrowserRouter, RouterProvider} from 'react-router'

import { CocktailAppFrame } from './cocktail-app/components/CocktailAppFrame'
import { CocktailHome } from './cocktail-app/pages/CocktailHome/CocktailHome'
import { CocktailSearchPage } from './cocktail-app/pages/CocktailSearch/CocktailSearchPage'
import { CocktailPage } from './cocktail-app/pages/CocktailPage/CocktailPage'
import { EditCocktailPage } from './cocktail-app/pages/EditCocktail/EditCocktailPage'
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
          {
            path:"/cocktails/:cocktailId/edit",
            element: <EditCocktailPage/>,
            loader: cocktailLoader,
          },
        ]
      },
      {
        path:"/new-cocktail",
        element:<AddCocktailPage/>,
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
