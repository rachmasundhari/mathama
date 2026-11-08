import React, {useState} from 'react';
import LabHeader from './LabHeader';

type Pattern = 'aritmetika' | 'geometri';

export default function PatternLab() {
  const [pattern, setPattern] = useState<Pattern>('aritmetika');
  const [start, setStart] = useState(2);
  const [step, setStep] = useState(3);
  const [n, setN] = useState(5);
  const terms = Array.from({length: n}, (_, index) => pattern === 'aritmetika'
    ? start + index * step
    : start * Math.pow(step, index));
  const current = terms[n - 1];
  const formula = pattern === 'aritmetika'
    ? `${start} + (n − 1) × ${step}`
    : `${start} × ${step}^(n − 1)`;
  const dots = Math.min(current, 42);

  return <section className="labCard" aria-label="Laboratorium pola bilangan">
    <LabHeader title="Bagaimana pola bertumbuh?" />
    <p className="labIntro">Pilih jenis pola, atur bilangan awal dan langkahnya, lalu lihat suku ke-n.</p>
    <div className="opTabs" role="group" aria-label="Jenis pola">
      <button type="button" className={`opTab ${pattern === 'aritmetika' ? 'active' : ''}`} aria-pressed={pattern === 'aritmetika'} onClick={() => setPattern('aritmetika')}>Aritmetika (+)</button>
      <button type="button" className={`opTab ${pattern === 'geometri' ? 'active' : ''}`} aria-pressed={pattern === 'geometri'} onClick={() => setPattern('geometri')}>Geometri (×)</button>
    </div>
    <div className="equationEditor compactEditor">
      <label htmlFor="pattern-start">Suku awal <strong>{start}</strong><input id="pattern-start" type="range" className="rangeInput" min="1" max="6" value={start} onChange={event => setStart(Number(event.target.value))}/></label>
      <label htmlFor="pattern-step">{pattern === 'aritmetika' ? 'Beda' : 'Rasio'} <strong>{step}</strong><input id="pattern-step" type="range" className="rangeInput" min="2" max="5" value={step} onChange={event => setStep(Number(event.target.value))}/></label>
      <label htmlFor="pattern-n">Suku ke-n <strong>{n}</strong><input id="pattern-n" type="range" className="rangeInput" min="1" max="10" value={n} onChange={event => setN(Number(event.target.value))}/></label>
    </div>
    <div className="patternTerms" aria-label={`Suku pertama sampai ke-${n}`}>
      {terms.map((term, index) => <span key={index} className={index === terms.length - 1 ? 'current' : ''}>{term}</span>)}
    </div>
    <div className="patternDots" aria-hidden="true">
      {Array.from({length: dots}, (_, index) => <i key={index}/>)}
      {current > 42 && <em>+{current - 42}</em>}
    </div>
    <div className="equationSummary"><span>U<sub>{n}</sub></span><span className="equals">=</span><strong>{current}</strong><span className="equationFoot">{formula}</span></div>
    <p className="microNote">💡 Pola aritmetika bertambah dengan beda tetap. Pola geometri dikali dengan rasio tetap. Keduanya bisa ditulis sebagai bentuk aljabar.</p>
  </section>;
}
