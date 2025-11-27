# @macolmenerori/component-library

A modern React component library built with TypeScript, providing reusable UI components for your React applications.

## Features

- Built with React 19 and TypeScript
- Fully typed components with TypeScript declarations
- ESM and CommonJS support
- Tree-shakeable exports
- Strict TypeScript configuration for type safety

## Installation

This package is published to [npm](https://www.npmjs.com/package/@macolmenerori/component-library) and can be installed directly without any additional configuration.

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

Import components from the library and use them in your React application.

### Available Components

<details>
<summary><strong>ThemeSwitch</strong> - An animated toggle switch for light/dark theme switching</summary>

A visually appealing theme toggle component with sun/moon animations, clouds, and stars.

**Props:**
- `enableDarkMode` (boolean, required): Current dark mode state
- `setEnableDarkMode` (function, required): Callback to update dark mode state
- `size` (optional): Size variant - `'small'`, `'medium'`, or `'large'` (default: `'large'`)

**Example:**

```tsx
import { useState } from 'react';
import { ThemeSwitch } from '@macolmenerori/component-library';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <ThemeSwitch
        enableDarkMode={darkMode}
        setEnableDarkMode={setDarkMode}
        size="medium"
      />
    </div>
  );
}
```

</details>

<details>
<summary><strong>MarkdownRender</strong> - A component for rendering markdown strings as HTML</summary>

A simple and flexible markdown renderer with GitHub Flavored Markdown (GFM) support, including tables, task lists, strikethrough, and code blocks.

**Props:**
- `content` (string, required): The markdown string to render
- `className` (string, optional): CSS class name for the container element

**Features:**
- Full GitHub Flavored Markdown support
- Tables, task lists, strikethrough
- Code blocks with syntax highlighting support
- Autolinks
- Customizable styling via className prop

**Example:**

```tsx
import MarkdownRender from '@macolmenerori/component-library';

function App() {
  const markdownContent = `
# Hello World

This is **bold** and this is *italic*.

## Features
- Lists
- ~~Strikethrough~~
- [Links](https://example.com)
- \`inline code\`

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
  `;

  return (
    <div>
      <MarkdownRender content={markdownContent} className="my-markdown" />
    </div>
  );
}
```

</details>

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
