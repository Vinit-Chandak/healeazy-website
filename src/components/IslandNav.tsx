"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Process", href: "#process" },
  { label: "Features", href: "#features" },
  { label: "Join", href: "#signup" },
];

export default function IslandNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-5 px-4">
      <nav
        className={`island-nav rounded-full px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-6 h-12 sm:h-[52px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-extrabold text-[8px] leading-none">
                K
              </span>
            </div>
            <span className="font-bold text-sm tracking-tight text-text hidden sm:inline">
              Kyuro
            </span>
          </a>

          {/* Desktop separator */}
          <div className="hidden md:block w-px h-5 bg-border/60" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-text-secondary hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop separator */}
          <div className="hidden md:block w-px h-5 bg-border/60" />

          {/* Desktop CTA */}
          <a
            href="#signup"
            className="hidden md:inline-flex items-center px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-all duration-200 hover:shadow-lg hover:shadow-primary/15"
          >
            Get Early Access
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-7 h-7 flex items-center justify-center ml-2"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-4 h-[1.5px] bg-text transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-text transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — extends from island */}
      <div
        className={`md:hidden fixed inset-0 top-0 z-[-1] transition-all duration-400 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative flex flex-col items-center gap-7 pt-28">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-semibold text-text hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#signup"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center px-8 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-hover transition-all"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </div>
  );
}
