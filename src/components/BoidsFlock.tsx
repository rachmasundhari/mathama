import React, {useEffect, useRef} from 'react';

/*
 * A quiet flock of triangles behind the hero. Plain canvas 2D, no dependency.
 * The pointer pushes boids away, so a visitor can disturb the flock without
 * touching the copy or the lab. Motion stops offscreen, in a hidden tab, and
 * under prefers-reduced-motion, where one static frame stays visible.
 */

type Boid = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

const TAU = Math.PI * 2;
const SEPARATION = 24;
const ALIGN = 52;
const COHERE = 70;
const MIN_SPEED = 14;
const MAX_SPEED = 46;
const MAX_FORCE = 90;
const POINTER_RADIUS = 120;

export default function BoidsFlock(): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = {x: -9999, y: -9999};
    let width = 0;
    let height = 0;
    let boids: Boid[] = [];
    let frame = 0;
    let previous = 0;
    let running = false;
    let visible = true;

    const seed = () => {
      const count = Math.min(90, Math.max(24, Math.round((width * height) / 13000)));
      boids = Array.from({length: count}, () => {
        const angle = Math.random() * TAU;
        const speed = MIN_SPEED + Math.random() * 14;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 2.6,
          alpha: 0.1 + Math.random() * 0.1,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#1a9db5';
      for (const boid of boids) {
        ctx.save();
        ctx.translate(boid.x, boid.y);
        ctx.rotate(Math.atan2(boid.vy, boid.vx));
        ctx.globalAlpha = boid.alpha;
        ctx.beginPath();
        ctx.moveTo(boid.size, 0);
        ctx.lineTo(-boid.size, boid.size * 0.72);
        ctx.lineTo(-boid.size, -boid.size * 0.72);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    const step = (dt: number) => {
      const turn = new Array(boids.length);
      for (let i = 0; i < boids.length; i++) {
        const a = boids[i];
        let sepX = 0;
        let sepY = 0;
        let sepCount = 0;
        let aliX = 0;
        let aliY = 0;
        let aliCount = 0;
        let cohX = 0;
        let cohY = 0;
        let cohCount = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const b = boids[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq > COHERE * COHERE) continue;
          const distance = Math.sqrt(distanceSq) || 0.001;
          if (distance < SEPARATION) {
            sepX += dx / distance;
            sepY += dy / distance;
            sepCount++;
          }
          aliX += b.vx;
          aliY += b.vy;
          aliCount++;
          cohX += b.x;
          cohY += b.y;
          cohCount++;
        }

        let ax = 0;
        let ay = 0;
        if (sepCount) {
          ax += (sepX / sepCount) * 34;
          ay += (sepY / sepCount) * 34;
        }
        if (aliCount) {
          ax += (aliX / aliCount - a.vx) * 1.1;
          ay += (aliY / aliCount - a.vy) * 1.1;
        }
        if (cohCount) {
          ax += (cohX / cohCount - a.x) * 0.55;
          ay += (cohY / cohCount - a.y) * 0.55;
        }

        const dxPointer = a.x - pointer.x;
        const dyPointer = a.y - pointer.y;
        const pointerSq = dxPointer * dxPointer + dyPointer * dyPointer;
        if (pointerSq < POINTER_RADIUS * POINTER_RADIUS) {
          const distance = Math.sqrt(pointerSq) || 1;
          const push = 140 * (1 - distance / POINTER_RADIUS);
          ax += (dxPointer / distance) * push;
          ay += (dyPointer / distance) * push;
        }

        const force = Math.hypot(ax, ay);
        if (force > MAX_FORCE) {
          ax = (ax / force) * MAX_FORCE;
          ay = (ay / force) * MAX_FORCE;
        }
        turn[i] = {ax, ay};
      }

      for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];
        const {ax, ay} = turn[i];
        boid.vx += ax * dt;
        boid.vy += ay * dt;
        const speed = Math.hypot(boid.vx, boid.vy) || 0.001;
        const clamped = Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed));
        boid.vx = (boid.vx / speed) * clamped;
        boid.vy = (boid.vy / speed) * clamped;
        boid.x += boid.vx * dt;
        boid.y += boid.vy * dt;
        if (boid.x < -12) boid.x = width + 12;
        if (boid.x > width + 12) boid.x = -12;
        if (boid.y < -12) boid.y = height + 12;
        if (boid.y > height + 12) boid.y = -12;
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - previous) / 1000));
      previous = now;
      if (visible && !document.hidden) {
        step(dt);
        draw();
      }
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || motion.matches) return;
      running = true;
      previous = performance.now();
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onMotionChange = () => {
      if (motion.matches) {
        stop();
        draw();
      } else {
        start();
      }
    };

    const observer = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    observer?.observe(host);
    const intersection = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          visible = entries[0]?.isIntersecting ?? true;
        }, {threshold: 0})
      : null;
    intersection?.observe(host);

    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    motion.addEventListener('change', onMotionChange);

    resize();
    start();

    return () => {
      stop();
      observer?.disconnect();
      intersection?.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="heroBoids" aria-hidden="true" />;
}
