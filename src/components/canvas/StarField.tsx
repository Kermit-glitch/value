"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL star dome for the hero sky — 2,400 points on a slowly precessing
 * sphere shell. R3F's frameloop only runs while the canvas is mounted, and
 * the whole module is loaded lazily (next/dynamic, ssr:false) so it never
 * blocks first paint.
 */
function Stars({ count = 2400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Upper hemisphere shell, radius 8–14, biased toward the zenith
      const r = 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.9);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.abs(r * Math.cos(phi)) - 1.5;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 6;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffe9c4"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function StarField({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
        camera={{ position: [0, 0, 1], fov: 70 }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}
