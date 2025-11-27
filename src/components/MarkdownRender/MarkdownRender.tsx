import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

export interface MarkdownProps {
  /** The markdown string to render */
  content: string;
  /** Optional CSS class name for the container */
  className?: string;
}

/**
 * A component that renders a markdown string as HTML.
 * Supports GitHub Flavored Markdown (GFM) including tables,
 * strikethrough, task lists, and autolinks.
 */
const MarkdownRender: React.FC<MarkdownProps> = ({ content, className }) => {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
