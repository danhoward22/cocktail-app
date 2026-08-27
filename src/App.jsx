import {createBrowserRouter, RouterProvider} from 'react-router'
import * as reactRouterDom from "react-router"
import { QueryClientProvider } from '@tanstack/react-query'
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react"
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui"
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session"
import Passwordless from 'supertokens-auth-react/recipe/passwordless'
import { PasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/passwordless/prebuiltui'

import { CocktailAppFrame } from './cocktail-app/components/CocktailAppFrame'
import { CocktailHome } from './cocktail-app/pages/CocktailHome/CocktailHome'
import { CocktailSearchPage } from './cocktail-app/pages/CocktailSearch/CocktailSearchPage'
import { CocktailPage } from './cocktail-app/pages/CocktailPage/CocktailPage'
import { EditCocktailPage } from './cocktail-app/pages/EditCocktail/EditCocktailPage'
import { AddCocktailPage } from './cocktail-app/pages/AddCocktail/AddCocktailPage'
import { AddIngredientPage } from './cocktail-app/pages/AddIngredient/AddIngredientPage'
import { AdminPage } from './cocktail-app/pages/AdminPage/AdminPage'
import { NotFoundPage } from './NotFoundPage'
import { cocktailLoader } from './loaders/cocktailLoader'
import { cocktailListLoader } from './loaders/cocktailListLoader'
import { queryClient } from './queryClient'

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

const router = createBrowserRouter([
		...authRoutes.map((r) => r.props),
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
            element: 
              <SessionAuth>
                <EditCocktailPage/>
              </SessionAuth>,
            loader: cocktailLoader,
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
