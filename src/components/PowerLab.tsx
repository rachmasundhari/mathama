import React, {useState} from 'react';

export default function PowerLab() {
  const [base, setBase] = useState(3);
  const [exponent, setExponent] = useState(4);
  const value = Math.pow(base, exponent);
  const factors = Array.from({length: exponent}, () => base).join(' × ');
  const root = Math.sqrt(value);

  return <section className="labCard" aria-label="Laboratorium bilangan berpangkat">
    <div className="labHeader"><div><span className="eyebrow teal">LAB PANGKAT</span><h3>Perkalian yang berulang</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Geser basis dan eksponen. Lihat bagaimana satu bilangan kecil bisa tumbuh cepat.</p>
    <div className="twoSliders">
      <div>
        <div className="sliderRow"><label htmlFor="power-base">Basis</label><strong className="valueChip">{base}</strong></div>
        <input id="power-base" className="rangeInput" type="range" min="2" max="10" value={base} onChange={event => setBase(Number(event.target.value))}/>
      </div>
      <div>
        <div className="sliderRow"><label htmlFor="power-exp">Eksponen</label><strong className="valueChip">{exponent}</strong></div>
        <input id="power-exp" className="rangeInput" type="range" min="1" max="5" value={exponent} onChange={event => setExponent(Number(event.target.value))}/>
      </div>
    </div>
    <div className="equationSummary"><span>{base}<sup>{exponent}</sup></span><span className="equals">=</span><strong aria-live="polite">{value.toLocaleString('id-ID')}</strong></div>
    <div className="percentGrid">
      <div className="percentStat"><small>Bentuk perkalian</small><strong style={{fontSize: 18}}>{factors}</strong><span>{exponent} faktor</span></div>
      <div className="percentStat accent"><small>Akar kuadrat dari hasil</small><strong>{Number.isInteger(root) ? root : root.toFixed(2).replace('.', ',')}</strong><span>√{value.toLocaleString('id-ID')}</span></div>
    </div>
    <p className="microNote">Basis adalah bilangan yang dikalikan. Eksponen menghitung berapa kali basis muncul.</p>
  </section>;
}
