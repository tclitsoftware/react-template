# TMS Admin Portal

A modern, high-performance Admin Portal built with React, TypeScript, and Vite. This project follows a strictly modular architecture and uses Redux Toolkit with RTK Query for state management and data fetching.

## Tech Stack

- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Frontend**: [React 18+](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: Dynamic SVG system using `import.meta.glob`

---

## 🏗 Project Structure

```text
src/
├── _helper/       # Shared utility functions
├── _interfaces/   # Global TypeScript definitions
├── _services/     # API definitions and RTK Query setup
├── assets/        # Fonts, Icons, and Images
├── components/    # Atomic UI components
├── data/          # Static data and mock constants
├── hooks/         # Shared, non-module specific hooks
├── layout/        # Page layouts (Dashboard, Auth, etc.)
├── locale/        # I18n translations (EN/ID)
├── modules/       # Feature-based folders (The core of the app)
│   └── [feature]/
│       └── [page]/
│           ├── index.page.tsx    # Page entry point
│           ├── useCustomHooks.tsx # Page-specific logic
│           └── sections/         # Sub-components for that page
├── routes/        # Router configuration and registry
└── store/         # Redux store and global slices
```

---

## Getting Started

### 1. Installation
Install the dependencies using Yarn:
```bash
yarn install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.dev.example .env.dev
```
*Note: Vite is configured to support variables prefixed with `REACT_APP_` for backward compatibility.*

### 3. Development
Start the development server:
```bash
yarn start:dev
```

### 4. Production Build
Build the project for production (output goes to `/build`):
```bash
yarn build
```

---

## Key Development Patterns

### Data Fetching (RTK Query)
1. Define your endpoint in `src/_services/modules/[moduleName].ts`.
2. Inject it into the base API in `src/_services/api.ts`.
3. Use the generated hooks (e.g., `useGetVehiclesQuery`) in your page hooks.
4. **Auth tokens are handled automatically** by the base API interceptors.

### Module Architecture
- **Keep index.page.tsx clean**: Only handle the layout and top-level component composition.
- **Move logic to hooks**: All state, effects, and API calls should live in a specific hook file (e.g., `useVehicleList.tsx`).
- **Sectioning**: If a page exceeds 200 lines, break it into smaller components inside a `sections/` folder.

### Dynamic Icons
To use an icon, simply use the `<Icon name="icon-name" />` component. All icons inside `src/assets/icons` are automatically detected and available via Type-Safe autocomplete.

---

## Deployment
The project includes a multi-stage `Dockerfile` and optimized `nginx.conf`. 
- **Production Build**: Compiles to static files.
- **Runtime Injection**: Environment variables are injected at runtime via `env-config.js`, allowing the same image to be used across different environments (Staging/Production) without rebuilding.

---

Happy coding!