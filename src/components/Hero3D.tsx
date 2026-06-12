"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ambient 3D layer behind the hero: a slowly drifting field of ember
 * particles in Pareez orange. The logo artwork (HeroLogoArt) floats above it.
 */

function Embers({ count = 380 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 1;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    points.current.rotation.y = t * 0.03 + pointer.x * 0.08;
    points.current.rotation.x = pointer.y * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8a3d"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Embers />
        <fog attach="fog" args={["#0a0908", 6, 12]} />
      </Canvas>
      {/* keep hero copy readable over the scene */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
    </div>
  );
}
