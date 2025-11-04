# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library (`@macolmenerori/component-library`) published to GitHub Packages. It's built with React 19, TypeScript, Vite, and uses pnpm as the package manager.

## Development Commands

- **Dev server**: `pnpm dev` - Starts Vite dev server on port 3000
- **Build library**: `pnpm build` - Type checks and builds the library for distribution
- **Preview build**: `pnpm preview` - Previews the production build
- **Format code**: `pnpm prettify` - Formats all files in `src/` using Prettier
- **Lint code**: `pnpm lint` - Runs ESLint with auto-fix on `src/`
- **Type check**: `pnpm types` - Runs TypeScript compiler in no-emit mode to check for type errors
- **Install dependencies**: `pnpm install`

Note: Test command is not yet implemented (placeholder script exists).

## Technical Constraints

- **Node version**: Must be >=24.0.0 and <25.0.0 (specified in engines)
- **Package manager**: pnpm 10.19.0
- **Package type**: ESM (type: "module" in package.json)
- **TypeScript strict mode**: Enabled with strict null checks, noImplicitAny, and noImplicitThis

## Build System (Vite)

- **Bundler**: Vite 7.x configured for library mode
- **Output formats**: ESM (`index.js`) and CommonJS (`index.cjs`)
- **Entry point**: `src/index.ts`
- **Dev entry**: `src/main.tsx` (for development server only)
- **External dependencies**: React and React DOM are externalized (peer dependencies)
- **TypeScript declarations**: Generated automatically via `vite-plugin-dts` to `dist/types/`
- **CSS handling**: Uses `vite-plugin-lib-inject-css` to automatically inject CSS imports into bundles
- **Source maps**: Enabled for debugging

### CSS Auto-Import
CSS modules are automatically bundled and imported with components. The build process:
1. Extracts CSS from all components into `dist/index.css`
2. Automatically injects `import './index.css'` (ESM) or `require('./index.css')` (CommonJS) into the JS bundles
3. Consumers only need to import the component - CSS is loaded automatically via their bundler

## Code Organization

### Project Structure
- `src/index.ts` - Library entry point (exports all public components)
- `src/main.tsx` - Development entry point (mounts app for local dev server)
- `index.html` - HTML entry for Vite dev server (root of project)
- `vite.config.ts` - Vite configuration with library mode settings

### Path Aliases
The project uses TypeScript path aliases configured in both `tsconfig.json` and `vite.config.ts`:
- `@/*` maps to `src/*`
- Example: `import Button from '@/components/Button'`

### Module Configuration
- **Module resolution**: bundler
- **JSX runtime**: react-jsx (automatic, no need to import React in component files)
- **Target**: ES2020
- **Distribution**: `dist/` directory with types in `dist/types/index.d.ts`

## Development Playground

The project includes a Playground component for interactive development and testing of library components.

### Overview
- **Location**: `src/Playground.tsx`
- **Usage**: Run `pnpm dev` to start the dev server and view the playground at `http://localhost:3000`
- **Purpose**: Provides an interactive showcase of all library components during development
- **Layout**: Responsive CSS Grid layout with minimal styling
- **Scope**: Development only - not included in the published package

### Current Components
- **ThemeSwitch**: Interactive theme toggle component with state management

### Adding New Components to Playground
To showcase a new component in the playground:

1. Import the component in `Playground.tsx` from `./index`
2. Add state management if the component requires interactive props
3. Add a new card in the grid:
```tsx
<div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
  <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>ComponentName</h2>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
    <YourComponent {...props} />
  </div>
</div>
```

The Playground automatically uses a responsive grid that adjusts based on screen size (minimum 300px per column).

## Code Style

### Prettier Configuration
- 100 character line width
- Semicolons required
- Single quotes for JS/TS, double quotes for JSX
- 2-space indentation (spaces, not tabs)
- No trailing commas
- LF line endings

### ESLint Configuration
Uses TypeScript ESLint with comprehensive rules including:
- **TypeScript rules**: Warns on explicit any and unused vars
- **React rules**: React recommended + JSX runtime, prop-types disabled (TypeScript handles this)
- **Import sorting**: Custom groups - React imports first, then external packages, then aliased paths, then relative imports
- **Accessibility**: jsx-a11y strict rules (some interactive element rules disabled)
- **Testing**: testing-library and jest-dom rules configured
- **Console**: console.log statements trigger warnings
- **Prettier integration**: Prettier violations show as ESLint errors

Import order enforced:
1. React packages
2. External packages
3. Aliased directories (api, assets, common, components, etc.)
4. Side effect imports
5. Parent imports (`..`)
6. Relative imports (`.`)
7. Style imports

## Publishing

### Package Configuration
- **Registry**: Published to GitHub Packages (`https://npm.pkg.github.com`)
- **Access**: Public package
- **Peer dependencies**: React ^18.0.0 or ^19.0.0, React DOM ^18.0.0 or ^19.0.0
- **Package contents**: Only `dist/` folder is included in published package

### Entry Points
- **Main (CommonJS)**: `dist/index.cjs`
- **Module (ESM)**: `dist/index.js`
- **Types**: `dist/types/index.d.ts`
- **Exports field**: Modern conditional exports supporting both ESM (`import`) and CommonJS (`require`) with proper type definitions

### Publishing Process
1. Ensure `GITHUB_PACKAGES_TOKEN` environment variable is set
2. Run `pnpm build` to create production bundle
3. Run `pnpm publish` to publish to GitHub Packages

### Consumer Installation
Users need to configure `.npmrc`:
```
@macolmenerori:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Then install with: `pnpm add @macolmenerori/component-library`
