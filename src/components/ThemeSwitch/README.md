# ThemeSwitch Component

An animated toggle switch component for switching between light and dark themes. Features beautiful sun and moon icons with animated clouds in light mode and twinkling stars in dark mode.

## Features

- 🌞 Animated sun icon with rays
- 🌙 Moon icon with craters
- ☁️ Floating clouds in light mode
- ⭐ Twinkling stars in dark mode
- ⌨️ Keyboard accessible
- 📏 Three size variants (small, medium, large)

## Installation

```bash
npm install @macolmenerori/component-library
```

## Import

```tsx
// Import CSS separately (required for styling)
import '@macolmenerori/component-library/theme-switch-css';

// Recommended: Subpath import (no react-markdown dependency required)
import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';

// Alternative: Main entry (requires all peer dependencies)
import { ThemeSwitch } from '@macolmenerori/component-library';
```

> **Note:** ThemeSwitch requires manual CSS import to support SSG/SSR environments. Import the CSS file before using the component.

## Usage

```tsx
import React, { useState } from 'react';
import '@macolmenerori/component-library/theme-switch-css';
import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return <ThemeSwitch enableDarkMode={darkMode} setEnableDarkMode={setDarkMode} size="medium" />;
}
```

## Props

| Prop                | Type                             | Required | Default   | Description                              |
| ------------------- | -------------------------------- | -------- | --------- | ---------------------------------------- |
| `enableDarkMode`    | `boolean`                        | Yes      | -         | Current theme state (true for dark mode) |
| `setEnableDarkMode` | `(value: boolean) => void`       | Yes      | -         | Callback to update theme state           |
| `size`              | `'small' \| 'medium' \| 'large'` | No       | `'large'` | Size variant of the switch               |

## Accessibility

The component is fully accessible with:

- ARIA labels for screen readers
- Keyboard navigation support (Enter and Space keys)
- Proper role and tabIndex attributes

## Examples

### Basic Usage

```tsx
import '@macolmenerori/component-library/theme-switch-css';
import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';

<ThemeSwitch enableDarkMode={darkMode} setEnableDarkMode={setDarkMode} />;
```

### With Different Sizes

```tsx
import '@macolmenerori/component-library/theme-switch-css';
import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';

<ThemeSwitch enableDarkMode={darkMode} setEnableDarkMode={setDarkMode} size="small" />;
```

### Integration with Theme Provider

```tsx
import '@macolmenerori/component-library/theme-switch-css';
import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';
import { useTheme } from './context/ThemeContext';

function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return <ThemeSwitch enableDarkMode={darkMode} setEnableDarkMode={setDarkMode} size="medium" />;
}
```
