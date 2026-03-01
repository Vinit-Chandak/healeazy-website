import ScrollReveal from "./ScrollReveal";

const features = [
  {
    title: "Home Visits Only",
    body: "No clinic commute. Your therapist arrives equipped and ready — physiotherapy happens where you're most comfortable.",
    span: "col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2",
    large: true,
  },
  {
    title: "Verified Professionals",
    body: "Every therapist is credential-checked. View qualifications, experience, and real patient reviews.",
    span: "col-span-1",
    large: false,
  },
  {
    title: "Flexible Packages",
    body: "Starter (3), Standard (5), or Intensive (12) sessions. Choose what fits your recovery.",
    span: "col-span-1",
    large: false,
  },
  {
    title: "Book Consultations",
    body: "Not sure? Start with a quick consultation — online or at home — before committing to a full package.",
    span: "col-span-1",
    large: false,
  },
  {
    title: "Track Progress",
    body: "Session notes, completion tracking, and clear visibility into your recovery journey.",
    span: "col-span-1",
    large: false,
  },
  {
    title: "Direct Payment",
    body: "Pay your therapist directly — cash or UPI. No middleman. Prices set by the therapist.",
    span: "col-span-1 sm:col-span-2",
    large: false,
  },
];

const icons = [
  // Home
  <svg key="0" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>,
  // Shield
  <svg key="1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>,
  // Package
  <svg key="2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>,
  // Phone
  <svg key="3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>,
  // Chart
  <svg key="4" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>,
  // Currency
  <svg key="5" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>,
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-36 bg-surface wave-divider relative">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10 pt-10">
        <ScrollReveal>
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            What You Get
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1] text-text max-w-sm">
            Built around
            <br />
            real needs.
          </h2>
        </ScrollReveal>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto">
          {features.map((feature, i) => (
            <ScrollReveal
              key={feature.title}
              delay={i * 80}
              scale
              className={feature.span}
            >
              <div
                className={`bento-card h-full ${
                  feature.large
                    ? "p-7 sm:p-9 flex flex-col justify-between"
                    : "p-6 sm:p-7"
                }`}
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-primary/[0.06] flex items-center justify-center text-primary mb-5">
                    {icons[i]}
                  </div>
                  <h3
                    className={`font-bold text-text mb-2 ${
                      feature.large
                        ? "text-lg sm:text-xl"
                        : "text-[15px]"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-text-secondary leading-[1.7] ${
                      feature.large ? "text-sm" : "text-[13px]"
                    }`}
                  >
                    {feature.body}
                  </p>
                </div>

                {feature.large && (
                  <div className="mt-8 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((j) => (
                        <div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          style={{ opacity: 0.2 + j * 0.15 }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-text-muted tracking-wide">
                      CORE FEATURE
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
