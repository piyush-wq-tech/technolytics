"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FaceParticles() {
  const pointsRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/face.png");

  const { positions, targets } = useMemo(() => {
    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(texture.image, 0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size).data;

    const pos = [];
    const tgt = [];

    for (let y = 0; y < size; y += 2) {
      for (let x = 0; x < size; x += 2) {
        const i = (y * size + x) * 4;

        // Bright pixels form the face
        if (imageData[i] > 210) {
          const fx = (x - size / 2) * 0.065;
          const fy = (size / 2 - y) * 0.065;

          pos.push(
            (Math.random() - 0.5) * 70,
            (Math.random() - 0.5) * 70,
            (Math.random() - 0.5) * 70
          );

          tgt.push(fx, fy, 0);
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      targets: new Float32Array(tgt),
    };
  }, [texture]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;

    // 🐢 Slow, elegant formation
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] += (targets[i] - pos[i]) * 0.008;
      pos[i + 1] += (targets[i + 1] - pos[i + 1]) * 0.008;
      pos[i + 2] += (targets[i + 2] - pos[i + 2]) * 0.01;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // 🧠 Very slow organic motion
    pointsRef.current.rotation.y = Math.sin(t * 0.12) * 0.15;
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        color="#00eaff"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HomeServices() {
  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-6 md:px-20 overflow-hidden">

      {/* LEFT — Particle Face */}
      <div className="w-full md:w-[60%] h-[520px] md:h-screen">
        <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
          <ambientLight intensity={2.2} />
          <FaceParticles />
        </Canvas>
      </div>

      {/* RIGHT — Text */}
      <div className="w-full md:w-[40%] mt-10 md:mt-0 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Human Intelligence,
          <br />
          Re-engineered with AI
        </h2>

        <p className="mt-6 text-lg text-cyan-300 max-w-xl opacity-90">
          From chaos to cognition — particles slowly converge into a human
          presence, representing intelligent systems shaped by data and learning.
        </p>
      </div>
    </section>
  );
}
