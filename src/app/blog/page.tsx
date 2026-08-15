import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Essays",
  description: "All essays — ambition, impact, and thinking past the ceiling.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="py-10 md:py-14 border-b-2 border-ink">
        <p className="kicker text-accent mb-3">The Archive</p>
        <h1 className="headline text-6xl md:text-8xl">Essays</h1>
        <p className="mt-4 max-w-xl text-lg">
          Loud, abrasive ideas on a calm page. Every essay, newest first.
        </p>
      </div>
      <ol>
        {posts.map((p, i) => (
          <li key={p.slug} className="border-b border-ink">
            <Link
              href={`/blog/${p.slug}`}
              className="group grid md:grid-cols-12 gap-2 md:gap-6 py-8 items-baseline hover:bg-ink hover:text-paper transition-colors md:px-4 md:-mx-4"
            >
              <span className="headline text-accent text-4xl md:col-span-1">
                {String(posts.length - i).padStart(2, "0")}
              </span>
              <div className="md:col-span-7">
                <h2 className="headline text-3xl md:text-5xl group-hover:text-paper">
                  {p.title}
                </h2>
                <p className="mt-3 leading-relaxed opacity-80 max-w-2xl">
                  {p.excerpt}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right flex md:block gap-4">
                <p className="kicker text-accent">{p.category}</p>
                <p className="kicker opacity-70 md:mt-2">
                  {formatDate(p.date)} · {p.readingTime} min read
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
