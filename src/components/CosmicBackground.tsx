import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isInitialized.current) return;
    isInitialized.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create gradient texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(93, 217, 193, 1)');
    gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.5)');
    gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create nebula clouds
    const cloudGeometry = new THREE.SphereGeometry(30, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      color: 0x5DD9C1,
      transparent: true,
      opacity: 0.03,
      blending: THREE.AdditiveBlending,
    });
    
    const cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud1.position.set(-40, 20, -20);
    scene.add(cloud1);

    const cloudMaterial2 = cloudMaterial.clone();
    cloudMaterial2.color = new THREE.Color(0xA78BFA);
    const cloud2 = new THREE.Mesh(cloudGeometry, cloudMaterial2);
    cloud2.position.set(40, -20, -30);
    scene.add(cloud2);

    // Mouse move effect
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles slowly
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Mouse interaction
      particlesMesh.rotation.x += (mouseRef.current.y * 0.05 - particlesMesh.rotation.x) * 0.05;
      particlesMesh.rotation.y += (mouseRef.current.x * 0.05 - particlesMesh.rotation.y) * 0.05;

      // Rotate clouds
      cloud1.rotation.y += 0.0003;
      cloud2.rotation.y -= 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isInitialized.current = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Properly dispose Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      texture.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      cloudMaterial2.dispose();
      
      scene.clear();
      renderer.dispose();
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        background: 'radial-gradient(ellipse at center, #2D1B4E 0%, #1A102C 100%)',
      }}
    />
  );
}