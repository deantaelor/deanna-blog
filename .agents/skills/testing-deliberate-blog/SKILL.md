---
name: testing-deliberate-blog
description: How to run end-to-end browser tests of the "Deliberate" static Next.js blog (deanna-blog) — dev server, routes, content invariants, narrow-viewport technique, and the known fragile spots (hand-rolled Markdown renderer + drop-cap CSS).
---

# Testing the Deliberate blog (deanna-blog)

## Setup
- Fully static: no credentials, DB, or env vars needed.
- `npm install` (if needed), then `npm run dev` → http://localhost:3000. Verify with
  `curl -s -o /dev/null -w '%{http_code}' localhost:3000` (000 means the server isn't up yet).
- Maximize Chrome before recording: `wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz`.
  Do NOT use `xdotool key super+Up` (tiles to half-screen on this WM).

## Devin Secrets Needed
None.

## Routes to cover
`/`, `/blog`, `/about`, `/books`, `/blog/<slug>` for each file in `content/posts/*.md`,
plus one unknown slug (e.g. `/blog/does-not-exist`) which must render the Next.js 404 page
(a red `GET ... 404 (Not Found)` network line in the console is expected there, not an app error).

## Content invariants worth deriving from source rather than trusting the UI
- `src/lib/posts.ts` sorts by frontmatter `date` descending; the newest post is the home lead story,
  and `/blog/[slug]` derives prev/next purely by index, so the newest article renders only a
  "← Previous" cell and the oldest only a "Next →" cell (empty sibling cell is correct, not a bug).
- Reading time = round(words/200), min 1 — cross-check rendered "N MIN READ" with a word count.
- Compare rendered article text against the `.md` body (strip tags) to catch dropped/duplicated blocks.

## Fragile spots — be adversarial here
- `src/lib/markdown.tsx` is hand-rolled: it only recognizes a block after splitting on blank lines,
  so `- `, `• `, `1. `, `> `, `#` markers only work at the start of a blank-line-separated block.
  Check on screen (not just in the DOM) that lists render with markers, that `**bold**`/`*italic*`
  are styled, and that no raw `**`, `*`, `-`, `1.`, `•` leak as visible text. Intentional literal
  `***` (censored profanity) may exist in a source file — confirm with the author before flagging.
- Drop cap: `.prose-editorial > p:first-of-type::first-letter` in `src/app/globals.css` uses a large
  `float: left` cap. Two failure modes seen in practice and likely to recur:
  1. A first letter with a thin glyph (capital "I" in Anton) renders as an unreadable red bar, so the
     paragraph appears to start mid-word ("t's been…").
  2. If the first paragraph is shorter than the cap's height, the float bleeds into the *second*
     paragraph and indents it. Reproduce with an essay whose first paragraph is one short line.
  Test at 1440px, 768px, and 375px — the bleed shows at every width.
- Some sources intentionally have no `>` blockquotes; `.prose-editorial blockquote` may only be
  exercised by the hand-written homepage pull quote. Confirm intent before reporting.

## Narrow-viewport technique
`wmctrl` cannot shrink the window below the WM's minimum width. Use Chrome DevTools device
emulation instead: F12 → toggle device toolbar → set Responsive width to 375 / 768. Dock DevTools
to the bottom so the emulated frame is fully visible in the recording. Numeric overflow check
(run once per page in the console):
`[document.documentElement.clientWidth, document.documentElement.scrollWidth, document.body.scrollWidth]`
— all three must be equal. The footer marquee (`.marquee { overflow:hidden }`) is expected to clip
its own text; verify it animates by comparing two zoomed screenshots a couple seconds apart.

## Flakiness note
Computer-use clicks in this Chrome instance can land on stale coordinates (a stray click opened the
article's YouTube companion link). Use one action per call with a short wait, and prefer `ctrl+l`
for URL entry — clicking the omnibox sometimes fails to take focus when DevTools has it.
