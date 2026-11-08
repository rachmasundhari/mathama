import React, {useState} from 'react';
import LabHeader from './LabHeader';

const rupiah = (value: number) => `Rp${Math.round(value).toLocaleString('id-ID')}`;

export default function PercentLab() {
  const [price, setPrice] = useState(80000);
  const [percent, setPercent] = useState(25);
  const [mode, setMode] = useState<'diskon' | 'pajak'>('diskon');
  const amount = price * percent / 100;
  const finalPrice = mode === 'diskon' ? price - amount : price + amount;

  return <section className="labCard" aria-label="Laboratorium persen">
    <LabHeader title="Berapa yang kamu bayar setelah diskon?" />
    <p className="labIntro">Geser harga dan persentase. Lihat bagaimana satu angka persen mengubah uang yang harus dibayar.</p>
    <div className="opTabs" role="group" aria-label="Pilih jenis persentase">
      <button type="button" className={`opTab ${mode === 'diskon' ? 'active' : ''}`} aria-pressed={mode === 'diskon'} onClick={() => setMode('diskon')}>Diskon</button>
      <button type="button" className={`opTab ${mode === 'pajak' ? 'active' : ''}`} aria-pressed={mode === 'pajak'} onClick={() => setMode('pajak')}>Pajak</button>
    </div>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="percent-price">Harga awal</label><strong className="valueChip">{rupiah(price)}</strong></div><input id="percent-price" className="rangeInput" type="range" min="10000" max="200000" step="5000" value={price} onChange={event => setPrice(Number(event.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="percent-value">Persentase</label><strong className="valueChip">{percent}%</strong></div><input id="percent-value" className="rangeInput" type="range" min="5" max="50" step="5" value={percent} onChange={event => setPercent(Number(event.target.value))}/></div>
    </div>
    <div className="percentTrack" aria-hidden="true"><span style={{width: `${percent}%`}}/><em>{percent}%</em></div>
    <div className="percentGrid">
      <div className="percentStat"><small>{mode === 'diskon' ? 'Potongan' : 'Pajak'}</small><strong>{rupiah(amount)}</strong><span>{percent}% × {rupiah(price)}</span></div>
      <div className="percentStat accent"><small>Harga akhir</small><strong>{rupiah(finalPrice)}</strong><span>{mode === 'diskon' ? 'harga awal − potongan' : 'harga awal + pajak'}</span></div>
    </div>
    <div className="equationSummary"><span>{rupiah(price)} {mode === 'diskon' ? '−' : '+'} {percent}%</span><span className="equals">=</span><strong>{rupiah(finalPrice)}</strong></div>
    <p className="microNote">💡 Persen berarti "per seratus". Jadi {percent}% sama dengan {percent}/100 = {percent / 100}.</p>
  </section>;
}
