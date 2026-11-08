import React, {useState} from 'react';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
const r = designTokens.roles;

export default function AngleLab() {
  const [angle, setAngle] = useState(55);
  const radians = angle * Math.PI / 180;
  const dx = Math.cos(radians) * 270;
  const dy = Math.sin(radians) * 270;
  const top = {x: 300, y: 90};
  const arcRadius = 38;
  const arcEnd = {x: top.x + arcRadius * Math.cos(radians), y: top.y + arcRadius * Math.sin(radians)};
  const other = 180 - angle;

  return <section className="labCard" aria-label="Laboratorium hubungan antar sudut">
    <div className="labHeader"><div><span className="eyebrow teal">LAB SUDUT</span><h3>Sudut mana yang sama besar?</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Dua garis sejajar dipotong satu garis transversal. Geser sudutnya dan amati pasangan sudut yang terbentuk.</p>
    <div className="sliderRow"><label htmlFor="angle-value">Besar sudut transversal</label><strong className="valueChip">{angle}°</strong></div>
    <input id="angle-value" className="rangeInput" type="range" min="20" max="160" value={angle} onChange={event => setAngle(Number(event.target.value))}/>
    <div className="angleScene">
      <svg viewBox="0 0 600 300" role="img" aria-label={`Dua garis sejajar dipotong transversal dengan sudut ${angle} derajat`}>
        <line x1="35" y1="90" x2="565" y2="90" stroke={c.ocean.value} strokeWidth="4"/>
        <line x1="35" y1="210" x2="565" y2="210" stroke={c.ocean.value} strokeWidth="4"/>
        <line x1={top.x - dx} y1={top.y - dy} x2={top.x + dx} y2={top.y + dy} stroke={c.ocean.value} strokeWidth="4"/>
        <path d={`M ${top.x + arcRadius} ${top.y} A ${arcRadius} ${arcRadius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke={c.teal.value} strokeWidth="4"/>
        <circle cx={top.x} cy={top.y} r="5" fill={c.ink.value}/>
        <circle cx={top.x} cy="210" r="5" fill={c.ink.value}/>
        <text x={top.x + 48} y={top.y + 28} fontSize="15" fontWeight="800" fill={c.ocean.value}>{angle}°</text>
        <text x={top.x + 48} y="198" fontSize="15" fontWeight="800" fill={c.ocean.value}>{angle}°</text>
        <text x="46" y="80" fontSize="12" fill={c.muted.value}>garis 1</text>
        <text x="46" y="234" fontSize="12" fill={c.muted.value}>garis 2</text>
      </svg>
    </div>
    <div className="angleGrid">
      <div><small>Sudut sehadap</small><strong>{angle}°</strong><p>Sama besar, posisi bersesuaian.</p></div>
      <div><small>Sudut dalam berseberangan</small><strong>{angle}°</strong><p>Di antara dua garis, sisi berlawanan.</p></div>
      <div><small>Sudut dalam sepihak</small><strong>{other}°</strong><p>Jumlahnya 180°, berpelurus.</p></div>
      <div><small>Sudut luar berseberangan</small><strong>{angle}°</strong><p>Sama besar, di luar garis sejajar.</p></div>
    </div>
    <p className="microNote">💡 Jika dua garis sejajar, cukup satu sudut diketahui untuk menemukan semua sudut lainnya.</p>
  </section>;
}
