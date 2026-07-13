import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router'
import './index.css'

import {CocktailApp} from './cocktail-app/components/CocktailApp.jsx'
import { CocktailHome } from './cocktail-app/components/CocktailHome.jsx'
import {CocktailSearchPage} from './cocktail-app/components/CocktailSearchPage.jsx'
import {CocktailPage} from './cocktail-app/components/CocktailPage.jsx'
import {NotFoundPage} from './NotFoundPage.jsx'
import { CocktailSearchSkeleton } from './cocktail-app/components/CocktailSearchSkeleton.jsx'

import { fetchCocktailList } from './cocktail-app/utils/cocktailUtils.js'

const router = createBrowserRouter([
  {
    path:"/",
    element: <CocktailApp/>,
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
        element:<h1>Add New Cocktail</h1>,
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
