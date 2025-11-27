# Markdown Component Demo

This is a demo of the **Markdown** component with GitHub Flavored Markdown support.

## Features

### Text Formatting

- **Bold text** and _italic text_
- ~~Strikethrough text~~
- \`Inline code\`

### Links and Images

[Visit GitHub](https://github.com)

### Code Blocks

\`\`\`typescript
interface User {
name: string;
email: string;
}

const greet = (user: User): string => {
return \`Hello, \${user.name}!\`;
};
\`\`\`

### Tables (GFM)

| Feature       | Supported |
| ------------- | --------- |
| Tables        | ✅        |
| Task Lists    | ✅        |
| Strikethrough | ✅        |
| Autolinks     | ✅        |

### Task Lists (GFM)

- [x] Create Markdown component
- [x] Add GFM support
- [ ] Add syntax highlighting
- [ ] Add custom styling

### Blockquotes

> This is a blockquote.
> It can span multiple lines.

### Lists

#### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

#### Ordered List

1. First item
2. Second item
3. Third item

### Autolinks (GFM)

Visit <https://github.com> for more information.

#### Picture

![alt text](https://miguelangelcolmenero.es/assets/example.png 'Title')

---

_End of demo_
