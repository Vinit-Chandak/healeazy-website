"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Browse & Choose",
    body: "Search verified physiotherapists by specialization, area, and patient reviews. Find someone who fits your needs.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Book a Session",
    body: "Pick a treatment package or start with a consultation. Choose a time slot — at your home or online.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Recover at Home",
    body: "Your physiotherapist comes to you. Track every session, monitor your progress, get better — all from home.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const start = rect.top - viewportHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      const progress = Math.max(0, Math.min(1, current / total));

      setScrollProgress(progress);

      // Determine active step based on progress
      if (progress < 0.25) setActiveStep(-1);
      else if (progress < 0.45) setActiveStep(0);
      else if (progress < 0.65) setActiveStep(1);
      else setActiveStep(2);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate the SVG path drawing
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length * (1 - scrollProgress * 1.3)}`;
  }, [scrollProgress]);

  return (
    <section id="process" ref={sectionRef} className="py-20 sm:py-28 lg:py-36 bg-[#FCFCFC] relative overflow-hidden">
      {/* Large decorative background numbers */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-[10%] left-[-2%] text-[10rem] sm:text-[16rem] font-extrabold text-primary/[0.012] leading-none">
          01
        </span>
        <span className="absolute top-[35%] right-[-2%] text-[10rem] sm:text-[16rem] font-extrabold text-primary/[0.012] leading-none">
          02
        </span>
        <span className="absolute top-[60%] left-[-2%] text-[10rem] sm:text-[16rem] font-extrabold text-primary/[0.012] leading-none">
          03
        </span>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 relative">
        <ScrollReveal className="pl-[68px] sm:pl-[88px] lg:pl-0">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            The Process
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1] text-text max-w-md">
            Three steps to
            <br />
            recovery.
          </h2>
        </ScrollReveal>

        <div className="mt-14 sm:mt-20 lg:mt-24 relative">
          {/* Journey path SVG - visible on lg+ */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-full pointer-events-none" aria-hidden="true">
            <svg
              viewBox="0 0 800 700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Background path (ghost) */}
              <path
                d="M150 60 C250 60, 350 120, 400 180 S550 300, 650 250 C700 230, 650 380, 400 420 S150 460, 150 530 C150 580, 250 640, 400 640"
                stroke="#0066FF"
                strokeWidth="2"
                opacity="0.04"
                strokeLinecap="round"
              />
              {/* Animated foreground path */}
              <path
                ref={pathRef}
                d="M150 60 C250 60, 350 120, 400 180 S550 300, 650 250 C700 230, 650 380, 400 420 S150 460, 150 530 C150 580, 250 640, 400 640"
                stroke="#0066FF"
                strokeWidth="2"
                opacity="0.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-6 sm:left-8 top-0 bottom-0 w-px overflow-hidden" aria-hidden="true">
            <div className="w-full h-full bg-border/30" />
            <div
              className="absolute top-0 left-0 w-full bg-primary/20 transition-all duration-700 ease-out"
              style={{ height: `${scrollProgress * 130}%` }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-0 relative">
            {steps.map((step, i) => {
              const isActive = activeStep >= i;
              // Desktop positioning: alternate sides along the curve
              const alignments = [
                "lg:flex-row lg:pr-[55%]",         // Step 1: left side
                "lg:flex-row-reverse lg:pl-[55%]",  // Step 2: right side
                "lg:flex-row lg:pr-[45%] lg:pl-[10%]", // Step 3: center-left
              ];

              return (
                <ScrollReveal key={step.number} delay={i * 150}>
                  <div
                    className={`relative flex flex-row items-start gap-5 sm:gap-8 ${alignments[i]} ${
                      i < steps.length - 1 ? "lg:mb-16" : ""
                    }`}
                  >
                    {/* Step node */}
                    <div className="relative shrink-0 z-10">
                      {/* Pulse ring */}
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                          isActive
                            ? "bg-primary/10 scale-[1.5] sm:scale-[1.8] lg:scale-[2.2]"
                            : "bg-transparent scale-100"
                        }`}
                      />
                      {/* Outer ring */}
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                          isActive
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                            : "border-border bg-white text-text-muted"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {/* Step number tag */}
                      <div
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-500 ${
                          isActive
                            ? "bg-primary text-white scale-100"
                            : "bg-surface text-text-muted border border-border scale-90"
                        }`}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pt-1 transition-all duration-700 ${
                        isActive ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      <h3
                        className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 transition-colors duration-500 ${
                          isActive ? "text-text" : "text-text-muted"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-text-secondary leading-[1.8] max-w-md">
                        {step.body}
                      </p>

                      {/* Progress indicator dots */}
                      <div className="mt-5 flex items-center gap-2">
                        {[0, 1, 2].map((dot) => (
                          <div
                            key={dot}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              dot <= i && isActive
                                ? "bg-primary w-6"
                                : "bg-border w-1.5"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
