import React, {useState} from 'react';

export default function AlgebraLab() {
  const [x, setX] = useState(4);
  return (
    <section className="labCard" aria-label="Laboratorium variabel aljabar">
      <div className="labHeader">
        <div><span className="eyebrow teal">COBA SENDIRI</span><h3>Bagaimana cara kerja 2x + 3?</h3></div>
        <span className="livePill"><span className="liveDot"/> Interaktif</span>
      </div>
      <p className="labIntro">Setiap kotak <strong>x</strong> menyimpan jumlah kelereng yang sama. Geser nilainya untuk melihat perubahan total.</p>
      <div className="sliderRow"><label htmlFor="algebra-value">Isi setiap kotak</label><strong className="valueChip">x = {x}</strong></div>
      <input id="algebra-value" type="range" min="1" max="8" step="1" value={x} onChange={(e) => setX(Number(e.target.value))} className="rangeInput"/>
      <div className="rangeMarks"><span>1</span><span>8</span></div>
      <div className="algebraScene">
        {[0,1].map((group) => <div className="variableBox" key={group}>
          <div className="variableLabel">Kotak x</div>
          <div className="dotGrid">{Array.from({length:x}, (_, index) => <span key={index} className="mathDot"/>)}</div>
        </div>)}
        <div className="scenePlus">+</div>
        <div className="constantBox"><span className="variableLabel">3 kelereng</span><div className="dotGrid">{[1,2,3].map(i => <span className="mathDot goldDot" key={i}/>)}</div></div>
      </div>
      <div className="equationSummary"><span>2 × {x} + 3</span><span className="equals">=</span><strong>{2*x+3}</strong><span className="equationFoot">kelereng seluruhnya</span></div>
      <p className="microNote">💡 <strong>2x</strong> artinya dua kelompok yang masing-masing berisi <strong>x</strong>, bukan angka 2 di depan huruf tanpa makna.</p>
    </section>
  );
}
