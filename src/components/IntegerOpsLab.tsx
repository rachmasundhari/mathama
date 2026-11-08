import React, {useState} from 'react';
import LabHeader from './LabHeader';

type Op = '+' | '−' | '×' | '÷';
const operations: Op[] = ['+', '−', '×', '÷'];

function calculate(a: number, b: number, op: Op): number | null {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  return b === 0 ? null : a / b;
}

function signRule(op: Op, a: number, b: number) {
  if (op === '+' || op === '−') return 'Untuk penjumlahan dan pengurangan, bayangkan perjalanan di garis bilangan.';
  const same = Math.sign(a) === Math.sign(b);
  return same
    ? 'Kedua bilangan bertanda sama, jadi hasilnya positif.'
    : 'Kedua bilangan berbeda tanda, jadi hasilnya negatif.';
}

export default function IntegerOpsLab() {
  const [a, setA] = useState(-6);
  const [b, setB] = useState(4);
  const [op, setOp] = useState<Op>('×');
  const result = calculate(a, b, op);
  const displayA = a < 0 ? `(${a})` : `${a}`;
  const displayB = b < 0 ? `(${b})` : `${b}`;

  return <section className="labCard" aria-label="Laboratorium operasi bilangan bulat">
    <LabHeader title="Bagaimana tanda memengaruhi hasil?" />
    <p className="labIntro">Pilih operasi, lalu geser kedua bilangan. Perhatikan kapan hasilnya berubah tanda.</p>
    <div className="opTabs" role="group" aria-label="Pilih operasi">
      {operations.map(option => <button type="button" key={option} className={`opTab ${op === option ? 'active' : ''}`} aria-pressed={op === option} onClick={() => setOp(option)}>{option}</button>)}
    </div>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="integer-a">Bilangan pertama</label><strong className="valueChip">{a}</strong></div><input id="integer-a" className="rangeInput" type="range" min="-12" max="12" value={a} onChange={event => setA(Number(event.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="integer-b">Bilangan kedua</label><strong className="valueChip">{b}</strong></div><input id="integer-b" className="rangeInput" type="range" min="-12" max="12" value={b} onChange={event => setB(Number(event.target.value))}/></div>
    </div>
    <div className="opEquation" aria-live="polite">
      <span>{displayA}</span><span className="opSymbol">{op}</span><span>{displayB}</span><span className="equals">=</span><strong>{result === null ? 'tidak terdefinisi' : result}</strong>
    </div>
    <div className="ruleGrid">
      <div className="ruleCard"><strong>Aturan tanda</strong><p>{signRule(op, a, b)}</p></div>
      <div className="ruleCard"><strong>Ingat</strong><p>{op === '÷' ? 'Pembagian oleh nol tidak memiliki hasil.' : 'Hitung tanda lebih dulu, lalu hitung nilainya.'}</p></div>
    </div>
    <p className="microNote">💡 Coba ubah hanya satu bilangan. Apakah hasilnya selalu berubah dengan pola yang sama?</p>
  </section>;
}
