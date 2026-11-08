import React, {useRef, useState} from 'react';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
const r = designTokens.roles;

const missions = [
  {start: -3, step: 5, text: 'Mulai dari −3, bergerak 5 langkah ke kanan.'},
  {start: 2, step: -4, text: 'Mulai dari 2, bergerak 4 langkah ke kiri.'},
  {start: -4, step: 3, text: 'Mulai dari −4, bergerak 3 langkah ke kanan.'},
];

export default function NumberLineLab() {
  const [start, setStart] = useState(0);
  const [step, setStep] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mission = missions[missionIndex];
  const missionEnd = mission.start + mission.step;
  const end = start + step;
  const domain = 10;
  const pointX = (value: number) => 36 + (value + 10) * 26;
  const left = pointX(start);
  const right = pointX(end);
  const changeStart = (value: number) => {setStart(value); setResult(null);};
  const changeStep = (value: number) => {setStep(value); setResult(null);};
  const valueFromClientX = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg || svg.getBoundingClientRect().width === 0) return start;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 580;
    return Math.round((x - 36) / (520 / (2 * domain)) - domain);
  };
  const beginDrag = (kind: 'start' | 'end') => (event: React.PointerEvent<SVGCircleElement>) => {
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events have no active pointer to capture.
    }
    setDragging(kind);
  };
  const moveDrag = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const value = valueFromClientX(event.clientX);
    if (dragging === 'start') changeStart(Math.max(-10, Math.min(10, value)));
    else changeStep(Math.max(-10, Math.min(10, value - start)));
  };
  const endDrag = () => setDragging(null);
  const check = () => setResult(start === mission.start && step === mission.step ? 'correct' : 'wrong');
  const nextMission = () => {setMissionIndex((missionIndex + 1) % missions.length); setResult(null);};
  return <section className="labCard" aria-label="Eksperimen garis bilangan">
    <div className="labHeader"><div><span className="eyebrow teal">LAB BILANGAN BULAT</span><h3>Bergerak di garis bilangan</h3></div></div>
    <p className="labIntro">Bilangan positif melangkah ke kanan, sedangkan bilangan negatif ke kiri.</p>
    <div className="labMission" role="group" aria-label={`Tantangan ${missionIndex + 1} dari ${missions.length}`}>
      <div className="labMissionDots" aria-hidden="true">
        {missions.map((_, index) => <span key={index} className={index < missionIndex ? 'done' : index === missionIndex ? 'active' : ''}/>)}
      </div>
      <p>{mission.text}</p>
      <p className="labMissionHint">Geser titik pada garis atau atur kedua slider sampai garis menunjukkan perpindahan itu.</p>
    </div>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="line-start">Titik awal</label><strong className="valueChip">{start}</strong></div><input id="line-start" className="rangeInput" type="range" min="-10" max="10" value={start} onChange={e => changeStart(Number(e.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="line-step">Perubahan</label><strong className="valueChip">{step > 0 ? `+${step}` : step}</strong></div><input id="line-step" className="rangeInput" type="range" min="-10" max="10" value={step} onChange={e => changeStep(Number(e.target.value))}/></div>
    </div>
    <div className="numberLineCanvas"><svg ref={svgRef} viewBox="0 0 580 148" role="img" aria-label={`Dari ${start} bergerak ${step} langkah sampai ${end}. Titik awal dan titik akhir dapat digeser.`} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
      <defs><marker id="numberline-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0 L4.5 2.5 L0 5" fill="none" stroke={c.ocean.value} strokeWidth="1.3"/></marker></defs>
      <path d="M34 95H558" stroke={r.borderStrong} strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 95l10-6v12z" fill={r.borderStrong}/>
      <path d="M568 95l-10-6v12z" fill={r.borderStrong}/>
      {Array.from({length: 11}, (_,i) => (i - 5) * 2).map(n => <g key={n}><path d={`M${pointX(n)} 89v12`} stroke={r.borderStrong} strokeWidth="1.4"/><text x={pointX(n)} y="122" fontSize="11" fill={c.muted.value} textAnchor="middle">{n}</text></g>)}
      {step!==0 && <path d={`M${left} 83 Q${(left+right)/2} ${Math.max(10,65-Math.abs(step)*5)} ${right} 83`} fill="none" stroke={c.ocean.value} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#numberline-arrow)"/>}
      <circle cx={left} cy="95" r="6" fill={c.ocean.value} stroke={c.white.value} strokeWidth="2"/>
      <circle cx={right} cy="95" r="7.5" fill={c.ocean.value} stroke={c.white.value} strokeWidth="2.5"/>
      <text x={right} y="70" fontSize="12" fontWeight="700" fill={c.ocean.value} textAnchor="middle">{end}</text>
      <circle cx={left} cy="95" r="14" fill="transparent" aria-hidden="true" style={{cursor: dragging === 'start' ? 'grabbing' : 'grab', touchAction: 'none'}} onPointerDown={beginDrag('start')}/>
      <circle cx={right} cy="95" r="16" fill="transparent" aria-hidden="true" style={{cursor: dragging === 'end' ? 'grabbing' : 'grab', touchAction: 'none'}} onPointerDown={beginDrag('end')}/>
    </svg></div>
    <div className="equationSummary"><span>{start} {step >= 0 ? '+' : '−'} {Math.abs(step)}</span><span className="equals">=</span><strong>{end}</strong></div>
    <div className="labMissionActions">
      <button type="button" className="button primaryButton" onClick={check}>Periksa posisi</button>
      {result === 'correct' && <button type="button" className="button labNextButton" onClick={nextMission}>{missionIndex === missions.length - 1 ? 'Ulangi dari awal' : 'Tantangan berikutnya →'}</button>}
    </div>
    {result === 'correct' && <p className="labFeedback labFeedbackCorrect" role="status">Tepat. Posisi akhirnya {missionEnd}.</p>}
    {result === 'wrong' && <p className="labFeedback labFeedbackWrong" role="status">Belum tepat. Periksa titik awal dan arah langkahnya.</p>}
  </section>;
}
