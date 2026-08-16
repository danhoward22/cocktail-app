# Cocktail App

A React app for browsing classic cocktail recipes: search by name or by ingredient, then pull up a recipe with measures, garnish, and notes.

## Stack

- **React 19** + **Vite** — build tooling and dev server
- **react-router** — routing, data loading (`loader`), and nested routes
- **react-window** — virtualized list rendering
- **fraction.js** — converts decimal quantities to clean fractions (e.g. `0.5 oz` → `1/2 oz`)
- **downshift** — combobox and multiselect elements
- **react-hook-form + zod** — form validation
- **react-hot-toast** - form submit notifications

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
npm install
```

### Configure

Create a `.env` file in the project root:

```
VITE_USE_MOCK_API=true
```

`true` uses the built-in mock API, backed by `localStorage`. `false` uses the real API client, which requires further implementation.

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project structure

```
src/
├─cocktail-app/
│ ├─components/    # Shared cocktail app components
│ │ └─ui/          # UI primitives
│ ├─data/          # Mock data files
│ ├─hooks/         # Cocktail app custom hooks
│ ├─pages/         # Page specific components organized into subfolders
│ ├─schemas/       # Zod schemas
│ ├─services/
│ │ └─cocktailApi/ # Real and mock API fetch functions
│ └─utils/         # Cocktail helpers, unit conversion
├─loaders/         # Page data loaders
├─shared/
│ ├─components/    # Reusable generic components
│ │ └─ui/          # UI primitives
│ ├─hooks/         # useDeferredQuery
│ ├─styles/        # Reusable generic css modules
│ └─utils/         # arrayUtils, localStorageUtils, mathUtils
└─App.jsx          # router setup
```

CSS Modules throughout. Generic, reusable styles (buttons, form fields, page layout, panels) live in `src/shared/styles` and are composed into feature-specific modules to avoid duplication.

## Routes

| Path                          | Renders                                         |
|-------------------------------|-------------------------------------------------|
| `/`                           | Home page                                       |
| `/cocktails`                  | Search page (loads the full cocktail list)      |
| `/cocktails/:cocktailId`      | Recipe detail, nested inside the search page    |
| `/cocktails/:cocktailId/edit` | Recipe edit form, nested inside the search page |
| `/new-cocktail`               | Add new cocktail form                           |
| `/new-ingredient`             | Add new ingredient form                         |

## Development roadmap

1. **Secure backend data access**
2. **Replace the in-memory data source with a real API**
3. **Favorites list**
4. **Bulk upload page**

Additional roadmap items (in no particular order):
- **Typescript update**
- **React Native update**
- **Accessibility pass**
- **Tests**
- **Clone API in Node**
- **Clone app in Swift**

## Copyright and Licensing

Copyright (c) 2026 Dan Howard
Licensed under the MIT license.