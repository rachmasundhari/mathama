import React, {useState} from 'react';

function formatNumber(value: number) {
  return value.toLocaleString('id-ID', {maximumFractionDigits: 1});
}

export default function RateLab() {
  const [distance, setDistance] = useState(120);
  const [time, setTime] = useState(2);
  const speed = distance / time;

  return <section className="labCard" aria-label="Laboratorium laju perubahan satuan">
    <div className="labHeader"><div><span className="eyebrow teal">LAB LAJU</span><h3>Berapa cepat kamu bergerak?</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Kecepatan adalah jarak yang ditempuh dibagi waktu. Ubah keduanya dan lihat nilai satuannya.</p>
    <div className="twoSliders">
      <div><div className="sliderRow"><label htmlFor="rate-distance">Jarak</label><strong className="valueChip">{distance} km</strong></div><input id="rate-distance" className="rangeInput" type="range" min="10" max="300" step="10" value={distance} onChange={event => setDistance(Number(event.target.value))}/></div>
      <div><div className="sliderRow"><label htmlFor="rate-time">Waktu</label><strong className="valueChip">{time} jam</strong></div><input id="rate-time" className="rangeInput" type="range" min="0.5" max="6" step="0.5" value={time} onChange={event => setTime(Number(event.target.value))}/></div>
    </div>
    <div className="rateScene" aria-hidden="true">
      <div className="rateRoad"><span className="rateCar" style={{left: `${Math.min(88, 4 + (time / 6) * 84)}%`}}>🚗</span></div>
      <div className="rateLabels"><span>0 km</span><span>{distance} km</span></div>
    </div>
    <div className="rateCards">
      <div><small>Jarak ÷ waktu</small><strong>{distance} ÷ {time}</strong></div>
      <div className="accent"><small>Kecepatan rata-rata</small><strong>{formatNumber(speed)} km/jam</strong></div>
    </div>
    <p className="microNote">💡 Jika waktu menjadi dua kali lipat dengan jarak tetap, kecepatannya menjadi setengah. Itu hubungan berbalik nilai.</p>
  </section>;
}
