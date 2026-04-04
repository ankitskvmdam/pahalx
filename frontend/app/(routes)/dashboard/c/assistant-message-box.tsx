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

function normalizeMDX(input: string) {
  return input
    .replace(/\u2011/g, "-") // non-breaking hyphen
    .replace(/\u2013/g, "-") // en dash
    .replace(/\u2014/g, "-") // em dash
    .replace(/\u2248/g, "~") // approx
    .replace(/\u202F/g, " ") // narrow no-break space
    .replace(/[“”]/g, '"') // smart quotes
    .replace(/[‘’]/g, "'"); // smart apostrophes
}

export function AssistantMessageBox(props: TAssistantMessageBoxProps) {
  const { message } = props;
  const n = normalizeMDX(message);
  const ast = mdxParse(n);

  return (
    <MDXRoot>
      <SafeMdxRenderer markdown={n} mdast={ast} renderNode={codeRenderer} />
    </MDXRoot>
  );
}
