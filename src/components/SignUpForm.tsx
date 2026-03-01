"use client";

import { useEffect, useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";

type Role = "patient" | "physiotherapist";
type Status = "idle" | "loading" | "success" | "error";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("patient");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#signup-physiotherapist") {
        setRole("physiotherapist");
        document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        console.log("Sign-up:", {
          email,
          role,
          timestamp: new Date().toISOString(),
        });
        setStatus("success");
        setEmail("");
        return;
      }

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role,
          timestamp: new Date().toISOString(),
        }),
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="signup" className="py-20 sm:py-28 lg:py-36 bg-[#FCFCFC] relative">
      {/* Background decorative text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[12rem] sm:text-[18rem] lg:text-[24rem] font-extrabold text-primary/[0.015] leading-none whitespace-nowrap">
          JOIN
        </span>
      </div>

      <div className="relative mx-auto max-w-lg sm:max-w-xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              Get Early Access
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Join the waitlist.
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-[1.7]">
              Be the first to know when HealEazy launches.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} scale>
          {status === "success" ? (
            <div className="bento-card bg-white p-8 sm:p-10 md:p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-6 h-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">
                You&apos;re on the list.
              </h3>
              <p className="text-sm text-text-secondary leading-[1.7]">
                We&apos;ll reach out when HealEazy is ready.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Add another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bento-card bg-white p-7 sm:p-10 md:p-12">
              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-[10px] font-semibold text-text-muted mb-2 tracking-[0.15em] uppercase"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 sm:py-3 rounded-xl border border-border bg-surface/50 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:bg-white transition-all duration-200 outline-none"
                />
              </div>

              {/* Role */}
              <div className="mb-8">
                <p className="block text-[10px] sm:text-[11px] font-semibold text-text-muted mb-3 tracking-[0.15em] uppercase">
                  I am a...
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("patient")}
                    className={`relative py-5 px-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      role === "patient"
                        ? "border-primary bg-primary/[0.04]"
                        : "border-border hover:border-text-muted/30"
                    }`}
                  >
                    <span
                      className={`block text-sm font-bold mb-1 ${
                        role === "patient"
                          ? "text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      Patient
                    </span>
                    <span className="block text-[11px] text-text-muted">
                      I need physio
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("physiotherapist")}
                    className={`relative py-5 px-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      role === "physiotherapist"
                        ? "border-primary bg-primary/[0.04]"
                        : "border-border hover:border-text-muted/30"
                    }`}
                  >
                    <span
                      className={`block text-sm font-bold mb-1 ${
                        role === "physiotherapist"
                          ? "text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      Therapist
                    </span>
                    <span className="block text-[11px] text-text-muted">
                      I provide physio
                    </span>
                  </button>
                </div>
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-xs text-red-500 mb-4">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 sm:py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-sm"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  "Join the Waitlist"
                )}
              </button>

              <p className="mt-4 text-[10px] text-text-muted text-center">
                No spam. We&apos;ll only email you about the launch.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
