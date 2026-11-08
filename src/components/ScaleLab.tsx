import React, {useState} from 'react';
import LabHeader from './LabHeader';

const scales = [
  {label: '1 : 100', value: 100},
  {label: '1 : 500', value: 500},
  {label: '1 : 1.000', value: 1000},
  {label: '1 : 5.000', value: 5000},
  {label: '1 : 1.000.000', value: 1000000},
];

function formatDistance(cm: number) {
  if (cm >= 100000) return `${(cm / 100000).toFixed(1).replace('.', ',')} km`;
  if (cm >= 100) return `${(cm / 100).toFixed(1).replace('.', ',')} m`;
  return `${cm.toFixed(1).replace('.', ',')} cm`;
}

export default function ScaleLab() {
  const [scaleIndex, setScaleIndex] = useState(2);
  const [mapLength, setMapLength] = useState(8);
  const scale = scales[scaleIndex];
  const realCm = mapLength * scale.value;

  return <section className="labCard" aria-label="Laboratorium skala">
    <LabHeader title="Seberapa jauh sebenarnya?" />
    <p className="labIntro">Peta mengecilkan jarak asli. Pilih skala, atur jarak pada peta, lalu temukan jarak sebenarnya.</p>
    <div className="scaleChooser" role="group" aria-label="Pilih skala peta">
      {scales.map((option, index) => <button type="button" key={option.label} className={`scaleChip ${index === scaleIndex ? 'active' : ''}`} aria-pressed={index === scaleIndex} onClick={() => setScaleIndex(index)}>{option.label}</button>)}
    </div>
    <div className="sliderRow"><label htmlFor="scale-length">Jarak pada peta</label><strong className="valueChip">{mapLength} cm</strong></div>
    <input id="scale-length" className="rangeInput" type="range" min="1" max="20" value={mapLength} onChange={event => setMapLength(Number(event.target.value))}/>
    <div className="scaleMap" aria-hidden="true">
      <span className="scalePoint start">A</span>
      <span className="scaleTrack" style={{width: `${Math.min(92, 18 + mapLength * 3.8)}%`}}><i/></span>
      <span className="scalePoint end">B</span>
    </div>
    <div className="scaleReadout"><div><small>Skala</small><strong>{scale.label}</strong></div><div><small>Jarak peta</small><strong>{mapLength} cm</strong></div><div className="accent"><small>Jarak sebenarnya</small><strong>{formatDistance(realCm)}</strong></div></div>
    <div className="equationSummary"><span>{mapLength} cm × {scale.value.toLocaleString('id-ID')}</span><span className="equals">=</span><strong>{formatDistance(realCm)}</strong></div>
    <p className="microNote">💡 Skala 1 : {scale.value.toLocaleString('id-ID')} berarti 1 cm pada peta mewakili {formatDistance(scale.value)} pada kenyataan.</p>
  </section>;
}
