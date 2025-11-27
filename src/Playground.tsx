import { useState } from 'react';

import { MarkdownRender, ThemeSwitch } from './index';

import sampleMarkdown from '@/components/MarkdownRender/sample_markdown.md?raw';

export function Playground() {
  const [enableDarkMode, setEnableDarkMode] = useState(false);

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

        {/* MarkdownRender Component */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>MarkdownRender</h2>
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
      </div>
    </div>
  );
}

export default Playground;
