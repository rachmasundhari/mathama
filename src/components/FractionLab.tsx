import React, {useState} from 'react';
import LabHeader from './LabHeader';

type Op = '+' | '−' | '×' | '÷';
const operations: Op[] = ['+', '−', '×', '÷'];

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function simplify(numerator: number, denominator: number) {
  const factor = gcd(numerator, denominator) || 1;
  return {numerator: numerator / factor, denominator: denominator / factor};
}

function calculate(a: {n: number; d: number}, b: {n: number; d: number}, op: Op) {
  if (op === '+') return simplify(a.n * b.d + b.n * a.d, a.d * b.d);
  if (op === '−') return simplify(a.n * b.d - b.n * a.d, a.d * b.d);
  if (op === '×') return simplify(a.n * b.n, a.d * b.d);
  if (b.n === 0) return null;
  return simplify(a.n * b.d, a.d * b.n);
}

function FractionBar({numerator, denominator}: {numerator: number; denominator: number}) {
  return <div className="fractionBar" aria-hidden="true">
    {Array.from({length: denominator}, (_, index) => <span key={index} className={index < numerator ? 'filled' : ''}/>)}
  </div>;
}

export default function FractionLab() {
  const [an, setAn] = useState(3);
  const [ad, setAd] = useState(4);
  const [bn, setBn] = useState(2);
  const [bd, setBd] = useState(3);
  const [op, setOp] = useState<Op>('+');
  const a = {n: an, d: ad};
  const b = {n: bn, d: bd};
  const result = calculate(a, b, op);
  const left = an / ad;
  const right = bn / bd;
  const comparison = left === right ? '=' : left > right ? '>' : '<';

  return <section className="labCard" aria-label="Laboratorium pecahan">
    <LabHeader title="Pecahan mana yang lebih besar?" />
    <p className="labIntro">Atur pembilang dan penyebut kedua pecahan. Bandingkan luas daerahnya, lalu periksa hasil operasinya.</p>
    <div className="fractionStage">
      <div className="fractionColumn">
        <span className="fractionLabel">Pecahan pertama</span>
        <div className="fractionDisplay"><span>{an}</span><i/><span>{ad}</span></div>
        <div className="sliderRow"><label htmlFor="fraction-an">Pembilang</label><strong className="valueChip">{an}</strong></div>
        <input id="fraction-an" className="rangeInput" type="range" min="0" max="12" value={an} onChange={event => setAn(Number(event.target.value))}/>
        <div className="sliderRow"><label htmlFor="fraction-ad">Penyebut</label><strong className="valueChip">{ad}</strong></div>
        <input id="fraction-ad" className="rangeInput" type="range" min="1" max="12" value={ad} onChange={event => setAd(Number(event.target.value))}/>
        <FractionBar numerator={an} denominator={ad}/>
      </div>
      <div className="fractionCompare" aria-live="polite"><span>{comparison}</span><small>{comparison === '=' ? 'senilai' : comparison === '>' ? 'lebih besar' : 'lebih kecil'}</small></div>
      <div className="fractionColumn">
        <span className="fractionLabel">Pecahan kedua</span>
        <div className="fractionDisplay"><span>{bn}</span><i/><span>{bd}</span></div>
        <div className="sliderRow"><label htmlFor="fraction-bn">Pembilang</label><strong className="valueChip">{bn}</strong></div>
        <input id="fraction-bn" className="rangeInput" type="range" min="0" max="12" value={bn} onChange={event => setBn(Number(event.target.value))}/>
        <div className="sliderRow"><label htmlFor="fraction-bd">Penyebut</label><strong className="valueChip">{bd}</strong></div>
        <input id="fraction-bd" className="rangeInput" type="range" min="1" max="12" value={bd} onChange={event => setBd(Number(event.target.value))}/>
        <FractionBar numerator={bn} denominator={bd}/>
      </div>
    </div>
    <div className="opTabs" role="group" aria-label="Pilih operasi pecahan">
      {operations.map(option => <button type="button" key={option} className={`opTab ${op === option ? 'active' : ''}`} aria-pressed={op === option} onClick={() => setOp(option)}>{option}</button>)}
    </div>
    <div className="fractionResult" aria-live="polite">
      <span>{an}/{ad} {op} {bn}/{bd}</span><span className="equals">=</span>
      <strong>{result ? `${result.numerator}/${result.denominator}` : 'tidak terdefinisi'}</strong>
      {result && <small>H {(result.numerator / result.denominator).toFixed(3).replace('.', ',')}</small>}
    </div>
    <p className="microNote">💡 Membandingkan pecahan lebih aman dengan menyamakan penyebut, bukan dengan melihat angka penyebut yang lebih besar.</p>
  </section>;
}
