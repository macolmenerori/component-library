import { useState } from 'react';

import { MarkdownRender, MonthlyCalendar, ThemeSwitch } from './index';

import sampleMarkdown from '@/components/MarkdownRender/sample_markdown.md?raw';

export function Playground() {
  const [enableDarkMode, setEnableDarkMode] = useState(false);

  // MonthlyCalendar state
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth() + 1);

  const prevMonth = () => {
    if (calMonth === 1) {
      setCalMonth(12);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 12) {
      setCalMonth(1);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const sampleAnnotations = Array.from(
    { length: new Date(calYear, calMonth, 0).getDate() },
    (_, i) => {
      const day = i + 1;
      if (day === 1) return <span key={day}>&#127881;</span>;
      if (day === 10) return <span key={day}>&#128197;</span>;
      if (day === 14) return <span key={day}>&#10084;&#65039;</span>;
      if (day === 25) return <span key={day}>&#127775;</span>;
      return null;
    }
  );

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <h1 style={{ marginBottom: '2rem' }}>Component Library Playground</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* ThemeSwitch Component */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>ThemeSwitch</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100px'
            }}
          >
            <ThemeSwitch enableDarkMode={enableDarkMode} setEnableDarkMode={setEnableDarkMode} />
          </div>
        </div>

        {/* MonthlyCalendar Component - Basic */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>MonthlyCalendar</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
              marginBottom: '1rem'
            }}
          >
            <button onClick={prevMonth} style={{ cursor: 'pointer' }}>
              &lsaquo;
            </button>
            <span style={{ fontWeight: 600 }}>
              {monthNames[calMonth - 1]} {calYear}
            </span>
            <button onClick={nextMonth} style={{ cursor: 'pointer' }}>
              &rsaquo;
            </button>
          </div>
          <MonthlyCalendar
            year={calYear}
            month={calMonth}
            headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          />
        </div>

        {/* MonthlyCalendar Component - Annotations + Dark Mode */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            MonthlyCalendar (Annotations + Dark Mode)
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
            With emoji annotations and dark theme
          </p>
          <div
            style={{
              background: '#1e1e30',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <MonthlyCalendar
              year={calYear}
              month={calMonth}
              headers={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              darkMode={true}
              annotations={sampleAnnotations}
            />
          </div>
        </div>

        {/* MarkdownRender Component - Basic */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>MarkdownRender (Basic)</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: '100px',
              maxHeight: '600px',
              overflow: 'auto'
            }}
          >
            <MarkdownRender content={sampleMarkdown} className="markdown-demo" />
          </div>
        </div>

        {/* MarkdownRender Component - With linkTarget and responsiveImages */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            MarkdownRender (linkTarget + responsiveImages)
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
            Links open in new tab, images are responsive
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: '100px',
              maxHeight: '600px',
              overflow: 'auto'
            }}
          >
            <MarkdownRender
              content={sampleMarkdown}
              className="markdown-demo"
              linkTarget="_blank"
              responsiveImages={true}
            />
          </div>
        </div>

        {/* MarkdownRender Component - With custom components */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            MarkdownRender (Custom Components)
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
            Custom link styling with icon, custom image with rounded corners
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: '100px',
              maxHeight: '600px',
              overflow: 'auto'
            }}
          >
            <MarkdownRender
              content={sampleMarkdown}
              className="markdown-demo"
              components={{
                a: ({ children, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#0066cc', textDecoration: 'underline' }}
                  >
                    {children} ↗
                  </a>
                ),
                img: ({ alt, ...props }) => (
                  <img
                    alt={alt ?? ''}
                    {...props}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                    loading="lazy"
                  />
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
