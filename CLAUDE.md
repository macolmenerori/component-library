# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library (`@macolmenerori/component-library`) published to npm. It's built with TypeScript, Vite, and uses pnpm as the package manager. Compatible with React 18 and React 19.

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
- **Package manager**: pnpm 10.24.0
- **Package type**: ESM (type: "module" in package.json)
- **TypeScript strict mode**: Enabled with strict null checks, noImplicitAny, and noImplicitThis

## Build System (Vite)

- **Bundler**: Vite 7.x configured for library mode
- **Output formats**: ESM (`.js`) and CommonJS (`.cjs`)
- **Entry points**: Multiple entry points for tree-shaking support
  - `src/index.ts` - Main entry (all components)
  - `src/components/ThemeSwitch/index.ts` - ThemeSwitch only
  - `src/components/MarkdownRender/index.ts` - MarkdownRender only
- **Dev entry**: `src/main.tsx` (for development server only)
- **External dependencies**: React, React DOM, react-markdown, and remark-gfm are externalized
- **TypeScript declarations**: Generated automatically via `vite-plugin-dts` to `dist/types/`
- **CSS handling**: CSS modules are extracted to separate files during build. Consumers must import CSS manually to support SSG/SSR environments.
- **Source maps**: Enabled for debugging

### CSS Manual Import

CSS modules are bundled into separate CSS files in the `dist/` directory. Consumers must manually import the CSS files before using components that require styling (e.g., ThemeSwitch). This pattern supports SSG/SSR environments where Node.js cannot execute CSS import statements.

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
- **MarkdownRender**: Markdown rendering component with GitHub Flavored Markdown support

### Adding New Components to Playground

To showcase a new component in the playground:

1. Import the component in `Playground.tsx` from `./index`
2. Add state management if the component requires interactive props
3. Add a new card in the grid:

```tsx
<div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
  <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>ComponentName</h2>
  <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}
  >
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

- **Registry**: Published to npm (`https://registry.npmjs.org/`)
- **Access**: Public package
- **Peer dependencies**: React ^18.0.0 or ^19.0.0, React DOM ^18.0.0 or ^19.0.0
- **Optional peer dependencies**: react-markdown ^10.0.0, remark-gfm ^4.0.0 (only required for MarkdownRender)
- **Package contents**: Only `dist/` folder is included in published package

### Entry Points and Subpath Exports

The library supports subpath exports for tree-shaking and optional dependencies:

| Import Path | Entry Point | Dependencies Required |
|-------------|-------------|----------------------|
| `@macolmenerori/component-library` | All components | react, react-markdown, remark-gfm |
| `@macolmenerori/component-library/theme-switch` | ThemeSwitch only | react |
| `@macolmenerori/component-library/theme-switch-css` | ThemeSwitch CSS | none (CSS file) |
| `@macolmenerori/component-library/markdown-render` | MarkdownRender only | react, react-markdown, remark-gfm |

Each subpath provides ESM, CommonJS, and TypeScript declarations. CSS files are exported separately to support SSG/SSR environments.

### Publishing Process

1. Run `pnpm build` to create production bundle
2. Run `pnpm publish:npm` to publish to npm (or `pnpm publish:github` for GitHub Packages)

### Consumer Installation

Install directly from npm:

```bash
pnpm add @macolmenerori/component-library
```

## Available Components

### ThemeSwitch

An animated toggle switch for light/dark theme switching with sun/moon animations, clouds, and stars.

**Location**: `src/components/ThemeSwitch/`
**Export pattern**: Default export
**Has CSS**: Yes (`ThemeSwitch.module.css`)
**Dependencies**: None (pure React and CSS)

**Props:**

- `enableDarkMode` (boolean, required): Current dark mode state
- `setEnableDarkMode` (function, required): Callback to update dark mode state
- `size` (optional): Size variant - `'small'`, `'medium'`, or `'large'` (default: `'large'`)

**Import:**

```tsx
// Import CSS separately (required for styling, supports SSG/SSR)
import '@macolmenerori/component-library/theme-switch-css';

// Main entry (requires all peer dependencies)
import { ThemeSwitch } from '@macolmenerori/component-library';

// Subpath import (recommended - no react-markdown required)
import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';
```

**Note:** ThemeSwitch requires manual CSS import to support SSG/SSR environments. The CSS must be imported before using the component.

### MarkdownRender

A component for rendering markdown strings as HTML with GitHub Flavored Markdown (GFM) support.

**Location**: `src/components/MarkdownRender/`
**Export pattern**: Default export
**Has CSS**: No (consumers style via className)
**Dependencies**: react-markdown, remark-gfm (optional peer dependencies)

**Props:**

- `content` (string, required): The markdown string to render
- `className` (string, optional): CSS class name for the container element
- `components` (Partial<Components>, optional): Custom component overrides for markdown elements
- `linkTarget` ('_blank' | '_self' | '_parent' | '_top', optional): Target for all links (defaults to '_self')
- `responsiveImages` (boolean, optional): Make all images responsive (defaults to false)
- `rehypePlugins` (PluggableList, optional): Optional rehype plugins for HTML processing

**Features:**

- Full GitHub Flavored Markdown support (tables, task lists, strikethrough)
- Code blocks with syntax highlighting support
- Autolinks
- Customizable styling via className prop
- Custom component overrides for markdown elements
- Built-in link target control (e.g., open links in new tab with `linkTarget="_blank"`)
- Built-in responsive images support
- Support for rehype plugins

**Import:**

```tsx
// Main entry
import { MarkdownRender } from '@macolmenerori/component-library';

// Subpath import
import { MarkdownRender } from '@macolmenerori/component-library/markdown-render';
```

**Usage Examples:**

```tsx
// Basic usage
<MarkdownRender content={markdownContent} />

// Links open in new tab, images are responsive
<MarkdownRender content={markdownContent} linkTarget="_blank" responsiveImages={true} />

// Custom components
<MarkdownRender
  content={markdownContent}
  components={{
    a: ({ children, ...props }) => (
      <a {...props} target="_blank" rel="noreferrer">{children}</a>
    )
  }}
/>
```

**Note on Dependencies**: `react-markdown` and `remark-gfm` are optional peer dependencies. Consumers must install them when using MarkdownRender. Using the subpath import (`/theme-switch`) for ThemeSwitch avoids requiring these dependencies.

## Component Development Guidelines

### Export Pattern

Each component has its own entry point (`index.ts`) that re-exports from the component file:

```typescript
// In component file (e.g., MyComponent.tsx)
export interface MyComponentProps { ... }
const MyComponent: React.FC<MyComponentProps> = (props) => { ... };
export default MyComponent;

// In component's index.ts (e.g., src/components/MyComponent/index.ts)
export type { MyComponentProps } from './MyComponent';
export { default as MyComponent } from './MyComponent';

// In src/index.ts (re-exports all components)
export * from './components/MyComponent';
```

### Component Structure

Each component should have:

- `index.ts` - Component entry point for subpath exports
- `ComponentName.tsx` - Component implementation (with exported props interface)
- `ComponentName.module.css` - CSS module (if needed for styling)
- `README.md` - Component documentation with usage examples

### Dependency Guidelines

- **Peer dependencies**: Use only for framework libraries (React, React-DOM)
- **Regular dependencies**: Use for utility/rendering libraries that are implementation details
- **Rule of thumb**: If consumers interact with the dependency directly, consider peer dependency. If it's abstracted by your component, use regular dependency.
