"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const frontend = [
  { name: "React", icon: "/icons/react-js-icon.svg" },
  { name: "Next", icon: "/icons/nextjs-icon.svg" },
  { name: "JavaScript", icon: "/icons/javascript-programming-language-icon.svg" },
  { name: "Tailwind", icon: "/icons/tailwind-css-icon.svg" },
  { name: "HTML", icon: "/icons/html-icon.svg" }
];

const backend = [
  { name: "Node", icon: "/icons/node-js-icon.svg" },
  { name: "Express", icon: "/icons/express-js-icon.svg" },
  { name: "MongoDB", icon: "/icons/mongodb-icon.svg" },
  { name: "Postman", icon: "/icons/postman-icon.svg" }
];

/* ========== ORBIT ICON (SAFE BLUR) ========== */
function OrbitIcon({ angle, radius, speed, icon }) {
  const groupRef = useRef();
  const imgRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current || !imgRef.current) return;

    const t = clock.getElapsedTime() * speed;

    const x = Math.cos(t + angle) * radius;
    const z = Math.sin(t + angle) * radius;
    const y = Math.sin(t * 0.3) * 0.25;

    groupRef.current.position.set(x, y, z);

    // smooth depth blur
    const depth = Math.max(0, -z);
    imgRef.current.style.filter = `blur(${depth * 2}px)`;
    imgRef.current.style.opacity = z < 0 ? "0.5" : "1";
  });

  return (
    <group ref={groupRef}>
      <Html center transform>
        <img
          ref={imgRef}
          src={icon}
          className="w-12 h-12 pointer-events-none select-none transition-all duration-300"
          draggable={false}
        />
      </Html>
    </group>
  );
}

/* ========== GLASS ORB ========== */
function GlassOrb({ glow }) {
  return (
    <mesh>
      <sphereGeometry args={[1.25, 50, 50]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.6}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color={glow}
        emissive={glow}
        emissiveIntensity={0.25}
        transparent
      />
    </mesh>
  );
}

/* ========== ORB SYSTEM ========== */
function TechOrb({ icons, label, position, glow }) {
  return (
    <Float speed={1} floatIntensity={0.5}>
      <group position={position}>

        {/* Label */}
        <Html position={[0, 2.1, 0]} center>
          <div className="px-4 py-1 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-xl border border-white/20 text-white">
            {label}
          </div>
        </Html>

        <GlassOrb glow={glow} />

        {icons.map((item, i) => (
          <OrbitIcon
            key={item.name}
            angle={(Math.PI * 2 * i) / icons.length}
            radius={2.4}
            speed={0.25}
            icon={item.icon}
          />
        ))}

      </group>
    </Float>
  );
}

/* ========== SCENE ========== */
export default function SkillsOrbitScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <TechOrb
          icons={frontend}
          label="Frontend"
          position={[-4.8, 0, 0]}
          glow="#6366f1"
        />

        <TechOrb
          icons={backend}
          label="Backend"
          position={[4.8, 0, 0]}
          glow="#ec4899"
        />

      </Canvas>
    </div>
  );
}
