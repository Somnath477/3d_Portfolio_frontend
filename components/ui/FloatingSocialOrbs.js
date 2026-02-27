"use client";

import { Github, Linkedin, Globe } from "lucide-react";

const socials = [
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/somnath-chakraborty-245497176/",
    color: "from-blue-400 to-cyan-400"
  },
  {
    icon: Github,
    link: "https://github.com/Somnath477",
    color: "from-purple-400 to-pink-400"
  },
  {
    icon: Globe,
    link: "https://resume-somnath.vercel.app/",
    color: "from-orange-400 to-yellow-400"
  }
];

export default function FloatingSocialOrbs() {
  return (
    <div className="flex gap-6 justify-center items-center">

      {socials.map(({ icon: Icon, link, color }, i) => (
        <a
          key={i}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div
            className={`
              w-14 h-14 rounded-full 
              bg-gradient-to-br ${color}
              flex items-center justify-center
              backdrop-blur-xl
              shadow-xl
              animate-floatSlow
              transition-all duration-500
              hover:-translate-y-3 hover:scale-110
              hover:shadow-2xl
            `}
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <Icon className="w-6 h-6 text-black/80 group-hover:text-black" />
          </div>

          {/* glow */}
          <div
            className={`
              absolute inset-0 rounded-full blur-xl opacity-50 
              bg-gradient-to-br ${color}
              group-hover:opacity-90 transition
            `}
          />
        </a>
      ))}
    </div>
  );
}
