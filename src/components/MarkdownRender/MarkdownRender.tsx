import { useMemo } from 'react';
import ReactMarkdown, { type Components, type Options } from 'react-markdown';

import remarkGfm from 'remark-gfm';

export interface MarkdownProps {
  /** The markdown string to render */
  content: string;
  /** Optional CSS class name for the container */
  className?: string;
  /** Custom component overrides for markdown elements */
  components?: Partial<Components>;
  /** Target for all links (defaults to '_self') */
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
  /** Make all images responsive (defaults to false) */
  responsiveImages?: boolean;
  /** Optional rehype plugins for HTML processing */
  rehypePlugins?: Options['rehypePlugins'];
}

/**
 * A component that renders a markdown string as HTML.
 * Supports GitHub Flavored Markdown (GFM) including tables,
 * strikethrough, task lists, and autolinks.
 */
const MarkdownRender: React.FC<MarkdownProps> = ({
  content,
  className,
  components,
  linkTarget,
  responsiveImages,
  rehypePlugins
}) => {
  const mergedComponents = useMemo(() => {
    const generated: Partial<Components> = {};

    // Auto-generate link component if linkTarget is set and no custom 'a' provided
    if (linkTarget && !components?.a) {
      generated.a = ({ children, ...props }) => (
        <a {...props} target={linkTarget} rel={linkTarget === '_blank' ? 'noreferrer' : undefined}>
          {children}
        </a>
      );
    }

    // Auto-generate image component if responsiveImages and no custom 'img' provided
    if (responsiveImages && !components?.img) {
      generated.img = ({ alt, ...props }) => (
        <img
          alt={alt ?? ''}
          {...props}
          style={{ maxWidth: '100%', height: 'auto', ...props.style }}
        />
      );
    }

    // User-provided components override auto-generated ones
    return { ...generated, ...components };
  }, [components, linkTarget, responsiveImages]);

  const hasComponents = Object.keys(mergedComponents).length > 0;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        components={hasComponents ? mergedComponents : undefined}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
