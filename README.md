# Cocktail App

A React app for browsing classic cocktail recipes: search by name or by ingredient, then pull up a recipe with measures, garnish, and notes.

## Stack

- **React 19** + **Vite** — build tooling and dev server
- **react-router** — routing, data loading (`loader`), and nested routes
- **react-window** — virtualized list rendering for the search results
- **fraction.js** — converts decimal quantities to clean fractions (e.g. `0.5 oz` → `½ oz`)
- **CSS Modules** — scoped, component-level styling (no CSS-in-JS, no inline styles)

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
  cocktail-app/
    components/     # Cocktail search, list, recipe card, ingredient row, unit select, search toggle, search bar
    hooks/           # useCocktail, useCocktailList, useSearchBy, useMeasure
    utils/           # cocktail data, fetch/filter helpers, unit conversion
  shared/
    components/      # VirtualNavList, NavRow — generic virtualized nav list
    hooks/            # useDeferredQuery
    utils/            # arrayUtils
  index.css           # design tokens (colors, type, spacing) + global resets
  main.jsx            # router setup
```

Each component that needs styling has a co-located `Component.module.css` file, imported directly into its `.jsx` file. Shared design tokens (colors, fonts, radii) live as CSS custom properties in `src/index.css` and are referenced from every module.

## Routes

| Path                         | Renders                                      |
|-------------------------------|-----------------------------------------------|
| `/`                            | Home page                                      |
| `/cocktails`                   | Search page (loads the full cocktail list)     |
| `/cocktails/:cocktailId`       | Recipe detail, nested inside the search page   |
| `/cocktails/new-cocktail`      | Placeholder                                    |
| `/cocktails/new-ingredient`    | Placeholder                                    |

## Data

Cocktail data currently lives in `src/cocktail-app/utils/cocktailUtils.js` as an in-memory array, with `fetchCocktailList` and `fetchCocktail` simulating network latency. Swapping these for real API calls shouldn't require changes elsewhere, since components only depend on the shape of the returned data.

Each ingredient carries a base `qty` and `units` (`oz`, `tbsp`, `tsp`, `mL`, `dash`, `drops`, or none for countable items like mint leaves). Garnishes are now objects (`{id, name, qty}`) rather than plain strings, so a garnish can have its own count (e.g. two cherries).

## Unit conversion

Each `Ingredient` row uses the `useMeasure` hook to keep its own local unit state:

- `unitUtils.js` holds the conversion matrix between `oz`, `tbsp`, `tsp`, `mL`, `dash`, and `drops`, plus `getClosestFraction`, which snaps a converted decimal to the nearest sensible fraction (halves, thirds, quarters, eighths) instead of showing something like `0.6666666 oz`.
- Switching a unit via `UnitSelect` only affects that one ingredient's display — it doesn't mutate the underlying cocktail data.

## Development roadmap

1. **Implement "Add New Cocktail" and "Add New Ingredient"** — Build out real forms to save custom cocktails and ingredients to `localStorage` as a proof of concept.
2. **Add "Edit Cocktail" and "Edit Ingredient" functionality** — Utilize the Add Cocktail and Ingredient forms to enable edit capabilities to existing custom recipes. Disable editing for sample cocktails until API solution is online.
3. **Quantity multiplier** — Create a recipe multiplier field to to scale up volumes for batch cocktails. Add cup and liter units to support.
4. **Secure backend data access** — Devise an authentication method to restrict access to add/edit pages, and secure data fetch methods in preparation for API deployment.
4. **Replace the in-memory data source with a real API** — Likely will be a PHP REST API. `fetchCocktailList` and `fetchCocktail` are structured to make this a drop-in swap; add loading/error states where needed.
5. **Create a bulk upload page** — Build out a page that parses a csv file of cocktail recipes, and uploads the recipes to the database, conditionally creating the unknown ingredients.
6. **React Native update** — Enable and validate for React Native.
7. **Accessibility pass** — audit the custom `UnitSelect` and search toggle for keyboard navigation and screen-reader labeling now that there's more interactive UI per row.
8. **Tests** — no test setup exists yet; start with unit tests for `unitUtils.js` (conversion math and fraction rounding are the highest-value, easiest-to-break logic in the app).
9. **Clone for iOS** — Replicate app in Swift.

## License

Cocktail App © 2026 by Dan Howard is licensed under CC BY-SA 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-sa/4.0/ 