"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ParticleWaveBackgroundProps = {
  className?: string;
};

export function ParticleWaveBackground({ className }: ParticleWaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0A0A0A");
    scene.fog = new THREE.Fog("#0A0A0A", 8, 24);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 4.2, 9.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const gridSize = 110;
    const spacing = 0.16;
    const halfGrid = ((gridSize - 1) * spacing) / 2;
    const count = gridSize * gridSize;

    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 2);

    let ptr = 0;
    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < gridSize; x += 1) {
        const worldX = x * spacing - halfGrid;
        const worldY = y * spacing - halfGrid;
        base[ptr * 2] = worldX;
        base[ptr * 2 + 1] = worldY;
        positions[ptr * 3] = worldX;
        positions[ptr * 3 + 1] = worldY;
        positions[ptr * 3 + 2] = 0;
        ptr += 1;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#e5e5e5",
      size: 0.033,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -1.02;
    points.rotation.z = -0.08;
    scene.add(points);

    const clock = new THREE.Clock();
    const frequency = 0.9;
    const amplitude = 0.2;
    const speed = 0.24;
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth - 0.5;
      mouse.y = event.clientY / window.innerHeight - 0.5;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let frameId = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime() * speed;
      const positionArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i += 1) {
        const x = base[i * 2];
        const y = base[i * 2 + 1];
        const z = Math.sin(x * frequency + elapsed) * Math.cos(y * frequency + elapsed) * amplitude;
        positionArray[i * 3 + 2] = z;
      }

      geometry.attributes.position.needsUpdate = true;

      camera.position.x += ((mouse.x * 0.35) - camera.position.x) * 0.015;
      camera.position.y += ((4.2 - mouse.y * 0.3) - camera.position.y) * 0.015;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div aria-hidden ref={containerRef} className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className ?? ""}`} />;
}

export function BackgroundNetwork(props: ParticleWaveBackgroundProps) {
  return <ParticleWaveBackground {...props} />;
}
