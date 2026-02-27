"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ScrollControls, useScroll } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ========= BRAND COLORS ========= */
const gradientColors = [
  new THREE.Color("#6366f1"),
  new THREE.Color("#8b5cf6"),
  new THREE.Color("#ec4899")
];

/* ========= ROTATING CORE ========= */
function RotatingCore() {
  const mesh = useRef();
  const mat = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current || !mat.current) return;

    const t = clock.getElapsedTime() * 0.25;

    mesh.current.rotation.x = t * 0.6;
    mesh.current.rotation.y = t * 0.8;

    const mix = (Math.sin(t) + 1) / 2;
    const color = gradientColors[0]
      .clone()
      .lerp(gradientColors[2], mix);

    mat.current.color.copy(color);
    mat.current.emissive.copy(color).multiplyScalar(0.5);
  });

  return (
    <Float speed={1} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.3, 0.45, 140, 16]} />
        <meshStandardMaterial
          ref={mat}
          wireframe
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ========= ROUND DUST ========= */
function createCircleTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;

  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(c);
}

function Dust() {
  const ref = useRef();
  const texture = useMemo(createCircleTexture, []);

  const data = useMemo(() => {
    const count = 2200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const c = gradientColors[Math.floor(Math.random() * 3)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { pos, col };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={data.pos} count={data.pos.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={data.col} count={data.col.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.12}
        transparent
        opacity={0.75}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ========= SCROLL CAMERA ========= */
function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    if (!scroll) return;

    const t = scroll.offset;
    camera.position.z = 10 - t * 6;
    camera.position.y = -t * 1.8;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ========= SCENE ========= */
function Scene() {
  return (
    <>
      <CameraRig />
      <RotatingCore />
      <Dust />
    </>
  );
}

export default function AbstractScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={["#000", 10, 26]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <ScrollControls pages={2} damping={0.25}>
          <Scene />
        </ScrollControls>

      </Canvas>
    </div>
  );
}
