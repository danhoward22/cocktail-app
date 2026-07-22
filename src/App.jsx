import {createBrowserRouter, RouterProvider} from 'react-router'

import { CocktailAppFrame } from './cocktail-app/components/CocktailAppFrame.jsx'
import { CocktailHome } from './cocktail-app/pages/CocktailHome/CocktailHome.jsx'
import { CocktailSearchPage } from './cocktail-app/pages/CocktailSearch/CocktailSearchPage.jsx'
import {CocktailPage} from './cocktail-app/pages/CocktailPage/CocktailPage.jsx'
import { AddCocktailPage } from './cocktail-app/pages/AddCocktail/AddCocktailPage.jsx'
import { NotFoundPage } from './NotFoundPage.jsx'
import { CocktailSearchSkeleton } from './cocktail-app/pages/CocktailSearch/CocktailSearchSkeleton.jsx'
import { fetchCocktailList } from './cocktail-app/services/cocktailApi'

const router = createBrowserRouter([
  {
    path:"/",
    element: <CocktailAppFrame/>,
    errorElement: <NotFoundPage/>,
    children: [
      { 
        index: true, 
        element: <CocktailHome />
      },
      {
        path:"/cocktails",
        element: <CocktailSearchPage/>,
        loader: fetchCocktailList,
        hydrateFallbackElement:<CocktailSearchSkeleton/>,
        children: [
          {
            path:"/cocktails/:cocktailId",
            element: <CocktailPage/>
          },
        ]
      },
      {
        path:"/cocktails/new-cocktail",
        element:<AddCocktailPage/>,
        children: [
          {
            path:"/cocktails/new-cocktail/new-ingredient",
            element: <h1>Add New Ingredient</h1>
          },
        ]
      },
      {
        path:"/cocktails/new-ingredient",
        element:<h1>Add New Ingredient</h1>
      },
    ]
  },
])

function App() {

  return <RouterProvider router={router} />
}

export default App
