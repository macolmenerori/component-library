# MarkdownRender

A component that renders markdown strings as HTML with GitHub Flavored Markdown (GFM) support.

## Features

- Regular Markdown
- Support for [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Support for custom `className`
- Custom component overrides for markdown elements
- Built-in link target control (open links in new tab)
- Built-in responsive images support
- Support for rehype plugins

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

| Prop               | Type                                       | Required | Description                                    |
| ------------------ | ------------------------------------------ | -------- | ---------------------------------------------- |
| `content`          | `string`                                   | Yes      | The markdown string to render                  |
| `className`        | `string`                                   | No       | Optional CSS class name for the container      |
| `components`       | `Partial<Components>`                      | No       | Custom component overrides for markdown elements |
| `linkTarget`       | `'_blank' \| '_self' \| '_parent' \| '_top'` | No     | Target for all links (defaults to `'_self'`)   |
| `responsiveImages` | `boolean`                                  | No       | Make all images responsive (defaults to `false`) |
| `rehypePlugins`    | `PluggableList`                            | No       | Optional rehype plugins for HTML processing    |

## Examples

### Basic Usage

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

### Links Open in New Tab

```tsx
<MarkdownRender
  content={markdownContent}
  linkTarget="_blank"
/>
```

When `linkTarget="_blank"` is set, all links will have `target="_blank"` and `rel="noreferrer"` for security.

### Responsive Images

```tsx
<MarkdownRender
  content={markdownContent}
  responsiveImages={true}
/>
```

When `responsiveImages={true}` is set, all images will have `max-width: 100%` and `height: auto`.

### Custom Components

```tsx
<MarkdownRender
  content={markdownContent}
  components={{
    a: ({ children, ...props }) => (
      <a {...props} target="_blank" rel="noreferrer noopener">
        {children} ↗
      </a>
    ),
    img: (props) => (
      <img
        {...props}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        loading="lazy"
      />
    )
  }}
/>
```

> **Note:** Custom components take precedence over `linkTarget` and `responsiveImages` props.

### With Rehype Plugins

```tsx
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

<MarkdownRender
  content={markdownContent}
  rehypePlugins={[rehypeHighlight, rehypeRaw]}
/>
```

> **Note:** If using rehype plugins, you need to install them separately (e.g., `npm install rehype-highlight rehype-raw`).
