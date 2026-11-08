import React, {useState} from 'react';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
const r = designTokens.roles;

export default function NumberLineLab() {
  const [start, setStart] = useState(-3);
  const [step, setStep] = useState(5);
  const end = start + step;
  const pointX = (value: number) => 36 + (value + 10) * 25.2;
  const left = pointX(start);
  const right = pointX(end);
  return <section className="labCard" aria-label="Eksperimen garis bilangan">
    <div className="labHeader"><div><span className="eyebrow teal">LAB BILANGAN BULAT</span><h3>Bergerak di garis bilangan</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Bilangan positif melangkah ke kanan, sedangkan bilangan negatif ke kiri.</p>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="line-start">Titik awal</label><strong className="valueChip">{start}</strong></div><input id="line-start" className="rangeInput" type="range" min="-6" max="6" value={start} onChange={e => setStart(Number(e.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="line-step">Perubahan</label><strong className="valueChip">{step > 0 ? `+${step}` : step}</strong></div><input id="line-step" className="rangeInput" type="range" min="-4" max="4" value={step} onChange={e => setStep(Number(e.target.value))}/></div>
    </div>
    <div className="numberLineCanvas"><svg viewBox="0 0 580 148" role="img" aria-label={`Dari ${start} bergerak ${step} langkah sampai ${end}`}>
      <defs><marker id="numberline-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke={c.ocean.value} strokeWidth="1.5"/></marker></defs>
      <path d="M25 95H555" stroke={r.borderStrong} strokeWidth="2" strokeLinecap="round"/>
      {Array.from({length:21}, (_,i) => i-10).map(n => <g key={n}><path d={`M${pointX(n)} 89v12`} stroke={r.borderStrong} strokeWidth="1.4"/><text x={pointX(n)} y="122" fontSize="11" fill={c.muted.value} textAnchor="middle">{n%2===0?n:''}</text></g>)}
      {step!==0 && <path d={`M${left} 83 Q${(left+right)/2} ${Math.max(10,65-Math.abs(step)*5)} ${right} 83`} fill="none" stroke={c.ocean.value} strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#numberline-arrow)"/>}
      <circle cx={left} cy="95" r="6" fill={c.ocean.value} stroke={c.white.value} strokeWidth="2"/>
      <circle cx={right} cy="95" r="7.5" fill={c.ocean.value} stroke={c.white.value} strokeWidth="2.5"/>
      <text x={right} y="70" fontSize="12" fontWeight="700" fill={c.ocean.value} textAnchor="middle">{end}</text>
    </svg></div>
    <div className="equationSummary"><span>{start} {step >= 0 ? '+' : '−'} {Math.abs(step)}</span><span className="equals">=</span><strong>{end}</strong></div>
  </section>;
}
