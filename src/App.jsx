import {createBrowserRouter, RouterProvider} from 'react-router'
import * as reactRouterDom from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react"
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui"
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session"
import Passwordless from 'supertokens-auth-react/recipe/passwordless'
import { PasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/passwordless/prebuiltui'

import { CocktailAppFrame } from './cocktail-app/components/CocktailAppFrame'
import { CocktailHome } from './cocktail-app/pages/CocktailHome/CocktailHome'
import { CocktailSearchPage } from './cocktail-app/pages/CocktailSearch/CocktailSearchPage'
import { CocktailPage } from './cocktail-app/pages/CocktailPage/CocktailPage'
import { AddCocktailPage } from './cocktail-app/pages/AddCocktail/AddCocktailPage'
import { EditCocktailPage } from './cocktail-app/pages/EditCocktail/EditCocktailPage'
import { IngredientSearchPage } from './cocktail-app/pages/IngredientSearch/IngredientSearchPage'
import { AddIngredientPage } from './cocktail-app/pages/AddIngredient/AddIngredientPage'
import { EditIngredientPage } from './cocktail-app/pages/EditIngredient/EditIngredientPage'
import { AdminPage } from './cocktail-app/pages/AdminPage/AdminPage'
import { NotFoundPage } from './NotFoundPage'
import { cocktailListLoader } from './loaders/cocktailListLoader'
import { cocktailLoader } from './loaders/cocktailLoader'
import { ingredientListLoader } from './loaders/ingredientListLoader'
import { ingredientLoader } from './loaders/ingredientLoader'

SuperTokens.init({
  appInfo: {
    appName: "Cocktail App",
    apiDomain: import.meta.env.VITE_API_DOMAIN,
    websiteDomain: import.meta.env.VITE_WEBSITE_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Passwordless.init({contactMethod: "EMAIL_OR_PHONE"}),
    Session.init()
  ],
})

const authRoutes = getSuperTokensRoutesForReactRouterDom(
  reactRouterDom,
  [
    PasswordlessPreBuiltUI,
  ]
)

const queryClient = new QueryClient()

const router = createBrowserRouter([
		...authRoutes.map((r) => r.props),
  {
    path:"/",
    element: <CocktailAppFrame/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true, 
        element: <CocktailHome/>,
      },
      {
        path:"/cocktails",
        element: <CocktailSearchPage/>,
        loader: cocktailListLoader(queryClient),
        children: [
          {
            path:"/cocktails/:cocktailId",
            element: <CocktailPage/>,
            loader: cocktailLoader(queryClient),
          },
          {
            path:"/cocktails/:cocktailId/edit",
            element: 
              <SessionAuth>
                <EditCocktailPage/>
              </SessionAuth>,
            loader: cocktailLoader(queryClient),
          },
        ]
      },
      {
        path:"/new-cocktail",
        element:
          <SessionAuth>
            <AddCocktailPage/>
          </SessionAuth>,
      },
      {
        path:"/ingredients",
        element:<IngredientSearchPage/>,
        loader: ingredientListLoader(queryClient),
        children: [
          {
            path:"/ingredients/:ingredientId/edit",
            element: 
              <SessionAuth>
                <EditIngredientPage/>
              </SessionAuth>,
            loader: ingredientLoader(queryClient),
          },
        ]
      },
      {
        path:"/new-ingredient",
        element:
          <SessionAuth>
            <AddIngredientPage/>
          </SessionAuth>,
      },
      {
        path:"/admin",
        element:
          <SessionAuth>
            <AdminPage/>
          </SessionAuth>,
      },
    ]
  },
])

function App() {
  return (
    <SuperTokensWrapper>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SuperTokensWrapper>
  )
}

export default App
