import React, {useState} from 'react';
import LabHeader from './LabHeader';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
type Shape = 'persegi' | 'persegi panjang' | 'segitiga' | 'jajargenjang' | 'trapesium';
const shapes: Shape[] = ['persegi', 'persegi panjang', 'segitiga', 'jajargenjang', 'trapesium'];

export default function ShapeLab() {
  const [shape, setShape] = useState<Shape>('persegi panjang');
  const [base, setBase] = useState(8);
  const [height, setHeight] = useState(5);
  const [top, setTop] = useState(4);
  const area = shape === 'segitiga' ? base * height / 2 : shape === 'trapesium' ? (base + top) * height / 2 : base * height;
  const perimeter = shape === 'persegi' ? 4 * base : shape === 'persegi panjang' ? 2 * (base + height) : null;
  const points = shape === 'segitiga' ? `60,220 ${60 + base * 28},220 60,${220 - height * 28}` : shape === 'jajargenjang' ? `100,220 ${100 + base * 28},220 ${60 + base * 28},${220 - height * 28} 60,${220 - height * 28}` : shape === 'trapesium' ? `60,220 ${60 + base * 28},220 ${60 + (base - top) * 14 + top * 28},${220 - height * 28} ${60 + (base - top) * 14},${220 - height * 28}` : '';

  return <section className="labCard" aria-label="Laboratorium segitiga dan segiempat">
    <LabHeader title="Luas dan keliling" />
    <p className="labIntro">Pilih bangun, lalu ubah ukurannya. Perhatikan rumus mana yang tetap dan mana yang berubah.</p>
    <div className="opTabs" role="group" aria-label="Pilih bangun datar">
      {shapes.map(item => <button key={item} type="button" className={`opTab ${shape === item ? 'active' : ''}`} aria-pressed={shape === item} onClick={() => setShape(item)}>{item}</button>)}
    </div>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="shape-base">Alas / sisi</label><strong className="valueChip">{base} cm</strong></div><input id="shape-base" className="rangeInput" type="range" min="2" max="12" value={base} onChange={event => setBase(Number(event.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="shape-height">Tinggi</label><strong className="valueChip">{height} cm</strong></div><input id="shape-height" className="rangeInput" type="range" min="2" max="10" value={height} onChange={event => setHeight(Number(event.target.value))}/></div>
    </div>
    {shape === 'trapesium' && <div className="sliderRow"><label htmlFor="shape-top">Sisi atas</label><strong className="valueChip">{top} cm</strong></div>}
    {shape === 'trapesium' && <input id="shape-top" className="rangeInput" type="range" min="1" max="10" value={top} onChange={event => setTop(Number(event.target.value))}/>}
    <div style={{maxWidth: 520, margin: '0 auto'}} aria-hidden="true">
      <svg viewBox="0 0 520 260" role="img" aria-label={`Bangun ${shape} dengan luas ${area} sentimeter persegi`}>
        {shape === 'persegi' && <rect x="60" y={220 - base * 18} width={base * 18} height={base * 18} fill={c.skyPale.value} stroke={c.ocean.value} strokeWidth="3"/>}
        {shape === 'persegi panjang' && <rect x="60" y={220 - height * 28} width={base * 28} height={height * 28} fill={c.skyPale.value} stroke={c.ocean.value} strokeWidth="3"/>}
        {shape !== 'persegi' && shape !== 'persegi panjang' && <polygon points={points} fill={c.skyPale.value} stroke={c.ocean.value} strokeWidth="3"/>}
        <text x="270" y="250" textAnchor="middle" fontSize="14" fill={c.ocean.value} fontWeight="700">{shape}</text>
      </svg>
    </div>
    <div className="percentGrid">
      <div className="percentStat accent"><small>Luas</small><strong>{area.toLocaleString('id-ID')} cm²</strong><span>{shape === 'segitiga' ? '½ × alas × tinggi' : shape === 'trapesium' ? '½ × (a + b) × tinggi' : 'alas × tinggi'}</span></div>
      <div className="percentStat"><small>Keliling</small><strong>{perimeter === null ? 'Perlu sisi lain' : `${perimeter} cm`}</strong><span>{perimeter === null ? 'Jumlahkan semua sisi' : '2 × (p + l)'}</span></div>
    </div>
    <p className="microNote">Luas mengukur daerah di dalam bangun. Keliling mengukur panjang tepi bangun.</p>
  </section>;
}
