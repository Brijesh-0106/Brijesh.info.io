"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────
//  HeroBackground
//  Drop this anywhere inside your hero section.
//  The canvas is position:absolute, so make sure
//  the parent has position:relative + a height.
// ─────────────────────────────────────────────

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true, // transparent bg — your #0d1117 shows through
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Scene / Camera ───────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas?.clientWidth / canvas?.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 2;

    // ── Resize handler ───────────────────────
    function handleResize() {
      const W = canvas?.clientWidth ?? 10;
      const H = canvas?.clientHeight ?? 10;
      renderer.setSize(W, H, false); // false = don't set canvas style
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    // ── Particles ────────────────────────────
    const COUNT = 700;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x58a6ff, // ← swap to match your accent color
      size: 0.018,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Mouse tracking ───────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 }; // lerped — gives the spring-lag feel

    function handleMouseMove(e: any) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMouseMove);

    // ── Render loop ──────────────────────────
    let rafId: any;
    function animate() {
      rafId = requestAnimationFrame(animate);

      // Lerp toward mouse position (0.05 = spring lag)
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      // Slow idle rotation + mouse influence
      particles.rotation.y += 0.001 + target.x * 0.003;
      particles.rotation.x += 0.0005 + target.y * 0.002;

      renderer.render(scene, camera);
    }
    animate();

    // ── Cleanup ──────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-screen"
      style={{
        position: "absolute", // covers entire parent
        width: "80%",
        zIndex: 0,
      }}
    />
  );
}
