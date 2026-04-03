import { SafeMdxRenderer } from "safe-mdx";
import { mdxParse } from "safe-mdx/parse";
import { MDXRoot } from "./_mdx/mdx-root";
import { RenderNode } from "safe-mdx/src/safe-mdx";
import { CodeRenderer } from "./_mdx/code-renderer";

export type TAssistantMessageBoxProps = {
  message: string;
};

const codeRenderer: RenderNode = (node) => {
  if (node.type === "code") {
    return (
      <CodeRenderer language={node.lang || "js"} meta={node.meta}>
        {node.value}
      </CodeRenderer>
    );
  }
};

export function AssistantMessageBox(props: TAssistantMessageBoxProps) {
  const { message } = props;
  const ast = mdxParse(message);

  return (
    <MDXRoot>
      <SafeMdxRenderer
        markdown={message}
        mdast={ast}
        renderNode={codeRenderer}
      />
    </MDXRoot>
  );
}
