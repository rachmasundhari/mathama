import React, {useState} from 'react';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
type Sign = '<' | '≤' | '>' | '≥';
const signs: Sign[] = ['<', '≤', '>', '≥'];

export default function InequalityLab() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [limit, setLimit] = useState(11);
  const [sign, setSign] = useState<Sign>('<');
  const boundary = (limit - b) / a;
  const flip = sign === '>' || sign === '≥';
  const open = sign === '<' || sign === '>';
  const label = `${a}x + ${b} ${sign} ${limit}`;

  return <section className="labCard" aria-label="Laboratorium pertidaksamaan linear">
    <div className="labHeader"><div><span className="eyebrow teal">LAB PERTIDAKSAMAAN</span><h3>Daerah mana yang memenuhi?</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Ubah koefisien, batas, dan tanda. Garis bilangan menunjukkan semua nilai x yang membuat pertidaksamaan benar.</p>
    <div className="opTabs" role="group" aria-label="Pilih tanda pertidaksamaan">
      {signs.map(item => <button key={item} type="button" className={`opTab ${sign === item ? 'active' : ''}`} aria-pressed={sign === item} onClick={() => setSign(item)}>{item}</button>)}
    </div>
    <div className="equationEditor">
      <label htmlFor="ineq-a">Koefisien a <strong>{a}</strong><input id="ineq-a" type="range" className="rangeInput" min="1" max="5" value={a} onChange={event => setA(Number(event.target.value))}/></label>
      <label htmlFor="ineq-b">Konstanta b <strong>{b}</strong><input id="ineq-b" type="range" className="rangeInput" min="-10" max="10" value={b} onChange={event => setB(Number(event.target.value))}/></label>
      <label htmlFor="ineq-c">Batas c <strong>{limit}</strong><input id="ineq-c" type="range" className="rangeInput" min="-10" max="20" value={limit} onChange={event => setLimit(Number(event.target.value))}/></label>
    </div>
    <div className="equationSummary"><span>{label}</span><span className="equals">→</span><strong aria-live="polite">x {flip ? '>' : '<'} {Number.isInteger(boundary) ? boundary : boundary.toFixed(2).replace('.', ',')}</strong></div>
    <div style={{maxWidth: 560, margin: '0 auto'}} aria-hidden="true">
      <svg viewBox="0 0 560 120" role="img" aria-label={`Garis bilangan dengan titik ${boundary}`}>
        <line x1="30" y1="60" x2="530" y2="60" stroke={c.ink.value} strokeWidth="3"/>
        <path d="M30 60l12-7v14z" fill={c.ink.value}/>
        <path d="M530 60l-12-7v14z" fill={c.ink.value}/>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => {
          const x = 65 + index * 55;
          const value = boundary - 4 + index;
          return <g key={index}><line x1={x} y1="52" x2={x} y2="68" stroke={c.muted.value}/><text x={x} y="90" textAnchor="middle" fontSize="12" fill={c.muted.value}>{Number.isInteger(value) ? value : value.toFixed(1)}</text></g>;
        })}
        <line x1={65 + 4 * 55} y1="60" x2={flip ? 530 : 30} y2="60" stroke={c.teal.value} strokeWidth="7" strokeLinecap="round" opacity="0.65"/>
        <circle cx={65 + 4 * 55} cy="60" r="8" fill={open ? c.white.value : c.teal.value} stroke={c.teal.value} strokeWidth="4"/>
      </svg>
    </div>
    <p className="microNote">{open ? 'Lingkaran kosong berarti batas tidak termasuk.' : 'Lingkaran penuh berarti batas termasuk.'} Arah arsiran menunjukkan nilai x yang memenuhi.</p>
  </section>;
}
