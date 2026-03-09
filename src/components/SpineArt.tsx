"use client";

import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export default function SpineArt({ className = "" }: Props) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax1 = scrollY * 0.08;
  const parallax2 = scrollY * 0.15;
  const parallax3 = scrollY * 0.05;

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Layer 1: Main spine curve */}
        <g
          style={{ transform: `translateY(${-parallax1}px)` }}
          className="transition-transform duration-100"
        >
          <path
            d="M300 60 C300 100, 315 160, 308 220 S285 320, 300 380 S320 460, 310 520 S280 620, 300 680 S315 760, 300 820"
            stroke="#43baee"
            strokeWidth="2.5"
            opacity="0.08"
            strokeLinecap="round"
          />
          {/* Vertebrae along spine */}
          {[120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map(
            (y, i) => {
              const x =
                300 +
                Math.sin(((y - 60) / 760) * Math.PI * 2) * 12;
              return (
                <g key={`v-${i}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={6}
                    fill="#43baee"
                    opacity={0.04 + (i % 3) * 0.01}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={2}
                    fill="#43baee"
                    opacity="0.1"
                  />
                </g>
              );
            }
          )}
        </g>

        {/* Layer 2: Ribcage / shoulder structure */}
        <g
          style={{ transform: `translateY(${-parallax2}px)` }}
          className="transition-transform duration-100"
        >
          {/* Shoulder line */}
          <path
            d="M180 200 Q240 185, 300 195 Q360 185, 420 200"
            stroke="#43baee"
            strokeWidth="1.5"
            opacity="0.06"
            strokeLinecap="round"
          />
          {/* Rib curves - right */}
          <path
            d="M308 240 Q360 228, 400 238"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          <path
            d="M305 280 Q350 268, 385 278"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          <path
            d="M302 320 Q340 310, 370 318"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.035"
            strokeLinecap="round"
          />
          <path
            d="M300 360 Q330 352, 355 358"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.03"
            strokeLinecap="round"
          />
          {/* Rib curves - left (mirror) */}
          <path
            d="M292 240 Q240 228, 200 238"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          <path
            d="M295 280 Q250 268, 215 278"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          <path
            d="M298 320 Q260 310, 230 318"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.035"
            strokeLinecap="round"
          />
          <path
            d="M300 360 Q270 352, 245 358"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.03"
            strokeLinecap="round"
          />
          {/* Hip line */}
          <path
            d="M220 560 Q260 545, 300 555 Q340 545, 380 560"
            stroke="#43baee"
            strokeWidth="1.5"
            opacity="0.05"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 3: Limb suggestions + joint circles */}
        <g
          style={{ transform: `translateY(${-parallax3}px)` }}
          className="transition-transform duration-100"
        >
          {/* Arms */}
          <path
            d="M180 200 Q155 260, 140 330"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          <path
            d="M420 200 Q445 260, 460 330"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          {/* Legs */}
          <path
            d="M220 560 Q210 640, 200 740"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />
          <path
            d="M380 560 Q390 640, 400 740"
            stroke="#43baee"
            strokeWidth="1"
            opacity="0.04"
            strokeLinecap="round"
          />

          {/* Joint circles */}
          {[
            { cx: 180, cy: 200, r: 14 },
            { cx: 420, cy: 200, r: 14 },
            { cx: 140, cy: 330, r: 10 },
            { cx: 460, cy: 330, r: 10 },
            { cx: 220, cy: 560, r: 12 },
            { cx: 380, cy: 560, r: 12 },
            { cx: 200, cy: 740, r: 8 },
            { cx: 400, cy: 740, r: 8 },
          ].map((joint, i) => (
            <circle
              key={`j-${i}`}
              cx={joint.cx}
              cy={joint.cy}
              r={joint.r}
              fill="#43baee"
              opacity="0.03"
            />
          ))}

          {/* Treatment point indicators - small bright dots */}
          {[
            { cx: 180, cy: 200 },
            { cx: 420, cy: 200 },
            { cx: 300, cy: 380 },
            { cx: 220, cy: 560 },
            { cx: 380, cy: 560 },
          ].map((point, i) => (
            <circle
              key={`tp-${i}`}
              cx={point.cx}
              cy={point.cy}
              r={3}
              fill="#43baee"
              opacity="0.15"
            />
          ))}

          {/* Scattered decorative dots */}
          {[
            { cx: 150, cy: 150, r: 1.5 },
            { cx: 450, cy: 170, r: 2 },
            { cx: 120, cy: 400, r: 1.5 },
            { cx: 480, cy: 450, r: 1 },
            { cx: 160, cy: 650, r: 2 },
            { cx: 440, cy: 680, r: 1.5 },
            { cx: 500, cy: 300, r: 1 },
            { cx: 100, cy: 500, r: 1.5 },
          ].map((dot, i) => (
            <circle
              key={`d-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="#43baee"
              opacity="0.08"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
