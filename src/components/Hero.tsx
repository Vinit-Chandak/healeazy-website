"use client";

import { useEffect, useState } from "react";
import SpineArt from "./SpineArt";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textParallax = scrollY * 0.3;
  const badgeParallax = scrollY * 0.15;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background spine art — positioned right */}
      <div
        className="absolute right-[-10%] sm:right-[-5%] lg:right-[5%] top-[-5%] w-[80%] sm:w-[60%] lg:w-[45%] h-[110%] opacity-70"
        aria-hidden="true"
      >
        <SpineArt />
      </div>

      {/* Ambient gradient */}
      <div
        className="absolute top-[10%] right-[20%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className={`transition-all duration-700 delay-100 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transform: mounted ? `translateY(${-badgeParallax}px)` : undefined }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] mb-8 sm:mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-primary tracking-wider uppercase">
                Launching in Hyderabad
              </span>
            </div>
          </div>

          {/* Headline — dramatic scale */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transform: mounted ? `translateY(${-textParallax}px)` : undefined }}
          >
            <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-text">
              Expert
              <br />
              <span className="gradient-text">Physiotherapy</span>
              <br />
              <span className="text-text-secondary font-light italic">
                at your doorstep.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <div
            className={`transition-all duration-1000 delay-[400ms] ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="mt-6 sm:mt-8 text-sm sm:text-base text-text-secondary leading-[1.8] max-w-md">
              Verified physiotherapists come to your home.
              Personalized packages. Real progress tracking.
              No clinic visits needed.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-[600ms] ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#signup"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 text-sm"
            >
              Join the Waitlist
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
            <a
              href="#process"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-text font-medium rounded-full hover:bg-surface transition-all duration-300 text-sm"
            >
              See How It Works
            </a>
          </div>

          {/* Trust line */}
          <div
            className={`mt-14 sm:mt-16 flex items-center gap-8 transition-all duration-1000 delay-[800ms] ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    style={{
                      background: `hsl(${210 + i * 15}, 60%, ${60 + i * 8}%)`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-text-muted leading-tight">
                Therapists joining
                <br />
                the waitlist
              </span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-[11px] text-text-muted">
              <span className="text-text font-semibold">Home visits</span>
              <br />
              across Hyderabad
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FCFCFC] to-transparent pointer-events-none" />
    </section>
  );
}
