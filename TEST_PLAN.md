# Test plan — "Deliberate" editorial rebuild (PR #1)

Target: local dev server http://localhost:3000 (already running). Browser: Chrome, maximized.
Code refs: src/lib/markdown.tsx:3-81 (renderer), src/lib/posts.ts:37-67 (sort/readingTime/formatDate),
src/app/page.tsx:6-90 (lead story + In this issue + grid), src/app/blog/[slug]/page.tsx:27-105
(prev/next, drop cap container), src/app/globals.css:53-99 (drop cap, list, blockquote), layout.tsx:82-97 (marquee).

Expected structure derived from content/posts/*.md (block counts computed from source):
| slug | paras | list items | date | reading time |
|---|---|---|---|---|
| the-unspoken-truth-about-ambition | 29 | 0 | Jan 24, 2026 | 4 min |
| thinking-past-the-ceiling | 23 | 0 | Dec 23, 2025 | 4 min |
| scope-of-impact-the-illusion-of-speed | 51 | 12 (2 ol of 4, 1 ul of 4) | Oct 25, 2025 | 8 min |
| maybe-i-don-t-get-it | 46 | 0 | Oct 18, 2025 | 6 min |
| embrace-difference | 18 | 0 | Oct 2, 2025 | 4 min |

## T1 — Home page is a magazine cover with correct lead story and 5-item issue list
1. Go to `/` at 1440px.
Pass: lead headline is exactly "THE UNSPOKEN TRUTH ABOUT AMBITION" with kicker "The Latest — January 24, 2026";
"In this issue" lists exactly 5 numbered items 01–05 in date-descending order (Ambition, Thinking Past the Ceiling,
Scope of Impact, Maybe I Don't Get It, Embrace Difference); "More essays" grid shows exactly the other 4 with
real dates + "N min" (no NaN / Invalid Date). Fail: any 6th/duplicate item, wrong lead, NaN.

## T2 — Every nav + essay link resolves (no 404)
2. Click header nav "Essays" → `/blog`; verify 5 rows numbered 05→01 with dates and reading times matching table.
3. From `/blog` click each of the 5 essay rows in turn (returning via header logo/back) and confirm each renders an
article H1 matching the row title and a body, not the Next.js 404 page. Also click "Books" and "About".
Pass: all 8 destinations render their own H1; zero 404 pages. Fail: any 404 / empty body.

## T3 — Markdown renderer correctness (adversarial, scope-of-impact)
4. Open `/blog/scope-of-impact-the-illusion-of-speed`. Scroll the whole body.
Pass criteria (all must hold):
 - No visible raw `**`, `-` bullet chars, `> `, or leading `1.` text inside paragraph prose; the two numbered
   frameworks render as real `<ol>` lists (decimal markers in accent red, 4 items each, numbering restarts at 1
   in the "Again:" repeat) and the 4 takeaways render as a `<ul>` with square markers — NOT as plain paragraphs
   starting with "•".
 - Italic words ("is", "Scope of Impact", "slow down to speed up") are visibly slanted; the bolded words in the
   final "Best quote" paragraph (intimidating, daunting, corporate, connect the dots, achievement, means
   something to them, This is the way) are visibly bold with no `**` visible.
 - Body ends with "How Vercel Uses AI (June 2025)" — i.e. nothing dropped at the tail.
 - Paragraph/list counts: 51 `<p>` + 12 `<li>` (verified by zoomed screenshots of the list regions; counts also
   cross-checked against source via a one-off text-diff of rendered text vs .md body).
5. Text-fidelity diff: strip tags from the rendered article body and diff word sequence against the .md body
   for all 5 essays. Pass: zero missing or duplicated sentences (only expected differences: markdown markers
   removed, smart quotes/entities). Fail: any dropped or repeated block.
6. Open `/blog/maybe-i-don-t-get-it` and confirm blockquote expectation: the source has no `>` lines, so quoted
   passages render as normal paragraphs. Pass = render matches source (no stray `>` glyphs). Note as spec
   discrepancy if the PR claimed blockquote styling here (the only blockquote is the homepage pull quote at
   src/app/page.tsx:51).

## T4 — Drop cap: first paragraph only, no clipping/overlap
7. On `/blog/the-unspoken-truth-about-ambition` zoom into the first paragraph at 1440px, 768px, 375px.
Pass: exactly one large accent-red floated initial ("K") on the first paragraph; the following 2-3 lines of that
paragraph wrap cleanly to the right of it with no character overlap and no clipped glyph top/bottom; the second
and third paragraphs have normal-size first letters. Fail: drop cap on multiple paragraphs, letter overlapping
text, or clipped/cut-off cap.

## T5 — prev/next chronology and endpoints
8. On `/blog/the-unspoken-truth-about-ambition` (newest): pass = only "← Previous: Thinking Past the Ceiling"
   shown; the Next cell is empty with no clickable link/blank box artifact.
9. Click Previous through the chain: Ambition → Thinking Past the Ceiling → Scope of Impact → Maybe I Don't Get It
   → Embrace Difference. Pass: each Previous target is the next-older essay by date, each landing page H1 matches
   the link text. On Embrace Difference (oldest): only "Next → Maybe I Don't Get It" shown, Previous cell empty.
   Click Next once and confirm it returns to Maybe I Don't Get It.

## T6 — Layout integrity at 375 / 768 / 1440 + marquee
10. At each width, on `/` and one article and `/books`: pass = no horizontal page scrollbar
    (document.scrollWidth === clientWidth), headlines wrap rather than being clipped by the viewport,
    /books long titles/descriptions stay inside their grid cells with no overlap, and the footer marquee is
    visibly animating (two screenshots seconds apart show shifted text) while not adding page-wide horizontal scroll.

## T7 — Console clean on every route
11. Visit `/`, `/blog`, all 5 articles, `/about`, `/books`, and `/blog/does-not-exist`; read browser console.
Pass: no errors; only expected Next.js dev notices. `/blog/does-not-exist` shows the 404 page (intentional).
