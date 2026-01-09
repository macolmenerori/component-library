# MarkdownRender

A component that renders markdown strings as HTML with GitHub Flavored Markdown (GFM) support.

## Features

- Regular Markdown
- Support for [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Support for custom `className`

## Installation

```bash
npm install @macolmenerori/component-library react-markdown remark-gfm
```

> **Note:** This component requires `react-markdown` and `remark-gfm` as peer dependencies.

## Import

```tsx
// Subpath import
import { MarkdownRender } from '@macolmenerori/component-library/markdown-render';

// Main entry
import { MarkdownRender } from '@macolmenerori/component-library';
```

## Usage

```tsx
<MarkdownRender content={markdownContent} className="my-markdown" />
```

## Props

| Prop        | Type     | Required | Description                               |
| ----------- | -------- | -------- | ----------------------------------------- |
| `content`   | `string` | Yes      | The markdown string to render             |
| `className` | `string` | No       | Optional CSS class name for the container |

## Example

```tsx
import { MarkdownRender } from '@macolmenerori/component-library/markdown-render';

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

  return <MarkdownRender content={markdownContent} className="my-markdown" />;
}
```
