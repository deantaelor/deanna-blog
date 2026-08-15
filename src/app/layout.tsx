import type { Metadata } from "next";
import { Anton, Lora, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "On Wax — De'Anna Green",
    template: "%s — On Wax",
  },
  description:
    "Putting thoughts on wax. Essays on ambition, impact, and thinking past the ceiling, by De'Anna Green.",
};

const nav = [
  { href: "/blog", label: "Essays" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
] as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${lora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b-2 border-ink">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex items-center justify-between py-3">
              <p className="kicker">Est. 2025 — Vol. II</p>
              <p className="kicker hidden sm:block">
                Doing the most, on purpose
              </p>
              <a
                href="https://www.linkedin.com/in/msdeannagreen/"
                target="_blank"
                rel="noopener noreferrer"
                className="kicker hover:text-accent transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="border-t border-ink py-4 md:py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <Link href="/" className="block">
                <span className="headline text-6xl md:text-8xl">
                  On&nbsp;Wax<span className="text-accent">.</span>
                </span>
              </Link>
              <nav className="flex gap-6 pb-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="kicker text-sm hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t-2 border-ink mt-16">
          <div className="marquee border-b border-ink py-2" aria-hidden>
            {[0, 1].map((i) => (
              <div key={i} className="marquee-track kicker gap-8 pr-8">
                {Array.from({ length: 6 }).map((_, j) => (
                  <span key={j} className="flex gap-8">
                    <span>Competition is beautiful</span>
                    <span className="text-accent">✶</span>
                    <span>Ambition is sacred</span>
                    <span className="text-accent">✶</span>
                    <span>Limits cease to exist to those destined</span>
                    <span className="text-accent">✶</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 flex flex-col sm:flex-row justify-between gap-2">
            <p className="kicker">
              © {new Date().getFullYear()} De&apos;Anna Green
            </p>
            <p className="kicker">Written, not whispered.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
