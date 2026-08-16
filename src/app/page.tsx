import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const [feature, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <section className="border-b-2 border-ink py-10 md:py-16 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <p className="kicker text-accent mb-4">
            The Latest — {formatDate(feature.date)}
          </p>
          <Link href={`/blog/${feature.slug}`} className="group">
            <h1 className="headline text-5xl md:text-7xl lg:text-8xl group-hover:text-accent transition-colors">
              {feature.title}
            </h1>
          </Link>
          <p className="mt-6 text-lg md:text-xl max-w-2xl leading-relaxed">
            {feature.excerpt}
          </p>
          <Link
            href={`/blog/${feature.slug}`}
            className="kicker inline-block mt-6 border-2 border-ink px-5 py-3 hover:bg-ink hover:text-paper transition-colors"
          >
            Read the essay →
          </Link>
        </div>
        <div className="md:col-span-4 md:border-l md:border-ink md:pl-8 flex flex-col justify-between gap-8">
          <div>
            <p className="kicker border-b border-ink pb-2 mb-4">
              In this issue
            </p>
            <ul className="space-y-3">
              {posts.map((p, i) => (
                <li key={p.slug} className="flex gap-3 items-baseline">
                  <span className="headline text-accent text-xl w-7 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="hover:text-accent transition-colors leading-snug"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="border-t-2 border-ink pt-4 italic text-lg leading-relaxed">
            &ldquo;I&apos;d rather build a home: a warm, inviting home that
            welcomes everyone to find their way in.&rdquo;
            <footer className="kicker not-italic mt-2">
              — Maybe I Don&apos;t Get It
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-3 mb-8">
          <h2 className="headline text-3xl md:text-4xl">More essays</h2>
          <Link
            href="/blog"
            className="kicker hover:text-accent transition-colors"
          >
            All essays →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink border border-ink">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group bg-paper p-6 flex flex-col gap-4 hover:bg-ink hover:text-paper transition-colors"
            >
              <p className="kicker text-accent">{p.category}</p>
              <h3 className="headline text-2xl leading-tight group-hover:text-paper">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80 flex-1">
                {p.excerpt}
              </p>
              <p className="kicker opacity-60">
                {formatDate(p.date)} · {p.readingTime} min
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
