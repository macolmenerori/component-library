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
