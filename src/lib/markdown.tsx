import React from "react";

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(pattern)) {
    const idx = match.index ?? 0;
    if (idx > last) nodes.push(text.slice(last, idx));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    last = idx + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type ListBlock = { type: "ul" | "ol"; items: string[] };

export function renderMarkdown(body: string): React.ReactNode {
  const blocks = body
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const output: React.ReactNode[] = [];
  let list: ListBlock | null = null;
  let key = 0;

  const flushList = () => {
    if (!list) return;
    const items = list.items.map((item, i) => (
      <li key={i}>{renderInline(item)}</li>
    ));
    output.push(
      list.type === "ul" ? (
        <ul key={key++}>{items}</ul>
      ) : (
        <ol key={key++}>{items}</ol>
      )
    );
    list = null;
  };

  for (const block of blocks) {
    const bullet = block.match(/^[-•]\s+([\s\S]*)$/);
    const numbered = block.match(/^\d+\.\s+([\s\S]*)$/);
    if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      const text = (bullet ?? numbered)![1].replace(/\s+/g, " ");
      if (list && list.type === type) {
        list.items.push(text);
      } else {
        flushList();
        list = { type, items: [text] };
      }
      continue;
    }
    flushList();
    if (block.startsWith("### ")) {
      output.push(<h3 key={key++}>{renderInline(block.slice(4))}</h3>);
    } else if (block.startsWith("## ")) {
      output.push(<h2 key={key++}>{renderInline(block.slice(3))}</h2>);
    } else if (block.startsWith("# ")) {
      output.push(<h2 key={key++}>{renderInline(block.slice(2))}</h2>);
    } else if (block.startsWith("> ")) {
      output.push(
        <blockquote key={key++}>{renderInline(block.slice(2))}</blockquote>
      );
    } else {
      output.push(<p key={key++}>{renderInline(block)}</p>);
    }
  }
  flushList();
  return <>{output}</>;
}
