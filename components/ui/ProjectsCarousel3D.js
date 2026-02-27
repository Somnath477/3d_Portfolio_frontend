"use client";

import { useState, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Doctor Appointment App",
    role: "Frontend · Patient Booking Flow",
    summary:
      "End-to-end doctor appointment booking experience with slots, patient details, and confirmation workflow.",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    link: "https://doctorsappointmentapp.netlify.app/",
    github: "https://github.com/yourrepo/doctor-app",
    image: "/project-images/doctor.png",
  },
  {
    id: 2,
    title: "Weather Searching App",
    role: "Frontend · API Integration",
    summary: "Real-time weather search interface using open weather API.",
    tech: ["React", "JavaScript", "Weather API"],
    link: "https://weatherapp2626.netlify.app/",
    github: "https://github.com/Somnath477/cinematic-weather-app",
    image: "/project-images/weather.png",
  },
  {
    id: 3,
    title: "TO-DO LIST",
    role: "React JS Dev · Tasks List",
    summary: "To-Do List using React HOOKS, STATE, CALLBACKS, LIST",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    link: "https://todo-list477.vercel.app/",
    github: "https://github.com/Somnath477/todo-list",
    image: "/project-images/todo.png",
  },
  {
    id: 4,
    title: "Authentication Full Stack",
    role: "Full Stack · JWT Auth",
    summary: "Secure login & authentication with JWT + protected routes.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    link: "https://auth-frontend-puce-six.vercel.app/",
    github: "https://github.com/Somnath477/auth_frontend",
    image: "/project-images/auth.png",
  },
  {
    id: 5,
    title: "Ecommerce Website",
    role: "Frontend",
    summary:
      "End-to-end functional ecommerce site with local storage handling.",
    tech: ["React Js", "JavaScript", "TailwindCss"],
    link: "https://neo-store-ecommerce.vercel.app/",
    github: "https://github.com/Somnath477/NeoStore_Ecommerce",
    image: "/project-images/ecommerce.png",
  },
];

export default function ProjectsCarousel3D() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + projects.length) % projects.length);
  const next = () =>
    setIndex((index + 1) % projects.length);

  return (
    <div className="relative flex items-center justify-center h-[560px]">

      {projects.map((p, i) => {
        const offset = i - index;

        let style =
          "opacity-0 scale-75 blur-xl translate-x-0 z-0";

        if (offset === 0)
          style =
            "opacity-100 scale-110 blur-0 z-30";

        if (offset === -1)
          style =
            "opacity-60 scale-90 blur-md -translate-x-96 z-20";

        if (offset === 1)
          style =
            "opacity-60 scale-90 blur-md translate-x-96 z-20";

        if (offset === -2 || offset === 2)
          style =
            "opacity-30 scale-75 blur-2xl";

        return (
          <div
            key={p.id}
            className={`absolute transition-all duration-700 ease-out ${style} ${
              offset !== 0 ? "pointer-events-none" : ""
            }`}
          >
            <FloatingTiltCard project={p} />
          </div>
        );
      })}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-12 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-12 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition"
      >
        →
      </button>
    </div>
  );
}

function FloatingTiltCard({ project }) {
  const ref = useRef(null);

  function onMove(e) {
    const card = ref.current;
    const r = card.getBoundingClientRect();

    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const cx = r.width / 2;
    const cy = r.height / 2;

    const rx = -(y - cy) / 12;
    const ry = (x - cx) / 12;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateY(-12px)
      scale(1.04)
    `;
  }

  function reset() {
    ref.current.style.transform =
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  }

  return (
    <div className="animate-floatSlow">

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="w-[360px] rounded-[2.5rem] overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl transition-transform duration-300 will-change-transform text-white"
      >
        <img
          src={project.image}
          className="h-52 w-full object-cover"
          alt={project.title}
        />

        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-indigo-300 text-sm">{project.role}</p>
          <p className="text-gray-300 text-sm">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4 text-sm">
            <a
              href={project.link}
              target="_blank"
              className="text-emerald-300 hover:underline"
            >
              Live
            </a>
            <a
              href={project.github}
              target="_blank"
              className="text-indigo-300 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
