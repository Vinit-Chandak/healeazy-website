"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    title: "Verified Professionals",
    body: "Every therapist is credential-checked. View qualifications, experience, and real patient reviews.",
    accentColor: "#4F46E5",
    hotspot: { x: 200, y: 55 },
    side: "left" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Home Visits Only",
    body: "No clinic commute. Your therapist arrives equipped and ready — physiotherapy happens where you're most comfortable.",
    accentColor: "#059669",
    hotspot: { x: 120, y: 170 },
    side: "left" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Flexible Packages",
    body: "Starter (3), Standard (5), or Intensive (12) sessions. Choose what fits your recovery.",
    accentColor: "#D97706",
    hotspot: { x: 280, y: 170 },
    side: "right" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "Book Consultations",
    body: "Not sure? Start with a quick consultation — online or at home — before committing to a full package.",
    accentColor: "#E11D48",
    hotspot: { x: 155, y: 310 },
    side: "left" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    title: "Track Progress",
    body: "Session notes, completion tracking, and clear visibility into your recovery journey.",
    accentColor: "#7C3AED",
    hotspot: { x: 245, y: 310 },
    side: "right" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Direct Payment",
    body: "Pay your therapist directly — cash or UPI. No middleman. Prices set by the therapist.",
    accentColor: "#0891B2",
    hotspot: { x: 200, y: 440 },
    side: "right" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

