"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const brand = new THREE.Color("#8b5cf6");

function SkillDot({ angle, radius, speed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t + angle) * radius;
    ref.current.position.z = Math.sin(t + angle) * radius;
    ref.current.position.y = Math.sin(t * 0.6) * 0.3;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 20, 20]} />
      <meshStandardMaterial
        color={brand}
        emissive={brand}
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

function SkillRing({ count, radius, speed, position }) {
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <SkillDot
          key={i}
          angle={(Math.PI * 2 * i) / count}
          radius={radius}
          speed={speed}
        />
      ))}
    </group>
  );
}

function GlassRing({ radius }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.03, 16, 80]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.15}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function RingSystem({ count, radius, speed, position }) {
  return (
    <Float floatIntensity={0.8} speed={1}>
      <group position={position}>
        <GlassRing radius={radius} />
        <SkillRing
          count={count}
          radius={radius}
          speed={speed}
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}

export default function SkillsScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 3, 9], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 4, 4]} intensity={1} />

        {/* Frontend */}
        <RingSystem
          count={5}
          radius={2}
          speed={0.6}
          position={[0, 1.5, 0]}
        />

        {/* Backend */}
        <RingSystem
          count={5}
          radius={1.7}
          speed={0.8}
          position={[-3, -1, 0]}
        />

        {/* Architecture & Performance */}
        <RingSystem
          count={4}
          radius={1.5}
          speed={1}
          position={[3, -1, 0]}
        />
      </Canvas>
    </div>
  );
}
