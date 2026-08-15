import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <article className="mx-auto max-w-6xl px-4 md:px-6">
      <header className="py-10 md:py-16 border-b-2 border-ink">
        <div className="flex flex-wrap gap-x-6 gap-y-2 kicker text-accent mb-5">
          <span>{post.category}</span>
          <span className="text-ink">{formatDate(post.date)}</span>
          <span className="text-ink opacity-70">
            {post.readingTime} min read
          </span>
        </div>
        <h1 className="headline text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl italic max-w-2xl leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-8 py-10 md:py-14">
        <aside className="md:col-span-3 order-last md:order-first">
          <div className="md:sticky md:top-8 space-y-8">
            <div>
              <p className="kicker border-b border-ink pb-2 mb-3">Byline</p>
              <p className="leading-relaxed">
                De&apos;Anna Green — mom of two, Enterprise at Vercel, doing
                the most on purpose.
              </p>
            </div>
            {post.video && (
              <div>
                <p className="kicker border-b border-ink pb-2 mb-3">
                  Companion track
                </p>
                <a
                  href={post.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kicker inline-block border-2 border-ink px-4 py-3 hover:bg-accent hover:border-accent hover:text-paper transition-colors"
                >
                  ▶ Watch / Listen ↗
                </a>
              </div>
            )}
          </div>
        </aside>
        <div className="md:col-span-8 md:col-start-5">
          <div className="prose-editorial max-w-2xl">
            {renderMarkdown(post.body)}
          </div>
        </div>
      </div>

      <nav className="border-t-2 border-ink grid sm:grid-cols-2">
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-ink">
          {older && (
            <Link href={`/blog/${older.slug}`} className="group block">
              <p className="kicker mb-2">← Previous</p>
              <p className="headline text-2xl group-hover:text-accent transition-colors">
                {older.title}
              </p>
            </Link>
          )}
        </div>
        <div className="p-6 sm:text-right">
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group block">
              <p className="kicker mb-2">Next →</p>
              <p className="headline text-2xl group-hover:text-accent transition-colors">
                {newer.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
