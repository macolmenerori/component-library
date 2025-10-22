# @macolmenerori/component-library

A modern React component library built with TypeScript, providing reusable UI components for your React applications.

## Features

- Built with React 19 and TypeScript
- Fully typed components with TypeScript declarations
- ESM and CommonJS support
- Tree-shakeable exports
- Strict TypeScript configuration for type safety

## Installation

This package is published to GitHub Packages. To install it in your project, you need to configure npm to use GitHub Packages for the `@macolmenerori` scope.

Create or update a `.npmrc` file in your project root with the following content:

```
@macolmenerori:registry=https://npm.pkg.github.com
```

Then install the package:

Using npm:

```bash
npm install @macolmenerori/component-library
```

Using pnpm:

```bash
pnpm add @macolmenerori/component-library
```

Using yarn:

```bash
yarn add @macolmenerori/component-library
```

## Usage

Import components from the library:

```tsx
import { ThemeSwitch } from '@macolmenerori/component-library';

function App() {
  return (
    <div>
      <ThemeSwitch />
    </div>
  );
}
```

## Peer Dependencies

This library requires the following peer dependencies:

- React: ^18.0.0 or ^19.0.0
- React DOM: ^18.0.0 or ^19.0.0

Make sure these are installed in your project.

## Development

This section is for contributors working on the library itself.

### Prerequisites

- Node.js >= 22.0.0 and < 23.0.0
- pnpm 10.19.0

### Setup

```bash
pnpm install
```

### Available Scripts

- `pnpm dev` - Start the development server on port 3000
- `pnpm build` - Build the library for distribution
- `pnpm preview` - Preview the production build
- `pnpm prettify` - Format code with Prettier
- `pnpm lint` - Lint code with ESLint
- `pnpm types` - Type check with TypeScript

### Building

To build the library:

```bash
pnpm build
```

This will generate:

- ESM bundle at `dist/index.js`
- CommonJS bundle at `dist/index.cjs`
- TypeScript declarations at `dist/types/`

### Publishing

To publish a new version:

1. Build the library: `pnpm build`
2. Publish: `pnpm publish`

## Technology Stack

- **React** 19.0.0 - UI library
- **TypeScript** 5.7.3 - Type safety
- **Vite** 7.0.5 - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## License

MIT

## Repository

[https://github.com/macolmenerori/component-library](https://github.com/macolmenerori/component-library)
