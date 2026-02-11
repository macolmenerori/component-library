# MonthlyCalendar

A zero-dependency monthly calendar component that renders a single month as a semantic HTML `<table>` in a 7-column grid (Sunday through Saturday). Each day occupies a square cell with an optional annotation slot that accepts any `ReactNode`.

## Features

- Pure React with inline styles — no CSS files or external dependencies
- Semantic HTML table structure for accessibility
- Square cells maintained via CSS aspect-ratio technique
- Fully controlled: all data comes from props
- Annotation system maps an array index to each day of the month
- Built-in light and dark themes with WCAG-compliant contrast ratios
- Customizable table-level styles via `style` prop
- Optional weekday header row with customizable labels
- Handles all months, leap years, and variable start days
- SSR/SSG compatible — no browser-only APIs

## Installation

```bash
pnpm add @macolmenerori/component-library
```

## Import

```tsx
// Subpath import (recommended — no react-markdown dependency required)
import { MonthlyCalendar } from '@macolmenerori/component-library/monthly-calendar';

// Main entry (includes all components)
import { MonthlyCalendar } from '@macolmenerori/component-library';
```

> **Note:** Unlike ThemeSwitch, no separate CSS import is needed. MonthlyCalendar uses inline styles only.

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `year` | `number` | Yes | — | Full four-digit year (e.g. 2026) |
| `month` | `number` | Yes | — | Month to display, 1-based: 1 = January, 12 = December |
| `annotations` | `(ReactNode \| null \| undefined)[]` | No | `[]` | Array of React nodes, one per day. `annotations[0]` maps to Day 1 |
| `headers` | `[string, string, string, string, string, string, string]` | No | `undefined` | Array of 7 weekday labels. Omit to hide the header row |
| `style` | `CSSProperties` | No | `{}` | Inline styles merged onto the `<table>` element |
| `darkMode` | `boolean` | No | `false` | Enables dark color theme for text elements |

## Usage Examples

### Basic Calendar

```tsx
<MonthlyCalendar year={2026} month={2} />
```

### With Headers

```tsx
<MonthlyCalendar
  year={2026}
  month={3}
  headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
/>
```

### With Annotations

```tsx
const daysInMonth = new Date(2026, 6, 0).getDate();

const annotations = Array.from({ length: daysInMonth }, (_, i) => {
  const day = i + 1;
  if (day === 5) return <span style={{ color: '#3730a3', fontSize: '0.65rem' }}>Meeting</span>;
  if (day === 12) return <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>Deadline</span>;
  if (day === 20) return <span>🚀</span>;
  return null;
});

<MonthlyCalendar
  year={2026}
  month={6}
  headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
  annotations={annotations}
/>
```

### Dark Mode

Wrap the calendar in a dark container and pass `darkMode={true}`:

```tsx
<div style={{ background: '#1e1e30', padding: 16, borderRadius: 12 }}>
  <MonthlyCalendar
    year={2026}
    month={8}
    darkMode={true}
    headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
  />
</div>
```

> **Note:** The component does not set its own background color. When using `darkMode`, you must wrap it in a dark-background container.

### Custom Styles

Override table-level defaults via the `style` prop:

```tsx
<MonthlyCalendar
  year={2026}
  month={4}
  headers={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
  style={{
    border: '2px solid #6366f1',
    borderCollapse: 'separate',
    borderSpacing: 6,
    borderRadius: 12,
    fontFamily: "'Georgia', serif"
  }}
/>
```

### Month Navigation

```tsx
import { useState } from 'react';
import { MonthlyCalendar } from '@macolmenerori/component-library/monthly-calendar';

function NavigableCalendar() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2);

  const prev = () => {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
        <button onClick={prev}>Previous</button>
        <span>{month}/{year}</span>
        <button onClick={next}>Next</button>
      </div>
      <MonthlyCalendar
        year={year}
        month={month}
        headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      />
    </div>
  );
}
```

## Annotations

### Mapping

Annotations map positionally to days of the month:

- `annotations[0]` → Day 1
- `annotations[1]` → Day 2
- `annotations[n]` → Day n + 1

Each annotation can be any valid `ReactNode`: text, JSX, images, components, `null`, or `undefined`.

### Sparse Annotations

You don't need to annotate every day. Use `null` for days without content:

```tsx
const annotations = new Array(30).fill(null);
annotations[4] = <span>Event A</span>;  // Day 5
annotations[19] = <span>Event B</span>; // Day 20
```

## Theming

The component has two built-in themes toggled via `darkMode`:

| Token | Light | Dark | Applied To |
| --- | --- | --- | --- |
| `dayColor` | `#222` | `#f0f0f0` | Day number text |
| `headerColor` | `#555` | `#a0a0b8` | Header row text |
| `annotationColor` | `inherit` | `#d0d0e0` | Annotation wrapper text |

Dark theme colors meet WCAG AA/AAA contrast standards against typical dark backgrounds (`#1e1e30`).
