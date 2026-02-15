import { Suspense, useMemo } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

const tutorials = import.meta.glob("/src/data/tutorials/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export default function MarkdownViewer() {
  const { filename } = useParams();

  const markdownContent = useMemo(
    () => tutorials[`/src/data/tutorials/${filename}.md`],
    [filename],
  );

  if (!markdownContent) return null;
  return (
    <Suspense fallback={null}>
      <Markdown
        components={{
          h1({ ...props }) {
            return (
              <h1
                className="minecraft-font text-2xl text-(--primary)"
                {...props}
              />
            );
          },
          h2({ ...props }) {
            return <h2 className="text-xl font-bold" {...props} />;
          },
          h3({ ...props }) {
            return <h3 className="font-bold" {...props} />;
          },
          pre({ ...props }) {
            return (
              <pre
                className="w-full rounded-sm bg-black/80 px-2 py-1.5 text-white"
                {...props}
              />
            );
          },
          code({ ...props }) {
            return <code className="text-sm" {...props} />;
          },
          blockquote({ ...props }) {
            return (
              <blockquote
                className="rounded-sm bg-[#3d518c] px-2 py-1.5 text-white"
                {...props}
              />
            );
          },
          a({ ...props }) {
            return (
              <a
                className="underline transition-colors hover:text-(--secondary)"
                {...props}
              />
            );
          },
          li({ ...props }) {
            return <li className="list-inside list-disc" {...props} />;
          },
        }}
      >
        {markdownContent}
      </Markdown>
    </Suspense>
  );
}
