import ScrollReveal from "./ScrollReveal";

export default function ForWho() {
  return (
    <section id="for-who" className="py-24 sm:py-36 bg-[#FCFCFC]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            Two Sides, One Platform
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1] text-text max-w-lg">
            Whether you need care
            <br />
            or provide it.
          </h2>
        </ScrollReveal>

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-2 gap-5 sm:gap-6">
          {/* For Patients */}
          <ScrollReveal delay={0} scale>
            <div className="bento-card p-7 sm:p-9 h-full relative overflow-hidden group">
              {/* Decorative background number */}
              <span
                className="absolute -top-4 -right-2 text-[8rem] sm:text-[10rem] font-extrabold text-primary/[0.02] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                PT
              </span>

              <div className="relative">
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/[0.06] text-primary text-[10px] font-semibold tracking-wider uppercase mb-6">
                  For Patients
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text mb-3 leading-tight">
                  Recovery
                  <br />
                  <span className="text-text-secondary font-light italic">
                    on your terms.
                  </span>
                </h3>

                <p className="text-sm text-text-secondary leading-[1.7] mb-8 max-w-sm">
                  No more commuting to clinics. Professional physiotherapy
                  care, right where you&apos;re most comfortable.
                </p>

                <div className="space-y-3">
                  {[
                    "Browse by specialization & area",
                    "Flexible treatment packages",
                    "Consult before you commit",
                    "Track your recovery progress",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[13px] text-text-secondary"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#signup"
                  className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-primary hover:text-primary-hover transition-colors group/link"
                >
                  I need physiotherapy
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* For Physiotherapists */}
          <ScrollReveal delay={150} scale>
            <div className="bento-card p-7 sm:p-9 h-full relative overflow-hidden bg-dark group">
              {/* Decorative background number */}
              <span
                className="absolute -top-4 -right-2 text-[8rem] sm:text-[10rem] font-extrabold text-white/[0.02] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                DR
              </span>

              <div className="relative">
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-semibold tracking-wider uppercase mb-6">
                  For Physiotherapists
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                  Grow your
                  <br />
                  <span className="text-white/50 font-light italic">
                    practice.
                  </span>
                </h3>

                <p className="text-sm text-white/50 leading-[1.7] mb-8 max-w-sm">
                  Reach more patients, manage your calendar, set your own
                  packages and pricing — all from one platform.
                </p>

                <div className="space-y-3">
                  {[
                    "Get verified & build your profile",
                    "Set your own packages & pricing",
                    "Manage calendar & availability",
                    "Detailed session & patient notes",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[13px] text-white/50"
                    >
                      <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#signup"
                  className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-white/80 hover:text-white transition-colors group/link"
                >
                  I&apos;m a physiotherapist
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
