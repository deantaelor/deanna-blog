import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About De'Anna Green — doing the most, on purpose.",
};

const stack = [
  ["Next.js 16", "App Router, static generation"],
  ["Markdown", "Essays as plain files, versioned in git"],
  ["Tailwind CSS 4", "Styling"],
  ["TypeScript", "Type safety"],
  ["Vercel", "Hosting and deployments"],
  ["Devin", "Built and maintained with an AI engineer"],
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="py-10 md:py-14 border-b-2 border-ink">
        <p className="kicker text-accent mb-3">The Author</p>
        <h1 className="headline text-6xl md:text-8xl">
          Doing the most,
          <br />
          on purpose<span className="text-accent">.</span>
        </h1>
      </div>

      <div className="grid md:grid-cols-12 gap-8 py-10 md:py-14">
        <div className="md:col-span-7">
          <div className="prose-editorial">
            <p className="lede">
              My name is De&apos;. By day, I work in enterprise sales, helping
              drive growth for a company building the infrastructure behind the
              modern web.
            </p>
            <p>
              But I&apos;m more than a job title. This space is my personal
              soundboard and playground; a place to experiment, learn web
              development, and explore ideas as they evolve. As the world
              keeps changing, so do my thoughts and interests. Hopefully,
              yours do too.
            </p>
            <p>
              Follow along and connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/msdeannagreen/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="kicker border-b border-ink pb-2 mb-4">Site stack</p>
          <ul className="space-y-4">
            {stack.map(([name, note]) => (
              <li key={name}>
                <p className="headline text-xl">{name}</p>
                <p className="text-sm opacity-70">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
