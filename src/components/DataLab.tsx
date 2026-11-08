import React, {useState} from 'react';
import {designTokens} from '../design/tokens.generated';

const categories = ['Senin', 'Selasa', 'Rabu', 'Kamis'];
const c = designTokens.color;
const r = designTokens.roles;
const colors = [c.teal.value, c.ocean.value, c.sky.value, c.aqua.value];

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = (angle - 90) * Math.PI / 180;
  return {x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians)};
}

function slicePath(start: number, end: number, radius: number) {
  const center = {x: 160, y: 150};
  const first = polar(center.x, center.y, radius, start);
  const second = polar(center.x, center.y, radius, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${center.x} ${center.y} L ${first.x} ${first.y} A ${radius} ${radius} 0 ${large} 1 ${second.x} ${second.y} Z`;
}

export default function DataLab() {
  const [values, setValues] = useState([8, 12, 6, 10]);
  const [chart, setChart] = useState<'batang' | 'lingkaran'>('batang');
  const total = values.reduce((sum, value) => sum + value, 0);
  const max = Math.max(...values, 1);
  const mean = total / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const median = (sorted[1] + sorted[2]) / 2;
  const range = Math.max(...values) - Math.min(...values);
  let cursor = 0;

  return <section className="labCard" aria-label="Laboratorium data dan diagram">
    <div className="labHeader"><div><span className="eyebrow teal">LAB DATA</span><h3>Ceritakan data dengan gambar</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Klub Cakrawala mencatat banyak pengunjung selama empat hari. Ubah datanya, lalu pilih diagram yang paling jelas.</p>
    <div className="dataSliders">
      {categories.map((category, index) => <label key={category} htmlFor={`data-${index}`}>{category}<strong>{values[index]}</strong><input id={`data-${index}`} className="rangeInput" type="range" min="0" max="20" value={values[index]} onChange={event => setValues(old => old.map((value, position) => position === index ? Number(event.target.value) : value))}/></label>)}
    </div>
    <div className="opTabs" role="group" aria-label="Pilih jenis diagram">
      <button type="button" className={`opTab ${chart === 'batang' ? 'active' : ''}`} aria-pressed={chart === 'batang'} onClick={() => setChart('batang')}>Diagram batang</button>
      <button type="button" className={`opTab ${chart === 'lingkaran' ? 'active' : ''}`} aria-pressed={chart === 'lingkaran'} onClick={() => setChart('lingkaran')}>Diagram lingkaran</button>
    </div>
    <div className="dataChart" aria-label={`Diagram ${chart} data pengunjung`}>
      {chart === 'batang' ? <svg viewBox="0 0 420 260" role="img">
        <line x1="42" y1="220" x2="400" y2="220" stroke={r.border} strokeWidth="2"/>
        {values.map((value, index) => {
          const height = (value / max) * 170;
          return <g key={categories[index]}>
            <rect x={60 + index * 88} y={220 - height} width="48" height={height} rx="7" fill={colors[index]}/>
            <text x={84 + index * 88} y={212 - height} textAnchor="middle" fontSize="14" fontWeight="800" fill={c.ink.value}>{value}</text>
            <text x={84 + index * 88} y="242" textAnchor="middle" fontSize="12" fill={c.slate.value}>{categories[index]}</text>
          </g>;
        })}
      </svg> : <svg viewBox="0 0 420 300" role="img">
        {total === 0 ? <text x="210" y="150" textAnchor="middle" fontSize="15" fill={c.muted.value}>Belum ada data</text> : values.map((value, index) => {
          const start = cursor / total * 360;
          cursor += value;
          const end = cursor / total * 360;
          return <path key={categories[index]} d={slicePath(start, end, 110)} fill={colors[index]} stroke={c.white.value} strokeWidth="2"/>;
        })}
        {total > 0 && <g>{values.map((value, index) => {
          const angle = (values.slice(0, index).reduce((a, b) => a + b, 0) + value / 2) / total * 360;
          const point = polar(160, 150, 72, angle);
          return value > 0 ? <text key={categories[index]} x={point.x} y={point.y} textAnchor="middle" fontSize="12" fontWeight="800" fill={c.white.value}>{Math.round(value / total * 100)}%</text> : null;
        })}</g>}
        <g>{categories.map((category, index) => <g key={category}><rect x="300" y={92 + index * 30} width="12" height="12" rx="3" fill={colors[index]}/><text x="320" y={103 + index * 30} fontSize="12" fill={c.slate.value}>{category}</text></g>)}</g>
      </svg>}
    </div>
    <div className="statGrid">
      <div><small>Total</small><strong>{total}</strong></div>
      <div><small>Rata-rata</small><strong>{mean.toFixed(1).replace('.', ',')}</strong></div>
      <div><small>Median</small><strong>{median}</strong></div>
      <div><small>Jangkauan</small><strong>{range}</strong></div>
    </div>
    <p className="microNote">💡 Diagram batang mudah dibandingkan antar kategori. Diagram lingkaran menunjukkan bagian dari keseluruhan.</p>
  </section>;
}
