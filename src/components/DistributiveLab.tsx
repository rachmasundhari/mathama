import React, {useState} from 'react';
import LabHeader from './LabHeader';

export default function DistributiveLab() {
  const [factor, setFactor] = useState(2);
  const [x, setX] = useState(3);
  return <section className="labCard" aria-label="Eksperimen sifat distributif">
    <LabHeader title="Mengapa a(x + 2) = ax + 2a?" />
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="distributive-factor">Jumlah kelompok</label><strong className="valueChip">{factor}</strong></div><input id="distributive-factor" className="rangeInput" type="range" min="2" max="4" value={factor} onChange={e=>setFactor(Number(e.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="distributive-value">Nilai x</label><strong className="valueChip">{x}</strong></div><input id="distributive-value" className="rangeInput" type="range" min="1" max="5" value={x} onChange={e=>setX(Number(e.target.value))}/></div>
    </div>
    <div className="distributiveGroups">{Array.from({length:factor}, (_,i) => <div className="distributiveGroup" key={i}><span className="groupCaption">Kelompok {i+1}</span><div className="groupContent"><span className="groupBlue">{x} <small>nilai x</small></span><span className="groupPlus">+</span><span className="groupGold">2</span></div></div>)}</div>
    <div className="equationSummary"><span>{factor}(x + 2)</span><span className="equals">=</span><strong>{factor}x + {2*factor}</strong></div>
    <p className="microNote">💡 Ada {factor} kelompok; setiap kelompok memiliki x dan 2 tambahan. Jadi keduanya harus dikalikan {factor}.</p>
  </section>;
}
