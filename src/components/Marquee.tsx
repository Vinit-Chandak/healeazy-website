const items = [
  "HOME VISITS",
  "VERIFIED THERAPISTS",
  "FLEXIBLE PACKAGES",
  "PERSONALIZED CARE",
  "SESSION TRACKING",
  "LAUNCHING IN HYDERABAD",
  "ONLINE CONSULTATIONS",
  "PROGRESS MONITORING",
];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 sm:gap-8 shrink-0">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-text-muted whitespace-nowrap">
            {item}
          </span>
          <span className="w-1 h-1 rounded-full bg-primary/30 shrink-0" />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="relative py-6 sm:py-8 overflow-hidden border-y border-border/50 bg-surface/50">
      <div className="marquee-track flex items-center gap-6 sm:gap-8 w-max">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
