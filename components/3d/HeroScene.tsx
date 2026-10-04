'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SceneFallback } from './SceneFallback';
import { Layers, Server, Database, Cpu, Eye } from 'lucide-react';

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }
    setHasWebGL(true);

    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.05);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x00f0ff, 3.5, 12);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3, 15);
    purpleLight.position.set(3, 4, 3);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 15);
    blueLight.position.set(-3, -3, 3);
    scene.add(blueLight);

    // 4. Central Core: Software System & AI Nucleus
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Core Solid Inner
    const innerGeo = new THREE.IcosahedronGeometry(1.15, 2);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x061528,
      emissive: 0x082b4a,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Core Wireframe Lattice
    const wireGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireCore = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireCore);

    // Core Outer Glow Ring
    const innerRingGeo = new THREE.RingGeometry(1.4, 1.45, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    coreGroup.add(innerRing);

    // 5. Orbiting Modular Layers
    // Layer 1: Frontend (Cyan)
    const frontendOrbit = new THREE.Group();
    frontendOrbit.rotation.x = 0.45;
    frontendOrbit.rotation.z = -0.2;
    scene.add(frontendOrbit);

    const orbit1RingGeo = new THREE.RingGeometry(2.3, 2.32, 64);
    const orbit1RingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const orbit1Ring = new THREE.Mesh(orbit1RingGeo, orbit1RingMat);
    orbit1Ring.rotation.x = Math.PI / 2;
    frontendOrbit.add(orbit1Ring);

    const feNodeGeo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
    const feNodeMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00a3ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const feNode = new THREE.Mesh(feNodeGeo, feNodeMat);
    frontendOrbit.add(feNode);

    // Layer 2: Backend (Indigo / Electric Blue)
    const backendOrbit = new THREE.Group();
    backendOrbit.rotation.x = -0.6;
    backendOrbit.rotation.z = 0.3;
    scene.add(backendOrbit);

    const orbit2RingGeo = new THREE.RingGeometry(3.1, 3.12, 64);
    const orbit2RingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const orbit2Ring = new THREE.Mesh(orbit2RingGeo, orbit2RingMat);
    orbit2Ring.rotation.x = Math.PI / 2;
    backendOrbit.add(orbit2Ring);

    const beNodeGeo = new THREE.OctahedronGeometry(0.34);
    const beNodeMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const beNode = new THREE.Mesh(beNodeGeo, beNodeMat);
    backendOrbit.add(beNode);

    // Layer 3: Database (Sky Blue / Teal)
    const dbOrbit = new THREE.Group();
    dbOrbit.rotation.x = 0.75;
    dbOrbit.rotation.y = -0.4;
    scene.add(dbOrbit);

    const orbit3RingGeo = new THREE.RingGeometry(3.8, 3.82, 64);
    const orbit3RingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const orbit3Ring = new THREE.Mesh(orbit3RingGeo, orbit3RingMat);
    orbit3Ring.rotation.x = Math.PI / 2;
    dbOrbit.add(orbit3Ring);

    const dbNodeGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.35, 12);
    const dbNodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const dbNode = new THREE.Mesh(dbNodeGeo, dbNodeMat);
    dbOrbit.add(dbNode);

    // Layer 4: AI / Automation (Purple / Violet)
    const aiOrbit = new THREE.Group();
    aiOrbit.rotation.x = -0.3;
    aiOrbit.rotation.y = 0.8;
    scene.add(aiOrbit);

    const orbit4RingGeo = new THREE.RingGeometry(4.5, 4.52, 64);
    const orbit4RingMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbit4Ring = new THREE.Mesh(orbit4RingGeo, orbit4RingMat);
    orbit4Ring.rotation.x = Math.PI / 2;
    aiOrbit.add(orbit4Ring);

    const aiNodeGeo = new THREE.DodecahedronGeometry(0.36);
    const aiNodeMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
    });
    const aiNode = new THREE.Mesh(aiNodeGeo, aiNodeMat);
    aiOrbit.add(aiNode);

    // 6. Particle Field (Neural Dust)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color alternating between cyan and purple
      if (i % 2 === 0) {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.94;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 0.66;
        colors[i * 3 + 1] = 0.33;
        colors[i * 3 + 2] = 0.97;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Parallax & Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.7;
      mouse.targetY = y * 0.5;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speedFactor = prefersReducedMotion ? 0.2 : 1.0;

      // Mouse Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 1.5;
      camera.position.y = 1.2 + mouse.y * 1.0;
      camera.lookAt(0, 0, 0);

      // Core rotation
      coreGroup.rotation.y = elapsedTime * 0.35 * speedFactor;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2 * speedFactor) * 0.15;
      wireCore.rotation.y = -elapsedTime * 0.25 * speedFactor;
      innerRing.rotation.z = elapsedTime * 0.15 * speedFactor;

      // Orbit 1: Frontend node rotation (radius 2.31)
      const r1 = 2.31;
      const angle1 = elapsedTime * 0.9 * speedFactor;
      feNode.position.set(Math.cos(angle1) * r1, 0, Math.sin(angle1) * r1);
      feNode.rotation.x += 0.02 * speedFactor;
      feNode.rotation.y += 0.03 * speedFactor;

      // Orbit 2: Backend node rotation (radius 3.11)
      const r2 = 3.11;
      const angle2 = -elapsedTime * 0.7 * speedFactor + 1.5;
      beNode.position.set(Math.cos(angle2) * r2, 0, Math.sin(angle2) * r2);
      beNode.rotation.x += 0.02 * speedFactor;
      beNode.rotation.z += 0.02 * speedFactor;

      // Orbit 3: Database node rotation (radius 3.81)
      const r3 = 3.81;
      const angle3 = elapsedTime * 0.55 * speedFactor + 3.2;
      dbNode.position.set(Math.cos(angle3) * r3, 0, Math.sin(angle3) * r3);
      dbNode.rotation.z += 0.015 * speedFactor;

      // Orbit 4: AI node rotation (radius 4.51)
      const r4 = 4.51;
      const angle4 = -elapsedTime * 0.45 * speedFactor + 4.8;
      aiNode.position.set(Math.cos(angle4) * r4, 0, Math.sin(angle4) * r4);
      aiNode.rotation.x += 0.03 * speedFactor;
      aiNode.rotation.y += 0.02 * speedFactor;

      // Particles ambient drift
      particles.rotation.y = elapsedTime * 0.04 * speedFactor;
      particles.rotation.x = Math.cos(elapsedTime * 0.03 * speedFactor) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);

      // Dispose
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      orbit1RingGeo.dispose();
      orbit1RingMat.dispose();
      orbit2RingGeo.dispose();
      orbit2RingMat.dispose();
      orbit3RingGeo.dispose();
      orbit3RingMat.dispose();
      orbit4RingGeo.dispose();
      orbit4RingMat.dispose();
      feNodeGeo.dispose();
      feNodeMat.dispose();
      beNodeGeo.dispose();
      beNodeMat.dispose();
      dbNodeGeo.dispose();
      dbNodeMat.dispose();
      aiNodeGeo.dispose();
      aiNodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (hasWebGL === false) {
    return <SceneFallback />;
  }

  return (
    <div
      className="relative w-full h-[380px] sm:h-[440px] md:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.06)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveLayer(null);
      }}
    >
      {/* Dynamic ambient radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />

      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Telemetry */}
      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
            Core Status: Online
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300">
          <Eye className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive 3D Engine</span>
        </div>
      </div>

      {/* Bottom HUD: Layer Pills with Interactive Hover */}
      <div className="absolute bottom-3.5 left-3 right-3 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md select-none pointer-events-auto">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block pl-2">
          Architecture Modules:
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onMouseEnter={() => setActiveLayer('Frontend')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
              activeLayer === 'Frontend'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Frontend</span>
          </button>

          <button
            type="button"
            onMouseEnter={() => setActiveLayer('Backend')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
              activeLayer === 'Backend'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Server className="w-3 h-3 text-indigo-400" />
            <span>Backend</span>
          </button>

          <button
            type="button"
            onMouseEnter={() => setActiveLayer('Database')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
              activeLayer === 'Database'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Database className="w-3 h-3 text-sky-400" />
            <span>Database</span>
          </button>

          <button
            type="button"
            onMouseEnter={() => setActiveLayer('AI')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
              activeLayer === 'AI'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>AI Core</span>
          </button>
        </div>
      </div>
    </div>
  );
};
