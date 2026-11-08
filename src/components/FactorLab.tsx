import React, {useState} from 'react';

function factorsOf(value: number) {
  return Array.from({length: value}, (_, index) => index + 1).filter(number => value % number === 0);
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function isPrime(value: number) {
  return value > 1 && factorsOf(value).length === 2;
}

export default function FactorLab() {
  const [first, setFirst] = useState(12);
  const [second, setSecond] = useState(18);
  const firstFactors = factorsOf(first);
  const secondFactors = factorsOf(second);
  const common = firstFactors.filter(number => secondFactors.includes(number));
  const fpb = gcd(first, second);
  const kpk = first * second / fpb;

  return <section className="labCard" aria-label="Laboratorium faktor bilangan">
    <div className="labHeader"><div><span className="eyebrow teal">LAB FAKTOR</span><h3>Berapa cara membagi rata?</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Faktor adalah bilangan yang membagi habis. Atur dua bilangan dan temukan faktor persekutuan, FPB, serta KPK-nya.</p>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="factor-first">Bilangan pertama</label><strong className="valueChip">{first}</strong></div><input id="factor-first" className="rangeInput" type="range" min="2" max="60" value={first} onChange={event => setFirst(Number(event.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="factor-second">Bilangan kedua</label><strong className="valueChip">{second}</strong></div><input id="factor-second" className="rangeInput" type="range" min="2" max="60" value={second} onChange={event => setSecond(Number(event.target.value))}/></div>
    </div>
    <div className="factorColumns">
      <div><span className="factorHeading">{first} {isPrime(first) ? '· prima' : '· komposit'}</span><div className="factorChips">{firstFactors.map(number => <span key={number} className={common.includes(number) ? 'common' : ''}>{number}</span>)}</div></div>
      <div><span className="factorHeading">{second} {isPrime(second) ? '· prima' : '· komposit'}</span><div className="factorChips">{secondFactors.map(number => <span key={number} className={common.includes(number) ? 'common' : ''}>{number}</span>)}</div></div>
    </div>
    <div className="factorReadout">
      <div><small>Faktor persekutuan</small><strong>{common.join(', ')}</strong></div>
      <div className="accent"><small>FPB</small><strong>{fpb}</strong></div>
      <div><small>KPK</small><strong>{kpk}</strong></div>
    </div>
    <p className="microNote">💡 FPB berguna saat membagi rata. KPK berguna saat mencari waktu dua kegiatan bertemu lagi.</p>
  </section>;
}
