import React, {useEffect, useRef, useState} from 'react';
import LabHeader from './LabHeader';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
const r = designTokens.roles;

export default function Similarity3DLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.6);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let frame = 0;
    let renderer: import('three').WebGLRenderer | null = null;
    let observer: ResizeObserver | null = null;
    let cleanupScene: (() => void) | null = null;

    const start = async () => {
      const THREE = await import('three');
      if (disposed) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(r.surface);
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(6.2, 4.6, 7.4);
      camera.lookAt(0, 1.2, 0);

      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(c.white.value, 1.9));
      const key = new THREE.DirectionalLight(c.white.value, 2.4);
      key.position.set(5, 8, 6);
      scene.add(key);
      const fill = new THREE.DirectionalLight(c.sky.value, 1.2);
      fill.position.set(-6, 4, -4);
      scene.add(fill);

      const grid = new THREE.GridHelper(16, 16, c.sky.value, r.borderStrong);
      scene.add(grid);

      const group = new THREE.Group();
      scene.add(group);
      const base = 1.5;
      const smallSize = base;
      const largeSize = base * scale;
      const geometries: import('three').BufferGeometry[] = [];
      const materials: import('three').Material[] = [];

      const addBox = (size: number, x: number, color: string, edgeColor: string) => {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({color, roughness: 0.55, metalness: 0.05, transparent: true, opacity: 0.82});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, size / 2, 0);
        group.add(mesh);
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: edgeColor}));
        mesh.add(line);
        geometries.push(geometry, edges);
        materials.push(material, line.material as import('three').Material);
      };

      addBox(smallSize, -2.4, c.aqua.value, c.teal.value);
      addBox(largeSize, 2.2, c.ocean.value, r.primaryDarker);

      const resize = () => {
        if (!renderer) return;
        const width = container.clientWidth || 600;
        const height = container.clientHeight || 330;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();
      observer = new ResizeObserver(resize);
      observer.observe(container);

      let dragging = false;
      let previousX = 0;
      let rotation = 0;
      const onPointerDown = (event: PointerEvent) => {dragging = true; previousX = event.clientX;};
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        rotation += (event.clientX - previousX) * 0.008;
        previousX = event.clientX;
      };
      const onPointerUp = () => {dragging = false;};
      const canvas = renderer.domElement;
      canvas.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const render = (time = 0) => {
        if (disposed) return;
        group.rotation.y = rotation + (reduceMotion ? 0 : Math.sin(time * 0.0004) * 0.24);
        renderer?.render(scene, camera);
        if (!reduceMotion) frame = requestAnimationFrame(render);
      };
      render();
      setReady(true);

      cleanupScene = () => {
        canvas.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        geometries.forEach(geometry => geometry.dispose());
        materials.forEach(material => material.dispose());
        grid.geometry.dispose();
        (grid.material as import('three').Material).dispose();
        camera.clear();
      };
    };

    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      cleanupScene?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [scale]);

  return <section className="labCard" aria-label="Laboratorium kesebangunan tiga dimensi">
    <LabHeader title="Dua balok, satu bentuk" status={<span className="livePill"><span className="liveDot"/> {ready ? '3D siap' : 'Memuat 3D'}</span>} />
    <p className="labIntro">Balok kecil dan besar sebangun. Geser faktor skala, lalu seret gambar untuk memutar pandangan.</p>
    <div className="sliderRow"><label htmlFor="similarity-3d-scale">Faktor skala ruang</label><strong className="valueChip">×{scale.toFixed(1).replace('.', ',')}</strong></div>
    <input id="similarity-3d-scale" className="rangeInput" type="range" min="1" max="2.5" step="0.1" value={scale} onChange={event => setScale(Number(event.target.value))}/>
    <div className="threeCanvas" ref={containerRef} role="img" aria-label={`Balok sebangun dengan faktor skala ${scale}`}/>
    <div className="similarityGrid">
      <div><small>Panjang rusuk</small><strong>{1.5} → {(1.5 * scale).toFixed(1).replace('.', ',')}</strong></div>
      <div><small>Perbandingan volume</small><strong>{Math.pow(scale, 3).toFixed(2).replace('.', ',')} : 1</strong></div>
      <div><small>Bentuk</small><strong>Tetap sebangun</strong></div>
    </div>
    <p className="microNote">💡 Pada bangun ruang sebangun, panjang berbanding dengan faktor skala, luas dengan kuadratnya, dan volume dengan pangkat tiganya.</p>
  </section>;
}
