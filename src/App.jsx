import {createBrowserRouter, RouterProvider} from 'react-router'
import * as reactRouterDom from "react-router";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui'
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

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

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/references/frontend-sdks/reference#sdk-configuration
    appName: "Cocktail App",
    apiDomain: import.meta.env.VITE_API_DOMAIN,
    websiteDomain: import.meta.env.VITE_WEBSITE_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

const authRoutes = getSuperTokensRoutesForReactRouterDom(
  reactRouterDom,
  [
    EmailPasswordPreBuiltUI,
    /* Add your UI recipes here e.g. EmailPasswordPrebuiltUI, PasswordlessPrebuiltUI, ThirdPartyPrebuiltUI */
  ]
);

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
    ]
  },
])

function App() {
  return (
    <SuperTokensWrapper>
      <RouterProvider router={router} />
    </SuperTokensWrapper>
  )
}

export default App
