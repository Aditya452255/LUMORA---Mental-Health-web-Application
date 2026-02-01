export function startLiteParticles() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};

  const container = document.createElement('div');
  container.className = 'particles-canvas';
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.zIndex = '-2';
  container.style.pointerEvents = 'none';
  document.body.appendChild(container);

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let rafId: number | null = null;
  let resizeHandler: (() => void) | null = null;

  function setSize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let particles: Array<{x:number;y:number;r:number;vx:number;vy:number;alpha:number}> = [];
  function initParticles() {
    const N = Math.round(Math.min(120, Math.max(40, window.innerWidth / 12)));
    particles = Array.from({ length: N }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.6 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: 0.06 + Math.random() * 0.06,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }
    rafId = requestAnimationFrame(draw);
  }

  function onResize() {
    setSize();
    initParticles();
  }

  setSize();
  initParticles();
  draw();

  resizeHandler = () => onResize();
  window.addEventListener('resize', resizeHandler);

  // Return cleanup
  return function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    if (container.parentElement) container.parentElement.removeChild(container);
  };
}
