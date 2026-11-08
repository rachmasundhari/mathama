import React, {useState} from 'react';
import LabHeader from './LabHeader';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;

export default function VennLab() {
  const [onlyA, setOnlyA] = useState(4);
  const [both, setBoth] = useState(3);
  const [onlyB, setOnlyB] = useState(2);
  const [outside, setOutside] = useState(1);
  const a = onlyA + both;
  const b = onlyB + both;
  const union = onlyA + both + onlyB;
  const total = union + outside;

  return <section className="labCard" aria-label="Laboratorium diagram Venn">
    <LabHeader title="Dua lingkaran, satu semesta" />
    <p className="labIntro">Atur banyak anggota di setiap daerah. Diagram Venn menunjukkan hubungan dua himpunan dalam satu semesta.</p>
    <div className="equationEditor">
      <label htmlFor="venn-a">Hanya A <strong>{onlyA}</strong><input id="venn-a" type="range" className="rangeInput" min="0" max="8" value={onlyA} onChange={event => setOnlyA(Number(event.target.value))}/></label>
      <label htmlFor="venn-ab">A ∩ B <strong>{both}</strong><input id="venn-ab" type="range" className="rangeInput" min="0" max="8" value={both} onChange={event => setBoth(Number(event.target.value))}/></label>
      <label htmlFor="venn-b">Hanya B <strong>{onlyB}</strong><input id="venn-b" type="range" className="rangeInput" min="0" max="8" value={onlyB} onChange={event => setOnlyB(Number(event.target.value))}/></label>
      <label htmlFor="venn-out">Di luar A dan B <strong>{outside}</strong><input id="venn-out" className="rangeInput" type="range" min="0" max="8" value={outside} onChange={event => setOutside(Number(event.target.value))}/></label>
    </div>
    <div style={{maxWidth: 520, margin: '0 auto'}} aria-hidden="true">
      <svg viewBox="0 0 520 300" role="img" aria-label={`Diagram Venn dengan n(A) ${a}, n(B) ${b}, dan n(A union B) ${union}`}>
        <rect x="20" y="20" width="480" height="260" rx="18" fill={c.ice.value} stroke={c.sky.value} strokeWidth="2"/>
        <text x="40" y="48" fontSize="13" fill={c.muted.value}>S · semesta = {total}</text>
        <circle cx="210" cy="160" r="95" fill={c.skyPale.value} stroke={c.ocean.value} strokeWidth="3" opacity="0.9"/>
        <circle cx="310" cy="160" r="95" fill={c.seaGlass.value} stroke={c.teal.value} strokeWidth="3" opacity="0.75"/>
        <text x="145" y="160" textAnchor="middle" fontSize="26" fontWeight="800" fill={c.ocean.value}>{onlyA}</text>
        <text x="260" y="160" textAnchor="middle" fontSize="26" fontWeight="800" fill={c.ink.value}>{both}</text>
        <text x="375" y="160" textAnchor="middle" fontSize="26" fontWeight="800" fill={c.teal.value}>{onlyB}</text>
        <text x="105" y="100" fontSize="14" fontWeight="700" fill={c.ocean.value}>A</text>
        <text x="405" y="100" fontSize="14" fontWeight="700" fill={c.teal.value}>B</text>
        <text x="450" y="250" textAnchor="middle" fontSize="16" fontWeight="800" fill={c.muted.value}>{outside}</text>
      </svg>
    </div>
    <div className="percentGrid">
      <div className="percentStat"><small>n(A)</small><strong>{a}</strong><span>hanya A + irisan</span></div>
      <div className="percentStat"><small>n(B)</small><strong>{b}</strong><span>hanya B + irisan</span></div>
      <div className="percentStat"><small>n(A ∪ B)</small><strong>{union}</strong><span>gabungan</span></div>
      <div className="percentStat accent"><small>n(A ∩ B)</small><strong>{both}</strong><span>irisan</span></div>
    </div>
    <p className="microNote">Anggota yang ada di kedua himpunan dihitung sekali pada gabungan, bukan dua kali.</p>
  </section>;
}
