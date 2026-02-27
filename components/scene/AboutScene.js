"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const brandGradient = [
  new THREE.Color("#6366f1"),
  new THREE.Color("#8b5cf6"),
  new THREE.Color("#ec4899")
];

function RotatingCore() {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;

    const t = clock.getElapsedTime() * 0.5;

    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;

    const mix = (Math.sin(clock.getElapsedTime() * 0.5) + 1) / 2;

    const current = brandGradient[0]
      .clone()
      .lerp(brandGradient[2], mix);

    matRef.current.color.copy(current);
    matRef.current.emissive.copy(current).multiplyScalar(0.6);
  });

  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.4, 120, 16]} />
        <meshStandardMaterial
          ref={matRef}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function AboutScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <RotatingCore />
      </Canvas>
    </div>
  );
}
