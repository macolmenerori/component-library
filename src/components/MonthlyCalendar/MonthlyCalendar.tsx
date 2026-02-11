import React, { CSSProperties, ReactNode, useMemo } from 'react';

/**
 * Props for the MonthlyCalendar component
 */
export interface MonthlyCalendarProps {
  /** Full four-digit year (e.g. 2026) */
  year: number;
  /** Month to display, 1-based: 1 = January, 12 = December */
  month: number;
  /**
   * Array of React nodes, one per day of the month.
   * annotations[0] maps to Day 1, annotations[1] maps to Day 2, etc.
   * Use null or undefined for days with no annotation.
   */
  annotations?: (ReactNode | null | undefined)[];
  /**
   * Array of exactly 7 strings for the weekday header labels.
   * Omit to hide the header row entirely.
   */
  headers?: [string, string, string, string, string, string, string];
  /**
   * Inline styles merged onto the table element, overriding defaults via shallow spread.
   */
  style?: CSSProperties;
  /**
   * Enables the dark color theme for day numbers, headers, and annotation text.
   * The component does not set its own background — wrap it in a dark container when enabled.
   * @default false
   */
  darkMode?: boolean;
}

// ─── Theme definitions ───

const LIGHT_THEME = {
  dayColor: '#222',
  headerColor: '#555',
  annotationColor: 'inherit'
};

const DARK_THEME = {
  dayColor: '#f0f0f0',
  headerColor: '#a0a0b8',
  annotationColor: '#d0d0e0'
};

// ─── Static style objects ───

const defaultTableStyle: CSSProperties = {
  borderCollapse: 'collapse',
  border: 'none',
  width: '100%',
  tableLayout: 'fixed',
  fontFamily: 'sans-serif'
};

const defaultCellStyle: CSSProperties = {
  border: 'none',
  verticalAlign: 'top',
  padding: 0,
  position: 'relative',
  textAlign: 'center'
};

/**
 * MonthlyCalendar Component
 *
 * A zero-dependency monthly calendar grid rendered as a semantic HTML table.
 * Each day occupies a square cell with an optional annotation slot that accepts
 * any ReactNode (text, images, badges, icons, or entire sub-components).
 *
 * Features built-in light and dark themes, customizable headers, and
 * table-level style overrides. All styling is inline — no CSS files required.
 *
 * @component
 * @example
 * ```tsx
 * <MonthlyCalendar
 *   year={2026}
 *   month={2}
 *   headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
 *   darkMode={false}
 * />
 * ```
 */
const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  year,
  month,
  annotations = [],
  headers,
  style = {},
  darkMode = false
}) => {
  const theme = darkMode ? DARK_THEME : LIGHT_THEME;

  const weeks = useMemo(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;
    const result: (number | null)[][] = [];
    let currentDay = 1 - startDay;

    for (let w = 0; w < totalCells / 7; w++) {
      const week: (number | null)[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(currentDay >= 1 && currentDay <= daysInMonth ? currentDay : null);
        currentDay++;
      }
      result.push(week);
    }
    return result;
  }, [year, month]);

  const mergedTableStyle = { ...defaultTableStyle, ...style };

  return (
    <table style={mergedTableStyle}>
      {headers && (
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  ...defaultCellStyle,
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  paddingBottom: 6,
                  color: theme.headerColor
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {weeks.map((week, wi) => (
          <tr key={wi}>
            {week.map((day, di) => (
              <td key={di} style={defaultCellStyle}>
                <div
                  style={{
                    width: '100%',
                    paddingBottom: '100%',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingTop: 6,
                      gap: 4,
                      overflow: 'hidden'
                    }}
                  >
                    {day !== null && (
                      <>
                        <span
                          style={{
                            fontFamily: 'sans-serif',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            color: theme.dayColor
                          }}
                        >
                          {day}
                        </span>
                        {annotations[day - 1] != null && (
                          <div
                            style={{
                              fontSize: '0.75rem',
                              lineHeight: 1.2,
                              overflow: 'hidden',
                              width: '100%',
                              textAlign: 'center',
                              color: theme.annotationColor
                            }}
                          >
                            {annotations[day - 1]}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MonthlyCalendar;
