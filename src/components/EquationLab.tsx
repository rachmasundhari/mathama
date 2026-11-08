import React, {useState} from 'react';
import LabHeader from './LabHeader';
import {designTokens} from '../design/tokens.generated';

const palette = designTokens.color;
const r = designTokens.roles;

export default function EquationLab() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(11);
  const [x, setX] = useState(1);
  const left = a * x + b;
  const right = c;
  const difference = left - right;
  const tilt = Math.max(-11, Math.min(11, difference * 2.5));
  const solution = (c - b) / a;
  const solved = Math.abs(difference) < 1e-9;

  return <section className="labCard" aria-label="Laboratorium persamaan linear">
    <LabHeader title="Buat timbangan menjadi seimbang" />
    <p className="labIntro">Timbangan seimbang ketika kedua sisi bernilai sama. Geser nilai x, lalu temukan posisi seimbangnya.</p>
    <div className="equationEditor">
      <label htmlFor="equation-a">Koefisien a <strong>{a}</strong><input id="equation-a" type="range" className="rangeInput" min="1" max="5" value={a} onChange={event => setA(Number(event.target.value))}/></label>
      <label htmlFor="equation-b">Konstanta b <strong>{b}</strong><input id="equation-b" type="range" className="rangeInput" min="-10" max="10" value={b} onChange={event => setB(Number(event.target.value))}/></label>
      <label htmlFor="equation-c">Hasil c <strong>{c}</strong><input id="equation-c" type="range" className="rangeInput" min="-15" max="20" value={c} onChange={event => setC(Number(event.target.value))}/></label>
    </div>
    <div className="balanceScene" aria-hidden="true">
      <svg viewBox="0 0 600 260" role="img">
        <path d="M300 40v150" stroke={r.borderStrong} strokeWidth="5" strokeLinecap="round"/>
        <path d="M220 230h160" stroke={r.borderStrong} strokeWidth="6" strokeLinecap="round"/>
        <g transform={`rotate(${tilt} 300 80)`}>
          <path d="M90 80h420" stroke={palette.ocean.value} strokeWidth="8" strokeLinecap="round"/>
          <circle cx="300" cy="80" r="9" fill={r.primaryDarker}/>
          <path d="M105 80v38M495 80v38" stroke={r.borderStrong} strokeWidth="3"/>
          <g transform={`rotate(${-tilt} 300 80)`}>
            <rect x="30" y="118" width="150" height="72" rx="12" fill={palette.skyPale.value} stroke={palette.sky.value} strokeWidth="2"/>
            <text x="105" y="146" textAnchor="middle" fontSize="15" fill={palette.ocean.value} fontWeight="700">KIRI</text>
            <text x="105" y="176" textAnchor="middle" fontSize="26" fill={palette.ocean.value} fontWeight="800">{left}</text>
            <rect x="420" y="118" width="150" height="72" rx="12" fill={palette.skyPale.value} stroke={palette.sky.value} strokeWidth="2"/>
            <text x="495" y="146" textAnchor="middle" fontSize="15" fill={r.primaryDark} fontWeight="700">KANAN</text>
            <text x="495" y="176" textAnchor="middle" fontSize="26" fill={palette.ocean.value} fontWeight="800">{right}</text>
          </g>
        </g>
      </svg>
    </div>
    <div className="equationLine"><span>{a}x {b >= 0 ? '+' : '−'} {Math.abs(b)}</span><span className="equals">=</span><span>{c}</span><span className={`balanceBadge ${solved ? 'balanced' : ''}`}>{solved ? 'SEIMBANG' : 'BELUM SEIMBANG'}</span></div>
    <div className="sliderRow"><label htmlFor="equation-x">Nilai x yang dicoba</label><strong className="valueChip">x = {x}</strong></div>
    <input id="equation-x" type="range" className="rangeInput" min="0" max="12" value={x} onChange={event => setX(Number(event.target.value))}/>
    <div className={`equationSteps ${solved ? 'solved' : ''}`} aria-live="polite">
      <strong>{solved ? `x = ${x} adalah solusinya.` : `Selisih kedua sisi: ${difference}.`}</strong>
      <p>Langkah aljabar: kurangi {b} dari kedua sisi, lalu bagi dengan {a}. Diperoleh x = ({c} − {b}) ÷ {a} = {Number.isInteger(solution) ? solution : solution.toFixed(2).replace('.', ',')}.</p>
    </div>
    <p className="microNote">💡 Kamu boleh melakukan operasi apa pun pada kedua sisi, asalkan operasinya sama. Timbangan tetap seimbang.</p>
  </section>;
}