/* ─── Interactive Body Map SVG ─── */
function BodyMap({
  activeIndex,
  onSelect,
  className = "",
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full select-none ${className}`}
      aria-label="Interactive body map"
    >
      {/* ── Human silhouette ── */}
      {/* Head */}
      <circle cx="200" cy="52" r="30" stroke="#0066FF" strokeWidth="1.5" opacity="0.1" />

      {/* Neck */}
      <path d="M200 82 V108" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" strokeLinecap="round" />

      {/* Shoulders */}
      <path d="M200 108 C195 116, 168 128, 128 138" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" strokeLinecap="round" />
      <path d="M200 108 C205 116, 232 128, 272 138" stroke="#0066FF" strokeWidth="1.5" opacity="0.08" strokeLinecap="round" />

      {/* Arms */}
      <path d="M128 138 C118 185, 108 225, 92 270" stroke="#0066FF" strokeWidth="1.2" opacity="0.06" strokeLinecap="round" />
      <path d="M272 138 C282 185, 292 225, 308 270" stroke="#0066FF" strokeWidth="1.2" opacity="0.06" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="90" cy="275" r="7" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />
      <circle cx="310" cy="275" r="7" stroke="#0066FF" strokeWidth="0.8" opacity="0.04" />

      {/* Torso sides */}
      <path d="M163 122 C158 195, 156 285, 163 370" stroke="#0066FF" strokeWidth="1.2" opacity="0.08" strokeLinecap="round" />
      <path d="M237 122 C242 195, 244 285, 237 370" stroke="#0066FF" strokeWidth="1.2" opacity="0.08" strokeLinecap="round" />

      {/* Spine */}
      <path d="M200 108 V370" stroke="#0066FF" strokeWidth="1" opacity="0.04" strokeDasharray="4 8" />

      {/* Ribcage hints */}
      <path d="M200 148 Q176 155, 167 152" stroke="#0066FF" strokeWidth="0.6" opacity="0.035" />
      <path d="M200 148 Q224 155, 233 152" stroke="#0066FF" strokeWidth="0.6" opacity="0.035" />
      <path d="M200 172 Q178 178, 170 176" stroke="#0066FF" strokeWidth="0.6" opacity="0.035" />
      <path d="M200 172 Q222 178, 230 176" stroke="#0066FF" strokeWidth="0.6" opacity="0.035" />
      <path d="M200 196 Q180 202, 174 199" stroke="#0066FF" strokeWidth="0.6" opacity="0.035" />
      <path d="M200 196 Q220 202, 226 199" stroke="#0066FF" strokeWidth="0.6" opacity="0.035" />

      {/* Core center */}
      <circle cx="200" cy="270" r="3" fill="#0066FF" opacity="0.06" />

      {/* Pelvis */}
      <path d="M163 370 C175 392, 195 402, 200 404" stroke="#0066FF" strokeWidth="1.2" opacity="0.07" strokeLinecap="round" />
      <path d="M237 370 C225 392, 205 402, 200 404" stroke="#0066FF" strokeWidth="1.2" opacity="0.07" strokeLinecap="round" />

      {/* Legs */}
      <path d="M178 395 C175 435, 170 485, 166 535" stroke="#0066FF" strokeWidth="1.2" opacity="0.06" strokeLinecap="round" />
      <path d="M222 395 C225 435, 230 485, 234 535" stroke="#0066FF" strokeWidth="1.2" opacity="0.06" strokeLinecap="round" />

      {/* Knee joints */}
      <circle cx="168" cy="490" r="4" fill="#0066FF" opacity="0.04" />
      <circle cx="232" cy="490" r="4" fill="#0066FF" opacity="0.04" />

      {/* Decorative pulse on core */}
      <circle cx="200" cy="270" r="12" stroke="#0066FF" strokeWidth="0.5" opacity="0.03">
        <animate attributeName="r" values="12;24;12" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.03;0;0.03" dur="5s" repeatCount="indefinite" />
      </circle>

      {/* ── Hotspots ── */}
      {features.map((feature, i) => {
        const isActive = activeIndex === i;
        const { x, y } = feature.hotspot;
        return (
          <g
            key={i}
            className="cursor-pointer"
            onClick={() => onSelect(i)}
            role="button"
            tabIndex={0}
            aria-label={`${feature.title} — click to learn more`}
            onKeyDown={(e) => e.key === "Enter" && onSelect(i)}
          >
            {/* Invisible larger tap target */}
            <circle cx={x} cy={y} r={30} fill="transparent" />

            {/* Outer glow */}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 20 : 14}
              fill={feature.accentColor}
              opacity={isActive ? 0.12 : 0.04}
              style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />

            {/* Animated pulse ring (active only) */}
            {isActive && (
              <circle
                cx={x}
                cy={y}
                r="20"
                stroke={feature.accentColor}
                strokeWidth="1"
                fill="none"
                opacity="0.15"
              >
                <animate attributeName="r" values="20;34;20" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0;0.15" dur="2.5s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Core dot */}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 5 : 3.5}
              fill={feature.accentColor}
              opacity={isActive ? 0.7 : 0.25}
              style={{ transition: "all 0.3s ease" }}
            />

            {/* Number label */}
            <text
              x={x}
              y={y - (isActive ? 28 : 20)}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill={feature.accentColor}
              opacity={isActive ? 0.7 : 0.2}
              fontFamily="JetBrains Mono, monospace"
              style={{ transition: "opacity 0.3s ease" }}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Mobile Accordion Item ─── */
function FeatureItem({
  feature,
  index,
  isActive,
  onToggle,
}: {
  feature: (typeof features)[number];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 py-4 sm:py-5 text-left"
      >
        {/* Number */}
        <span
          className="text-[10px] sm:text-[11px] font-bold tabular-nums shrink-0 w-5 transition-opacity duration-300"
          style={{ color: feature.accentColor, opacity: isActive ? 1 : 0.4 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Icon */}
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: isActive ? `${feature.accentColor}18` : `${feature.accentColor}08`,
            color: feature.accentColor,
            opacity: isActive ? 1 : 0.5,
          }}
        >
          {feature.icon}
        </div>
        {/* Title */}
        <span
          className={`text-sm sm:text-[15px] font-bold flex-1 transition-colors duration-300 ${
            isActive ? "text-text" : "text-text-muted"
          }`}
        >
          {feature.title}
        </span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Expandable description */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[13px] sm:text-sm text-text-secondary leading-[1.7] pl-[52px] sm:pl-[60px] pr-4 pb-4">
          {feature.body}
        </p>
      </div>
    </div>
  );
}

/* ─── Desktop Card ─── */
function DesktopFeatureCard({
  feature,
  index,
  isActive,
  onHover,
  side,
}: {
  feature: (typeof features)[number];
  index: number;
  isActive: boolean;
  onHover: (i: number) => void;
  side: "left" | "right";
}) {
  return (
    <div
      className={`p-4 xl:p-5 rounded-2xl transition-all duration-300 cursor-default ${
        isActive
          ? "bg-white shadow-md shadow-black/[0.04] border border-border/60"
          : "bg-transparent border border-transparent hover:bg-white/50"
      } ${side === "left" ? "text-right" : "text-left"}`}
      onMouseEnter={() => onHover(index)}
    >
      <div
        className={`flex items-center gap-2.5 mb-2 ${
          side === "left" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: `${feature.accentColor}${isActive ? "15" : "08"}`,
            color: feature.accentColor,
          }}
        >
          {feature.icon}
        </div>
        <div
          className={`flex items-center gap-1.5 ${
            side === "left" ? "flex-row-reverse" : ""
          }`}
        >
          <span
            className="text-[10px] font-bold tabular-nums"
            style={{
              color: feature.accentColor,
              opacity: isActive ? 0.7 : 0.35,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-sm xl:text-[15px] font-bold text-text">
            {feature.title}
          </h3>
        </div>
      </div>
      <p
        className={`text-[12px] xl:text-[13px] text-text-secondary leading-[1.7] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-60"
        }`}
      >
        {feature.body}
      </p>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);

  const leftIndices = [0, 1, 3];
  const rightIndices = [2, 4, 5];

  return (
    <section
      id="features"
      className="py-20 sm:py-28 lg:py-36 bg-surface wave-divider relative"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative z-10 pt-8 sm:pt-10">
        {/* Section header */}
        <ScrollReveal className="pl-4 sm:pl-5 lg:pl-0">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            What You Get
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1] text-text max-w-sm">
            Built around
            <br />
            real needs.
          </h2>
        </ScrollReveal>

        {/* ─── Mobile + Tablet Layout ─── */}
        <div className="lg:hidden mt-12 sm:mt-16">
          {/* Body map */}
          <ScrollReveal>
            <div className="mx-auto max-w-[220px] sm:max-w-[260px] md:max-w-[280px] mb-8 sm:mb-10">
              <BodyMap
                activeIndex={activeIndex}
                onSelect={(i) =>
                  setActiveIndex(activeIndex === i ? -1 : i)
                }
              />
            </div>
          </ScrollReveal>

          {/* Feature accordion */}
          <ScrollReveal delay={100}>
            <div className="rounded-2xl border border-border/50 bg-white/50 overflow-hidden px-3 sm:px-4">
              {features.map((feature, i) => (
                <FeatureItem
                  key={i}
                  feature={feature}
                  index={i}
                  isActive={activeIndex === i}
                  onToggle={() =>
                    setActiveIndex(activeIndex === i ? -1 : i)
                  }
                />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ─── Desktop Layout ─── */}
        <div className="hidden lg:block mt-20">
          <div className="grid grid-cols-[1fr_240px_1fr] xl:grid-cols-[1fr_280px_1fr] gap-6 xl:gap-8 items-center">
            {/* Left column */}
            <div className="flex flex-col gap-3 xl:gap-4">
              {leftIndices.map((fi) => (
                <ScrollReveal key={fi} delay={fi * 80} scale>
                  <DesktopFeatureCard
                    feature={features[fi]}
                    index={fi}
                    isActive={activeIndex === fi}
                    onHover={setActiveIndex}
                    side="left"
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* Center body map */}
            <ScrollReveal delay={200}>
              <BodyMap
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            </ScrollReveal>

            {/* Right column */}
            <div className="flex flex-col gap-3 xl:gap-4">
              {rightIndices.map((fi) => (
                <ScrollReveal key={fi} delay={fi * 80} scale>
                  <DesktopFeatureCard
                    feature={features[fi]}
                    index={fi}
                    isActive={activeIndex === fi}
                    onHover={setActiveIndex}
                    side="right"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
