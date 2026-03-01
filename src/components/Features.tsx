"use client";

import ScrollReveal from "./ScrollReveal";

const features = [
  {
    title: "Verified Professionals",
    body: "Every therapist is credential-checked. View qualifications, experience, and real patient reviews.",
    region: "head",
    gradient: "from-blue-50 to-indigo-50",
    accentColor: "#4F46E5",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Home Visits Only",
    body: "No clinic commute. Your therapist arrives equipped and ready — physiotherapy happens where you're most comfortable.",
    region: "left-arm",
    gradient: "from-emerald-50 to-teal-50",
    accentColor: "#059669",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Flexible Packages",
    body: "Starter (3), Standard (5), or Intensive (12) sessions. Choose what fits your recovery.",
    region: "right-arm",
    gradient: "from-amber-50 to-orange-50",
    accentColor: "#D97706",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "Book Consultations",
    body: "Not sure? Start with a quick consultation — online or at home — before committing to a full package.",
    region: "torso-left",
    gradient: "from-rose-50 to-pink-50",
    accentColor: "#E11D48",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    title: "Track Progress",
    body: "Session notes, completion tracking, and clear visibility into your recovery journey.",
    region: "torso-right",
    gradient: "from-violet-50 to-purple-50",
    accentColor: "#7C3AED",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Direct Payment",
    body: "Pay your therapist directly — cash or UPI. No middleman. Prices set by the therapist.",
    region: "base",
    gradient: "from-cyan-50 to-sky-50",
    accentColor: "#0891B2",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

/* Anatomical SVG skeleton connecting the cards */
function BodySkeleton() {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Head circle */}
      <circle cx="200" cy="50" r="30" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" />
      <circle cx="200" cy="50" r="4" fill="#0066FF" opacity="0.15" />

      {/* Neck */}
      <line x1="200" y1="80" x2="200" y2="110" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" />

      {/* Shoulders */}
      <path d="M200 110 Q200 120, 140 130" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" strokeLinecap="round" />
      <path d="M200 110 Q200 120, 260 130" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" strokeLinecap="round" />

      {/* Shoulder joints */}
      <circle cx="140" cy="130" r="6" fill="#0066FF" opacity="0.06" />
      <circle cx="260" cy="130" r="6" fill="#0066FF" opacity="0.06" />
      <circle cx="140" cy="130" r="2.5" fill="#0066FF" opacity="0.15" />
      <circle cx="260" cy="130" r="2.5" fill="#0066FF" opacity="0.15" />

      {/* Arms */}
      <path d="M140 130 Q120 200, 100 250" stroke="#0066FF" strokeWidth="1.2" opacity="0.06" strokeLinecap="round" />
      <path d="M260 130 Q280 200, 300 250" stroke="#0066FF" strokeWidth="1.2" opacity="0.06" strokeLinecap="round" />

      {/* Elbow joints */}
      <circle cx="100" cy="250" r="4" fill="#0066FF" opacity="0.06" />
      <circle cx="300" cy="250" r="4" fill="#0066FF" opacity="0.06" />

      {/* Spine */}
      <path d="M200 110 L200 380" stroke="#0066FF" strokeWidth="1.5" opacity="0.06" strokeDasharray="4 6" />

      {/* Ribcage hints */}
      <path d="M200 150 Q160 160, 145 155" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />
      <path d="M200 150 Q240 160, 255 155" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />
      <path d="M200 180 Q165 188, 150 185" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />
      <path d="M200 180 Q235 188, 250 185" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />
      <path d="M200 210 Q170 216, 158 213" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />
      <path d="M200 210 Q230 216, 242 213" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />

      {/* Core / torso center */}
      <circle cx="200" cy="280" r="3" fill="#0066FF" opacity="0.1" />

      {/* Hip structure */}
      <path d="M200 380 Q200 400, 150 410" stroke="#0066FF" strokeWidth="1.5" opacity="0.06" strokeLinecap="round" />
      <path d="M200 380 Q200 400, 250 410" stroke="#0066FF" strokeWidth="1.5" opacity="0.06" strokeLinecap="round" />

      {/* Hip joints */}
      <circle cx="150" cy="410" r="6" fill="#0066FF" opacity="0.05" />
      <circle cx="250" cy="410" r="6" fill="#0066FF" opacity="0.05" />
      <circle cx="150" cy="410" r="2.5" fill="#0066FF" opacity="0.12" />
      <circle cx="250" cy="410" r="2.5" fill="#0066FF" opacity="0.12" />

      {/* Legs */}
      <path d="M150 410 Q145 480, 140 540" stroke="#0066FF" strokeWidth="1.2" opacity="0.05" strokeLinecap="round" />
      <path d="M250 410 Q255 480, 260 540" stroke="#0066FF" strokeWidth="1.2" opacity="0.05" strokeLinecap="round" />

      {/* Knee joints */}
      <circle cx="140" cy="540" r="4" fill="#0066FF" opacity="0.05" />
      <circle cx="260" cy="540" r="4" fill="#0066FF" opacity="0.05" />

      {/* Decorative pulse rings at key joints */}
      <circle cx="200" cy="50" r="20" stroke="#0066FF" strokeWidth="0.5" opacity="0.04">
        <animate attributeName="r" values="20;35;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.04;0;0.04" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="280" r="15" stroke="#0066FF" strokeWidth="0.5" opacity="0.04">
        <animate attributeName="r" values="15;30;15" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.04;0;0.04" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 100} scale>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${feature.gradient} p-6 sm:p-7 transition-all duration-500 hover:shadow-lg hover:-translate-y-1`}
        style={{
          "--card-accent": feature.accentColor,
        } as React.CSSProperties}
      >
        {/* Subtle anatomical line art background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {feature.region === "head" && (
              <>
                <circle cx="100" cy="80" r="50" stroke={feature.accentColor} strokeWidth="1" />
                <circle cx="100" cy="80" r="35" stroke={feature.accentColor} strokeWidth="0.5" />
                <path d="M70 95 Q100 130 130 95" stroke={feature.accentColor} strokeWidth="0.8" />
              </>
            )}
            {feature.region === "left-arm" && (
              <>
                <path d="M150 20 Q100 80 80 160" stroke={feature.accentColor} strokeWidth="1" />
                <circle cx="120" cy="60" r="12" stroke={feature.accentColor} strokeWidth="0.8" />
                <circle cx="90" cy="120" r="8" stroke={feature.accentColor} strokeWidth="0.8" />
              </>
            )}
            {feature.region === "right-arm" && (
              <>
                <path d="M50 20 Q100 80 120 160" stroke={feature.accentColor} strokeWidth="1" />
                <circle cx="80" cy="60" r="12" stroke={feature.accentColor} strokeWidth="0.8" />
                <circle cx="110" cy="120" r="8" stroke={feature.accentColor} strokeWidth="0.8" />
              </>
            )}
            {feature.region === "torso-left" && (
              <>
                <path d="M60 30 Q80 100 70 170" stroke={feature.accentColor} strokeWidth="1" />
                <path d="M100 20 Q90 100 95 180" stroke={feature.accentColor} strokeWidth="0.5" />
                <path d="M140 40 Q120 100 130 160" stroke={feature.accentColor} strokeWidth="0.5" />
              </>
            )}
            {feature.region === "torso-right" && (
              <>
                <path d="M40 50 L160 50" stroke={feature.accentColor} strokeWidth="0.5" />
                <path d="M50 90 L150 90" stroke={feature.accentColor} strokeWidth="0.5" />
                <path d="M60 130 L140 130" stroke={feature.accentColor} strokeWidth="0.5" />
                <rect x="60" y="40" width="80" height="120" rx="8" stroke={feature.accentColor} strokeWidth="0.8" />
              </>
            )}
            {feature.region === "base" && (
              <>
                <path d="M100 20 L60 180" stroke={feature.accentColor} strokeWidth="0.8" />
                <path d="M100 20 L140 180" stroke={feature.accentColor} strokeWidth="0.8" />
                <circle cx="100" cy="20" r="10" stroke={feature.accentColor} strokeWidth="0.8" />
                <circle cx="60" cy="180" r="6" stroke={feature.accentColor} strokeWidth="0.5" />
                <circle cx="140" cy="180" r="6" stroke={feature.accentColor} strokeWidth="0.5" />
              </>
            )}
          </svg>
        </div>

        {/* Accent line on top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{ background: feature.accentColor }}
        />

        <div className="relative">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: `${feature.accentColor}10`,
              color: feature.accentColor,
            }}
          >
            {feature.icon}
          </div>
          <h3 className="text-base sm:text-[17px] font-bold text-text mb-2">
            {feature.title}
          </h3>
          <p className="text-[13px] sm:text-sm text-text-secondary leading-[1.7]">
            {feature.body}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 sm:py-28 lg:py-36 bg-surface wave-divider relative"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative z-10 pt-8 sm:pt-10">
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

        {/* Anatomical body layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 relative">
          {/* Center skeleton SVG - only visible on lg+ */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-[300px] h-full pointer-events-none select-none z-0">
            <BodySkeleton />
          </div>

          {/* Cards arranged around the body */}
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
            {/* Row 1: Head — Verified Professionals (centered, top) */}
            <div className="lg:flex lg:justify-center">
              <div className="lg:w-[380px]">
                <FeatureCard feature={features[0]} index={0} />
              </div>
            </div>

            {/* Row 2: Arms — Home Visits (left) + Flexible Packages (right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-40">
              <FeatureCard feature={features[1]} index={1} />
              <FeatureCard feature={features[2]} index={2} />
            </div>

            {/* Row 3: Torso — Book Consultations (left) + Track Progress (right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-28 lg:px-8">
              <FeatureCard feature={features[3]} index={3} />
              <FeatureCard feature={features[4]} index={4} />
            </div>

            {/* Row 4: Base — Direct Payment (centered, bottom) */}
            <div className="lg:flex lg:justify-center">
              <div className="lg:w-[420px]">
                <FeatureCard feature={features[5]} index={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
