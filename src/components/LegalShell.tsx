import Link from "next/link";
import Footer from "./Footer";

type TocItem = { id: string; title: string };

interface LegalShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  toc?: TocItem[];
  children: React.ReactNode;
}

export default function LegalShell({
  eyebrow,
  title,
  intro,
  lastUpdated,
  toc,
  children,
}: LegalShellProps) {
  return (
    <>
      {/* ── Slim top nav (no client JS needed) ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-5 px-4">
        <nav className="island-nav rounded-full px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-6 h-12 sm:h-[52px]">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-extrabold text-[8px] leading-none">
                  K
                </span>
              </div>
              <span className="font-bold text-sm tracking-tight text-text">
                Kyuro
              </span>
            </Link>

            <div className="w-px h-5 bg-border/60" aria-hidden="true" />

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text transition-colors duration-200"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to home
            </Link>
          </div>
        </nav>
      </div>

      {/* ── Ambient background glow ── */}
      <div
        className="pointer-events-none fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-40 blur-[120px] -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(67,186,238,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* ── Header ── */}
          <header className="border-b border-border/50 pb-10 sm:pb-14 mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-[-0.02em] leading-[1.05] text-text">
              {title}
            </h1>
            <p className="mt-5 sm:mt-6 text-sm sm:text-[15px] text-text-secondary leading-[1.75] max-w-xl">
              {intro}
            </p>
            <p className="mt-6 sm:mt-7 text-[10px] sm:text-[11px] text-text-muted tracking-[0.18em] uppercase">
              Last updated · {lastUpdated}
            </p>
          </header>

          {/* ── Table of Contents ── */}
          {toc && toc.length > 0 && (
            <nav
              aria-label="Table of contents"
              className="mb-12 sm:mb-14 rounded-2xl border border-border/60 bg-white/50 p-5 sm:p-6"
            >
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
                On this page
              </p>
              <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline gap-2.5 text-[13px] text-text-secondary hover:text-primary transition-colors duration-200 leading-[1.5]"
                    >
                      <span className="text-[10px] text-primary/50 group-hover:text-primary tabular-nums font-bold shrink-0 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* ── Content ── */}
          <article className="space-y-14 sm:space-y-16">{children}</article>

          {/* ── Cross-link ── */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-text-muted">
            <span>
              Questions?{" "}
              <a
                href="mailto:support@kyuro.app"
                className="text-primary hover:text-primary-hover transition-colors"
              >
                support@kyuro.app
              </a>
            </span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-text transition-colors"
              >
                Privacy
              </Link>
              <span className="text-border" aria-hidden="true">
                ·
              </span>
              <Link
                href="/terms"
                className="hover:text-text transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
