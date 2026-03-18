import styles from "./MarkdownContent.module.css";
import { WidgetRenderer } from "@/widgets/WidgetRenderer";
import type { WidgetDefinition } from "@/types/content";

type MarkdownContentProps = {
  content: string;
};

type ContentNode =
  | { type: "heading"; value: string }
  | { type: "paragraph"; value: string }
  | { type: "list"; value: string[] }
  | { type: "widget"; value: WidgetDefinition["id"] };

const widgetPattern = /^\{\{widget:([a-z-]+)\}\}$/;

export function MarkdownContent({ content }: MarkdownContentProps) {
  const nodes = parseMarkdown(content);

  return (
    <div className={styles.deMarkdownContent}>
      {nodes.map((node, index) => {
        if (node.type === "heading") {
          return (
            <h2 key={`heading-${index}`} className={styles.deHeadingTwo}>
              {node.value}
            </h2>
          );
        }

        if (node.type === "paragraph") {
          return (
            <p key={`paragraph-${index}`} className={styles.deParagraph}>
              {renderInlineText(node.value)}
            </p>
          );
        }

        if (node.type === "list") {
          return (
            <ul key={`list-${index}`} className={styles.deList}>
              {node.value.map((item) => (
                <li key={item}>{renderInlineText(item)}</li>
              ))}
            </ul>
          );
        }

        return <WidgetRenderer key={`widget-${index}`} widgetId={node.value} />;
      })}
    </div>
  );
}

function renderInlineText(value: string) {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: Array<string | { label: string; href: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push(value.slice(lastIndex, match.index));
    }

    parts.push({ label: match[1], href: match[2] });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }

  if (parts.length === 0) {
    return value;
  }

  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <span key={`text-${index}`}>{part}</span>;
    }

    return (
      <a key={`link-${index}`} href={part.href}>
        {part.label}
      </a>
    );
  });
}

function parseMarkdown(content: string): ContentNode[] {
  const lines = content.split("\n");
  const nodes: ContentNode[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      nodes.push({ type: "paragraph", value: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  }

  function flushList() {
    if (listBuffer.length > 0) {
      nodes.push({ type: "list", value: listBuffer });
      listBuffer = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const widgetMatch = line.match(widgetPattern);
    if (widgetMatch) {
      flushParagraph();
      flushList();
      nodes.push({
        type: "widget",
        value: widgetMatch[1] as WidgetDefinition["id"],
      });
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      nodes.push({ type: "heading", value: line.replace(/^## /, "") });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(line.replace(/^- /, ""));
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return nodes;
}
