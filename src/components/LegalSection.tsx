interface LegalSectionProps {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ id, number, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 sm:scroll-mt-32">
      <header className="flex items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6">
        <span className="text-[11px] sm:text-[12px] font-bold tabular-nums text-primary shrink-0 pt-1">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-text leading-[1.2]">
          {title}
        </h2>
      </header>
      <div className="sm:pl-9 text-sm sm:text-[15px] text-text-secondary leading-[1.85] space-y-4">
        {children}
      </div>
    </section>
  );
}

export function LegalSubheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 text-[13px] sm:text-[14px] font-semibold text-text tracking-[-0.005em]">
      {children}
    </h3>
  );
}

export function LegalList({
  children,
  marker = "dot",
}: {
  children: React.ReactNode;
  marker?: "dot" | "dash";
}) {
  return (
    <ul className="space-y-2.5 pl-0">
      {Array.isArray(children)
        ? children.map((child, i) => (
            <LegalListItem key={i} marker={marker}>
              {child}
            </LegalListItem>
          ))
        : children}
    </ul>
  );
}

export function LegalListItem({
  children,
  marker = "dot",
}: {
  children: React.ReactNode;
  marker?: "dot" | "dash";
}) {
  return (
    <li className="flex items-start gap-3">
      {marker === "dot" ? (
        <span
          className="w-1 h-1 rounded-full bg-primary shrink-0 mt-[0.85em]"
          aria-hidden="true"
        />
      ) : (
        <span
          className="w-2 h-[1.5px] bg-text-muted/70 shrink-0 mt-[1em]"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </li>
  );
}

export function LegalCallout({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warn";
}) {
  const tones = {
    info: {
      bg: "bg-primary/[0.04]",
      border: "border-primary/20",
      text: "text-text",
    },
    warn: {
      bg: "bg-amber-500/[0.04]",
      border: "border-amber-500/25",
      text: "text-text",
    },
  } as const;
  const t = tones[tone];
  return (
    <div
      className={`my-5 rounded-xl border ${t.border} ${t.bg} px-4 py-3.5 sm:px-5 sm:py-4 text-[13px] sm:text-[14px] ${t.text} leading-[1.75]`}
    >
      {children}
    </div>
  );
}

export function LegalKeyValue({
  items,
}: {
  items: Array<{ label: string; value: React.ReactNode }>;
}) {
  return (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-6 gap-y-2 text-[13px] sm:text-[14px]">
      {items.map((item, i) => (
        <div key={i} className="contents">
          <dt className="font-semibold text-text-muted uppercase tracking-[0.12em] text-[10px] sm:text-[11px] pt-[3px]">
            {item.label}
          </dt>
          <dd className="text-text-secondary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
