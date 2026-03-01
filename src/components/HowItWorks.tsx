import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Browse & Choose",
    body: "Search verified physiotherapists by specialization, area, and patient reviews. Find someone who fits your needs.",
  },
  {
    number: "02",
    title: "Book a Session",
    body: "Pick a treatment package or start with a consultation. Choose a time slot — at your home or online.",
  },
  {
    number: "03",
    title: "Recover at Home",
    body: "Your physiotherapist comes to you. Track every session, monitor your progress, get better — all from home.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 sm:py-36 bg-[#FCFCFC] relative">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            The Process
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1] text-text max-w-md">
            Three steps to
            <br />
            recovery.
          </h2>
        </ScrollReveal>

        <div className="mt-16 sm:mt-24 space-y-0">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 120}>
              <div
                className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-10 sm:py-14 ${
                  i < steps.length - 1
                    ? "border-b border-border/50"
                    : ""
                }`}
              >
                {/* Big number */}
                <div className="shrink-0">
                  <span className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-extrabold leading-none text-primary/[0.06] select-none">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 sm:pt-4">
                  <h3 className="text-lg sm:text-xl font-bold text-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-[1.8] max-w-md">
                    {step.body}
                  </p>
                </div>

                {/* Decorative dash */}
                <div className="hidden lg:flex items-center self-center">
                  <div className="w-12 h-px bg-gradient-to-r from-primary/10 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
