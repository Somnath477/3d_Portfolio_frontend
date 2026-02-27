"use client";

import RealWorldMap from "./RealWorldMap";
import { useRef, useState } from "react";

export default function GlassMapContact() {
  const cardRef = useRef(null);
  const [status, setStatus] = useState("");

  function tilt(e) {
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const cx = r.width / 2;
    const cy = r.height / 2;

    const rx = -(y - cy) / 14;
    const ry = (x - cx) / 14;

    cardRef.current.style.transform = `
      perspective(1200px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateY(-8px)
    `;
  }

  function reset() {
    cardRef.current.style.transform =
      "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const data = Object.fromEntries(new FormData(e.target));

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    setStatus(json.success ? "Message sent!" : "Failed to send");
    if (json.success) e.target.reset();
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={tilt}
      onMouseLeave={reset}
      className="relative max-w-6xl w-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[3rem] shadow-[0_0_90px_rgba(139,92,246,0.25)] overflow-hidden transition-transform duration-300"
    >

      <div className="grid lg:grid-cols-2 gap-12 p-14">

        {/* ================= MAP SIDE ================= */}
        <div className="relative">

          <RealWorldMap />

         
        </div>

        {/* ================= FORM SIDE ================= */}
        <form onSubmit={submit} className="space-y-4 text-white">

          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Contact Me
          </h2>

          <input
            name="name"
            placeholder="Your name"
            required
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows="4"
            required
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold hover:scale-105 transition">
            Send Message
          </button>

          {status && (
            <p className="text-sm text-center text-emerald-300">{status}</p>
          )}
        </form>

      </div>
    </div>
  );
}
