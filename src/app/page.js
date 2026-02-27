"use client";

import dynamic from "next/dynamic";
import ContentCard from "../../components/ui/ContentCard";
import Metrics from "../../components/ui/Metrics";
import ProjectsCarousel3D from "../../components/ui/ProjectsCarousel3D";
import MapGlassContactCard from "../../components/ui/MapGlassContactCard";
import FloatingSocialOrbs from "../../components/ui/FloatingSocialOrbs";

const AbstractScene = dynamic(
  () => import("../../components/scene/AbstractScene"),
  { ssr: false }
);

const SkillsOrbitScene = dynamic(
  () => import("../../components/scene/SkillsOrbitScene"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory text-white">

      {/* ================= HERO ================= */}
      <section className="min-h-screen snap-start relative flex items-center justify-center px-6 md:px-10 py-16">
        <AbstractScene />

        <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">

          {/* LEFT */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex gap-2 px-4 py-2 mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-xs sm:text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Available for Frontend & Full-Stack roles
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              I design & build{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                high-performance interfaces
              </span>{" "}
              that feel alive.
            </h1>

            <p className="mt-6 text-gray-300 text-base sm:text-lg">
              Performance-focused frontend engineer with 4+ years of experience
              building scalable React & Next.js applications integrated with
              Express & MongoDB backends.
            </p>

            {/* Buttons responsive */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <button
                onClick={() => {
                  window.open("/resume/Somnath_Chakraborty_Updated_Resume.pdf");
                  document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition"
              >
                Hire Me
              </button>

              <button
                onClick={() =>
                  window.open("/resume/Somnath_Chakraborty_Updated_Resume (Front End).docx")
                }
                className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                Download Resume
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className=" max-w-md lg:max-w-none">
            <ContentCard />
          </div>
        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section className="min-h-screen snap-start flex items-center justify-center px-6 md:px-10 py-16">
        <div className="max-w-4xl backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6 mt-6">
            I’m a performance-focused frontend engineer with 4+ years of experience building scalable React and Next.js applications.
          </p>

          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            From optimizing render cycles and improving Lighthouse scores to integrating Express & MongoDB backends, I focus on writing clean architecture that scales.
          </p>

          <div className="mt-10">
            <Metrics />
          </div>
        </div>
      </section>


      {/* ================= SKILLS ================= */}
      <section className="min-h-screen snap-start relative flex items-center justify-center px-6 md:px-10 py-16">
        <SkillsOrbitScene />

        <div className="absolute bottom-10 sm:bottom-16 text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills in Motion
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Frontend & Backend technologies orbiting in real time
          </p>
        </div>
      </section>


      {/* ================= PROJECTS ================= */}
      <section className="min-h-screen snap-start flex items-center justify-center px-6 md:px-10 py-16">
        <div className="max-w-7xl w-full text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Projects
          </h2>

          <ProjectsCarousel3D />
        </div>
      </section>


      {/* ================= CONTACT ================= */}
      <section
        id="contact-section"
        className="min-h-screen snap-start relative flex items-center justify-center px-6 md:px-10 py-16 overflow-hidden"
      >
        <MapGlassContactCard />
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="min-h-[50vh] snap-start relative flex flex-col justify-between py-12 px-6 md:px-10">

        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
            Connect with me
          </p>

          <FloatingSocialOrbs />
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm gap-4 text-center md:text-left">
          <div>
            © 2026 Somnath Chakraborty. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center">
            <a href="mailto:chakrabortysumon1997@gmail.com" className="hover:text-purple-400 transition">
              chakrabortysumon1997@gmail.com
            </a>

            <a href="tel:+918250425989" className="hover:text-pink-400 transition">
              +91 8250425989
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}