export default function Footer() {
  return (
    <footer className="py-10 sm:py-14 bg-[#FCFCFC] border-t border-border/40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-extrabold text-[7px] leading-none">
                K
              </span>
            </div>
            <span className="font-bold text-sm tracking-tight text-text">
              Kyuro
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-[11px] text-text-muted">
            <a
              href="#process"
              className="hover:text-text transition-colors"
            >
              Process
            </a>
            <a
              href="#features"
              className="hover:text-text transition-colors"
            >
              Features
            </a>
            <a
              href="#signup"
              className="hover:text-text transition-colors"
            >
              Waitlist
            </a>
          </div>

          {/* Right */}
          <div className="text-[11px] text-text-muted text-center sm:text-right flex items-center gap-1.5">
            <svg
              className="w-3 h-3 text-text-muted/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span>Hyderabad</span>
            <span className="mx-1.5 text-border">|</span>
            <span>&copy; {new Date().getFullYear()} Kyuro</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
