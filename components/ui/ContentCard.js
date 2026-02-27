"use client";

import { useRef } from "react";

export default function ContentCard() {
  const cardRef = useRef(null);

  function handleMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // stronger tilt
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
      scale(1.02)
    `;
  }

  function resetTilt() {
    cardRef.current.style.transform =
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  }

  return (
    <div className="relative group animate-float">

      {/* Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-40 group-hover:opacity-80 transition duration-500" />

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 w-[340px] text-white shadow-2xl transition-transform duration-300 ease-out will-change-transform"
      >

        {/* Profile */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center font-bold text-xl">
            S
          </div>
          <div>
            <h3 className="font-semibold text-lg">Somnath Chakraborty</h3>
            <p className="text-sm text-gray-400">Frontend Developer • Full Stack</p>
            <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              Remote • India
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            ["Experience", "4+ yrs"],
            ["Projects", "5+"],
            ["Stack", "MERN"]
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl bg-white/5 border border-white/10 p-3 text-center"
            >
              <p className="text-xs text-gray-400">{label}</p>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {/* Feature */}
        <div className="rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 p-6 border border-white/10">
          React • Next • Tailwind • Express • API
        </div>

        {/* Tags */}
        <div className="space-y-2 text-sm text-gray-300">
          <div className="rounded-xl bg-white/5 p-3 border border-white/10">
            Weather & Doctor apps — API driven UI
          </div>
          <div className="rounded-xl bg-white/5 p-3 border border-white/10">
            MongoDB form flows — Node + Express
          </div>
        </div>

        <div className="mt-5 text-xs text-emerald-300 border-t border-white/10 pt-3">
          Uses AI to prototype & ship faster ⚡
        </div>

      </div>
    </div>
  );
}
