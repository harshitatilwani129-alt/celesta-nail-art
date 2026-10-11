import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, FastForward, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { OPENING_BOX_IMAGE } from '../data/products';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const threeCanvasRef = useRef<HTMLDivElement>(null);

  // Animation timeline configuration
  const durationTotal = 8.5; // seconds
  const startTimeRef = useRef<number>(performance.now());
  const pausedTimeRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(performance.now());

  // Mouse interaction for realistic 3D parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main animation timer loop
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      if (!isPaused) {
        const elapsed = (now - startTimeRef.current) / 1000;
        const currentProgress = Math.min(elapsed / durationTotal, 1);
        setProgress(currentProgress);

        // Sequence breakdown:
        // Stage 1 (0 to 2.8s): The Acrylic Keepsake Showcase (soft pan, studio illumination, depth blur)
        // Stage 2 (2.8 to 5.4s): Acrylic Box Unlocks & Nails Levitate in 3D Space
        // Stage 3 (5.4 to 7.2s): Hero Bordeaux & Chrome Nail Zoom & 360 Turnaround
        // Stage 4 (7.2 to 8.5s): Hyper-drive macro surface zoom & flash transition into homepage
        if (elapsed < 2.8) {
          setStage(1);
        } else if (elapsed < 5.4) {
          setStage(2);
        } else if (elapsed < 7.2) {
          setStage(3);
        } else if (elapsed < durationTotal) {
          setStage(4);
        } else {
          onComplete();
          return;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, onComplete]);

  // Three.js floating ambient particle and light shimmer layer
  useEffect(() => {
    const container = threeCanvasRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // Ambient floating light motes / micro-bubbles in acrylic
    const particleCount = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scales[i] = Math.random() * 0.08 + 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material with soft sky-blue glow
    const pMaterial = new THREE.PointsMaterial({
      color: 0x87ceeb,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 3D Hero Nail floating mesh for Stage 2 & 3
    const nailGroup = new THREE.Group();
    scene.add(nailGroup);

    // Create realistic curved nail geometry
    const length = 1.1;
    const width = 0.48;
    const segmentsU = 24;
    const segmentsV = 24;
    const nailGeo = new THREE.BufferGeometry();
    const nPositions = [];
    const nNormals = [];
    const nIndices = [];

    for (let i = 0; i <= segmentsV; i++) {
      const v = i / segmentsV;
      const y = (v - 0.5) * length;
      const w = width * (1 - Math.pow(v, 2) * 0.48); // tapered almond
      const arch = Math.sin(v * Math.PI) * 0.14;

      for (let j = 0; j <= segmentsU; j++) {
        const u = j / segmentsU;
        const angle = (u - 0.5) * Math.PI * 0.85;
        const x = Math.sin(angle) * (w * 0.7);
        const z = Math.cos(angle) * (w * 0.35) + arch;
        nPositions.push(x, y, z);
        nNormals.push(x, 0.2, z);
      }
    }

    for (let i = 0; i < segmentsV; i++) {
      for (let j = 0; j < segmentsU; j++) {
        const a = i * (segmentsU + 1) + j;
        const b = (i + 1) * (segmentsU + 1) + j;
        const c = (i + 1) * (segmentsU + 1) + (j + 1);
        const d = i * (segmentsU + 1) + (j + 1);
        nIndices.push(a, b, d);
        nIndices.push(b, c, d);
      }
    }

    nailGeo.setAttribute('position', new THREE.Float32BufferAttribute(nPositions, 3));
    nailGeo.setIndex(nIndices);
    nailGeo.computeVertexNormals();

    // High gloss bordeaux wine gel material with clearcoat
    const gelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x670d1f, // Deep rich Bordeaux
      roughness: 0.04,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.98,
    });

    const heroNailMesh = new THREE.Mesh(nailGeo, gelMaterial);
    nailGroup.add(heroNailMesh);

    // Chrome French smile tip
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.95,
      roughness: 0.08,
    });
    const tipMesh = new THREE.Mesh(nailGeo.clone(), chromeMat);
    tipMesh.scale.set(0.99, 0.38, 1.0);
    tipMesh.position.y += 0.32;
    tipMesh.position.z += 0.005;
    nailGroup.add(tipMesh);

    nailGroup.position.set(0, 0, -10); // hidden initially

    // Lights for Three.js scene
    const keyL = new THREE.DirectionalLight(0xffffff, 2.5);
    keyL.position.set(4, 5, 5);
    scene.add(keyL);

    const fillL = new THREE.DirectionalLight(0x87ceeb, 1.5);
    fillL.position.set(-4, -2, 3);
    scene.add(fillL);

    let rafId: number;
    const render = () => {
      // Rotate particles
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Stage-specific 3D hero nail position & rotation
      if (stage === 1) {
        nailGroup.position.z = -10; // offscreen
      } else if (stage === 2) {
        // Floating out of the acrylic box
        nailGroup.position.set(0.3, -0.2, 1.2);
        nailGroup.scale.set(0.65, 0.65, 0.65);
        nailGroup.rotation.y += 0.015;
        nailGroup.rotation.x = -0.3 + Math.sin(Date.now() * 0.002) * 0.1;
      } else if (stage === 3) {
        // Hero center close-up
        nailGroup.position.set(0, 0.1, 3.2);
        nailGroup.scale.set(1.2, 1.2, 1.2);
        nailGroup.rotation.y += 0.022; // 360 inspection turnaround
        nailGroup.rotation.x = -0.15 + Math.sin(Date.now() * 0.003) * 0.08;
      } else if (stage === 4) {
        // Plunge into the nail surface
        nailGroup.position.z += 0.15;
        nailGroup.scale.multiplyScalar(1.05);
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [stage]);

  // Stage calculations for image transforms
  // Stage 1: slow cinematic push-in (scale 1.0 -> 1.08)
  // Stage 2: tilt & focus on compartments (scale 1.08 -> 1.25)
  // Stage 3: extreme macro zoom toward the bordeaux & chrome nail (scale 1.25 -> 2.6)
  // Stage 4: rapid zoom into nail surface (scale 2.6 -> 12.0)
  let imgScale = 1.0;
  let imgTranslateX = 0;
  let imgTranslateY = 0;
  let imgBrightness = 1.0;

  if (stage === 1) {
    const p1 = Math.min(progress / 0.33, 1);
    imgScale = 1.0 + p1 * 0.08;
    imgTranslateX = mousePos.x * 12;
    imgTranslateY = mousePos.y * 8;
  } else if (stage === 2) {
    const p2 = Math.min((progress - 0.33) / 0.3, 1);
    imgScale = 1.08 + p2 * 0.25;
    imgTranslateX = mousePos.x * 16 - p2 * 30;
    imgTranslateY = mousePos.y * 12 - p2 * 20;
  } else if (stage === 3) {
    const p3 = Math.min((progress - 0.63) / 0.22, 1);
    imgScale = 1.33 + p3 * 1.2;
    imgTranslateX = -30 - p3 * 50;
    imgTranslateY = -20 - p3 * 40;
    imgBrightness = 1.0 + p3 * 0.3;
  } else if (stage === 4) {
    const p4 = Math.min((progress - 0.85) / 0.15, 1);
    imgScale = 2.53 + Math.pow(p4, 3) * 14.0;
    imgTranslateX = -80 - p4 * 90;
    imgTranslateY = -60 - p4 * 60;
    imgBrightness = 1.3 + p4 * 3.5; // bloom flash into sky blue
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#EBF6FD] flex flex-col justify-between select-none">
      {/* Background Main Image Layer with 3D Perspective & Motion */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 2.5}deg) rotateX(${-mousePos.y * 2.5}deg)`,
        }}
      >
        <img
          src={OPENING_BOX_IMAGE}
          alt="Luxury Transparent Acrylic Nail Box with Glossy Press-on Nails"
          className="w-full h-full object-cover object-center transition-all duration-300 ease-out"
          style={{
            transform: `scale(${imgScale}) translate(${imgTranslateX}px, ${imgTranslateY}px)`,
            filter: `brightness(${imgBrightness}) contrast(1.04)`,
          }}
        />

        {/* Dynamic Studio Shimmer Reflections over the Acrylic Box */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${40 + mousePos.y * 25}%, rgba(255,255,255,0.85) 0%, rgba(135,206,235,0.4) 40%, transparent 70%)`,
          }}
        />

        {/* Ambient Sky-Blue Edge Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#EBF6FD]/20 to-[#87CEEB]/40 pointer-events-none" />

        {/* Stage 4 Sky-Blue Light Flash Transition */}
        {stage === 4 && (
          <div
            className="absolute inset-0 bg-[#EBF6FD] pointer-events-none transition-opacity duration-300"
            style={{ opacity: Math.min((progress - 0.85) / 0.15, 1) }}
          />
        )}
      </div>

      {/* Three.js 3D Floating Particles & Hero Nail Mesh Overlay */}
      <div
        ref={threeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Top Bar Header Overlay */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-wider text-[#11283B]">
            CÉLESTE
          </span>
          <span className="hidden sm:inline text-xs text-[#2677A8] tracking-widest uppercase font-semibold">
            · Studio Film
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Pause / Play control */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2.5 text-[#11283B] bg-white/70 hover:bg-white backdrop-blur-md border border-white/80 rounded-full shadow-sm transition-all cursor-pointer"
            title={isPaused ? 'Resume Film' : 'Pause Film'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Skip Experience */}
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#11283B] bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-[#2677A8]" />
          </button>
        </div>
      </div>

      {/* Center Cinematic Floating Highlights for Stage 2 & Stage 3 */}
      {stage === 2 && (
        <div className="relative z-20 max-w-sm mx-auto pointer-events-none animate-in fade-in zoom-in-95 duration-500">
          <div className="glass-acrylic rounded-2xl p-4 text-center shadow-xl border border-white/90">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#2677A8]">
              Scene 02 · 12-Grid Acrylic Display
            </span>
            <p className="text-xs text-[#11283B] font-semibold mt-1">
              Curated Compartments · Deep Bordeaux, Blush Chrome & Marble Swirls
            </p>
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="relative z-20 max-w-sm mx-auto pointer-events-none animate-in fade-in zoom-in-95 duration-500">
          <div className="glass-acrylic rounded-2xl p-4 text-center shadow-xl border border-white/90">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#2677A8]">
              Scene 03 · Hero Glazed Nail Macro
            </span>
            <p className="text-xs text-[#11283B] font-semibold mt-1">
              Liquid Silver Mirror French Tip · 5-Coat Salon UV Resin
            </p>
          </div>
        </div>
      )}

      {/* Bottom Stage Narrative Callout Card */}
      <div className="relative z-20 max-w-lg mx-auto mb-8 px-6 text-center">
        <div className="glass-acrylic rounded-3xl p-6 shadow-2xl border border-white/90 transition-all duration-500">
          <div className="flex items-center justify-center gap-2 mb-2 text-xs font-semibold tracking-widest text-[#2677A8] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
            <span>
              {stage === 1 && 'Scene 01 · The Transparent Acrylic Keepsake'}
              {stage === 2 && 'Scene 02 · Unlocking the Vault'}
              {stage === 3 && 'Scene 03 · Bordeaux & Chrome Smile Line'}
              {stage === 4 && 'Scene 04 · Welcome to CÉLESTE Atelier'}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-[#11283B] font-medium tracking-tight mb-2">
            {stage === 1 && 'Handcrafted Gel Press-On Collection'}
            {stage === 2 && '12-Compartment Crystal Organizer Box'}
            {stage === 3 && 'Velvet Bordeaux & Liquid Silver Chrome'}
            {stage === 4 && 'Your Nails. Your Art.'}
          </h2>

          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {stage === 1 && 'The transparent acrylic box floats in a soft sky-blue studio with realistic reflections, showcasing our curated press-on collection.'}
            {stage === 2 && 'Propped open to reveal almond and oval silhouettes, deep wine red lacquer, and hand-painted French calligraphy.'}
            {stage === 3 && 'Macro inspection of the hand-sculpted apex, high-gloss gel curvature, and mirror French smile line.'}
            {stage === 4 && 'Salon-worthy nails, designed for your every mood.'}
          </p>

          {/* Progress Timeline */}
          <div className="w-full h-1.5 bg-sky-100/80 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#87CEEB] to-[#2677A8] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>

          {/* Interactive Mouse Hint */}
          <div className="mt-3 text-[10px] text-[#2677A8]/80 font-medium tracking-wider uppercase">
            Move cursor to tilt light reflections across the acrylic box
          </div>
        </div>
      </div>
    </div>
  );
};
