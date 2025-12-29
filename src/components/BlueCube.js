'use client';

import * as THREE from "three";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function EnergyCube() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.3;
    groupRef.current.rotation.y = t * 0.45;
  });

  return (
    <group ref={groupRef}>
      {/* 🔶 Layered Wireframe Shells */}
      {[...Array(15)].map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[1 - i * 0.04, 1 - i * 0.04, 1 - i * 0.04]} />
          <meshBasicMaterial
            wireframe
            transparent
            opacity={0.08 + (i / 15) * 0.18}
            color={"#0095ffff"}
          />
        </mesh>
      ))}

      {/* 🔥 Animated Glowing Core */}
      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          transparent
          emissive={"#00ffe1ff"}
          emissiveIntensity={4}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function BlueCube() {
  return (
    <Canvas camera={{ position: [2.8, 2.8, 3.2], fov: 60 }}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={5} color={"#00ffe5ff"} />
      <pointLight position={[-5, -5, -5]} intensity={3} color={"#1e00ffff"} />

      <EnergyCube />

      {/* ✨ Bloom Glow Processor */}
      <EffectComposer>
        <Bloom intensity={3.0} luminanceThreshold={0.2} radius={0.9} />
      </EffectComposer>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
