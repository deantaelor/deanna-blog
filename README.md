# Deliberate

De'Anna Green's blog — essays on ambition, impact, and thinking past the ceiling.

Built with Next.js 16 (App Router), Tailwind CSS 4, and TypeScript. Essays live as
Markdown files in `content/posts/` and are statically rendered at build time.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build + type check
npm run lint
```

## Writing a new essay

Add a Markdown file to `content/posts/<slug>.md`. The slug becomes the URL
(`/blog/<slug>`). Frontmatter:

```md
---
title: "Essay title"
date: "2026-02-01"
category: "Ambition"
excerpt: "One or two sentences shown on the home page and archive."
video: "https://www.youtube.com/watch?v=..."   # optional companion track
---

Body text. Blank lines separate paragraphs. `## Heading`, `> quote`,
`- bullet`, `1. numbered`, `**bold**`, and `*italic*` are supported.
```

Reading time is calculated automatically. The newest essay by `date` becomes the
lead story on the home page.
