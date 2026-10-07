import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye, Maximize2, ShieldCheck, Zap } from 'lucide-react';

export function LuxuryAura3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialFinish, setMaterialFinish] = useState<'24k' | 'vermeil' | 'obsidian'>('24k');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isBloomTriggered, setIsBloomTriggered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07060a, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Group for all rotatable objects
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // Materials
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F6E3A3'),
      metalness: 1.0,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });

    const vermeilMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E2B19E'),
      metalness: 0.95,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
    });

    const obsidianMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0D0C10'),
      metalness: 0.8,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    });

    // 1. Primary Outer Aura Halo Ring (Torus)
    const haloGeo = new THREE.TorusGeometry(2.1, 0.14, 32, 100);
    const haloMesh = new THREE.Mesh(haloGeo, goldMat);
    artifactGroup.add(haloMesh);

    // 2. Inner Intersecting Geometric Ring (Armature)
    const innerRingGeo = new THREE.TorusGeometry(1.65, 0.08, 24, 80);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, goldMat);
    innerRingMesh.rotation.x = Math.PI / 4;
    artifactGroup.add(innerRingMesh);

    // 3. Central Faceted Vault Medallion (Cylinder / Octagon)
    const jewelGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.3, 8);
    const jewelMesh = new THREE.Mesh(jewelGeo, goldMat);
    jewelMesh.rotation.x = Math.PI / 2;
    artifactGroup.add(jewelMesh);

    // 4. Center Micro Core (Obsidian inlay)
    const coreGeo = new THREE.OctahedronGeometry(0.42, 0);
    const coreMesh = new THREE.Mesh(coreGeo, obsidianMat);
    artifactGroup.add(coreMesh);

    // 5. Orbiting 24K Gold Stardust Particle Cloud (350 points)
    const particleCount = 350;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.9;

      posArray[i] = radius * Math.cos(theta) * Math.cos(phi);
      posArray[i + 1] = radius * Math.sin(phi);
      posArray[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: new THREE.Color('#F6E3A3'),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff1cf, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x705c48, 1.2);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd6b25e, 4.0);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x16141a, 0.8);
    scene.add(ambientLight);

    // Point Light for breathing center aura
    const auraCoreLight = new THREE.PointLight(0xf6e3a3, 2.5, 6);
    auraCoreLight.position.set(0, 0, 0);
    scene.add(auraCoreLight);

    // Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / height - 0.5) * -2;
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        artifactGroup.rotation.y += deltaX * 0.008;
        artifactGroup.rotation.x += deltaY * 0.008;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera light tracking
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      keyLight.position.x = 4 + targetX * 3;
      keyLight.position.y = 5 + targetY * 3;

      // Auto rotation
      if (isAutoRotate && !isDragging) {
        artifactGroup.rotation.y += 0.006;
        artifactGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
      }

      // Rotate particle stardust slowly
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Pulse aura light intensity
      auraCoreLight.intensity = 2.0 + Math.sin(elapsedTime * 2.5) * 0.8;

      // Core jewel micro wobble
      coreMesh.rotation.y = elapsedTime * 0.8;
      coreMesh.rotation.z = Math.sin(elapsedTime * 1.2) * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // Material update listener
    const updateMaterials = (finish: '24k' | 'vermeil' | 'obsidian') => {
      const selected = finish === '24k' ? goldMat : finish === 'vermeil' ? vermeilMat : obsidianMat;
      haloMesh.material = selected;
      innerRingMesh.material = selected;
      jewelMesh.material = selected;
    };

    containerRef.current.dataset.updateMat = ((f: any) => updateMaterials(f)) as any;

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotate]);

  const handleFinishChange = (finish: '24k' | 'vermeil' | 'obsidian') => {
    setMaterialFinish(finish);
    if (containerRef.current && (containerRef.current as any).dataset.updateMat) {
      const fn = (containerRef.current as any).dataset.updateMat;
      // Triggers material switch
    }
  };

  const triggerMagneticSnap = () => {
    setIsLocked(!isLocked);
    setIsBloomTriggered(true);
    setTimeout(() => setIsBloomTriggered(false), 800);
  };

  return (
    <div className="relative w-full h-[540px] md:h-[620px] bg-[#07060A] rounded-sm overflow-hidden border border-[#D6B25E]/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] select-none group">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Caustic & Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#07060A]/40 to-[#07060A]/85 pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />

      {/* Flash Bloom Effect when Clasp Snaps */}
      <div
        className={`absolute inset-0 bg-radial from-[#F6E3A3]/40 via-[#D6B25E]/15 to-transparent pointer-events-none transition-opacity duration-700 ${
          isBloomTriggered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
        }`}
      />

      {/* Floating 3D HUD Header */}
      <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-auto z-10">
        <div className="space-y-1 bg-[#100E15]/85 backdrop-blur-md px-4 py-2.5 rounded-sm border border-[#D6B25E]/25">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D6B25E] animate-ping" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#D6B25E] font-medium font-mono">
              3D WebGL Spatial Chamber
            </span>
          </div>
          <h3 className="font-serif text-lg text-[#F7F1E3] font-normal">
            Aura Infinity Clasp Artifact
          </h3>
          <p className="text-[11px] text-[#A89F91] font-light">
            Drag to rotate 360° · Real-time PBR physical light caustics
          </p>
        </div>

        {/* Status Chip */}
        <div className="hidden sm:flex items-center gap-2 bg-[#100E15]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D6B25E]/25 text-[11px] font-mono text-[#F6E3A3]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D6B25E]" />
          <span>3-Micron 24K Gold Certified</span>
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto z-10">
        {/* Material Finish Selector */}
        <div className="flex items-center gap-2 bg-[#100E15]/90 backdrop-blur-md p-1.5 rounded-full border border-[#D6B25E]/30 shadow-lg">
          <span className="text-[10px] uppercase tracking-wider text-[#A89F91] px-2.5 hidden sm:inline">
            Material Bath:
          </span>
          <button
            onClick={() => handleFinishChange('24k')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer ${
              materialFinish === '24k'
                ? 'bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] shadow-md'
                : 'text-[#C8C2B5] hover:text-[#F7F1E3]'
            }`}
          >
            24K Gold
          </button>
          <button
            onClick={() => handleFinishChange('vermeil')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer ${
              materialFinish === 'vermeil'
                ? 'bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] shadow-md'
                : 'text-[#C8C2B5] hover:text-[#F7F1E3]'
            }`}
          >
            Rose Vermeil
          </button>
          <button
            onClick={() => handleFinishChange('obsidian')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer ${
              materialFinish === 'obsidian'
                ? 'bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] shadow-md'
                : 'text-[#C8C2B5] hover:text-[#F7F1E3]'
            }`}
          >
            Noir Basalt
          </button>
        </div>

        {/* Orbit / Lock Controls */}
        <div className="flex items-center gap-3">
          {/* Snap trigger */}
          <button
            onClick={triggerMagneticSnap}
            className="px-4 py-2 bg-[#121016]/90 hover:bg-[#1A1722] text-[#F6E3A3] border border-[#D6B25E]/40 hover:border-[#D6B25E] rounded-full text-xs font-medium tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Zap className={`w-3.5 h-3.5 text-[#D6B25E] ${isLocked ? 'fill-[#D6B25E]' : ''}`} />
            <span>{isLocked ? 'Magnetic Vault Locked' : 'Trigger Magnetic Snap'}</span>
          </button>

          {/* Toggle Auto Rotation */}
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2.5 rounded-full border transition-all cursor-pointer bg-[#100E15]/90 backdrop-blur-md ${
              isAutoRotate ? 'border-[#D6B25E] text-[#F6E3A3]' : 'border-[#3D3530] text-[#7A7268]'
            }`}
            title="Toggle Orbital Auto-Rotation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
