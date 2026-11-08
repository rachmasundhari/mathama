import React, {useState} from 'react';
import LabHeader from './LabHeader';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
const r = designTokens.roles;

export default function SimilarityLab() {
  const [factor, setFactor] = useState(1.5);
  const base = 30;
  const left = {x: 60, y: 270, width: 3 * base, height: 4 * base};
  const right = {x: 370, y: 270, width: 3 * base * factor, height: 4 * base * factor};
  const perimeterRatio = factor;
  const areaRatio = factor * factor;

  return <section className="labCard" aria-label="Laboratorium kesebangunan segitiga">
    <LabHeader title="Ukuran berubah, bentuk tetap" />
    <p className="labIntro">Dua segitiga sebangun memiliki sudut yang sama, tetapi panjang sisinya berlipat dengan faktor yang sama.</p>
    <div className="sliderRow"><label htmlFor="similarity-factor">Faktor skala</label><strong className="valueChip">×{factor.toFixed(1).replace('.', ',')}</strong></div>
    <input id="similarity-factor" className="rangeInput" type="range" min="0.6" max="2" step="0.1" value={factor} onChange={event => setFactor(Number(event.target.value))}/>
    <div className="similarityStage">
      <svg viewBox="0 0 620 330" role="img" aria-label="Dua segitiga sebangun dengan faktor skala">
        <polygon points={`${left.x},${left.y} ${left.x + left.width},${left.y} ${left.x},${left.y - left.height}`} fill={c.skyPale.value} stroke={c.ocean.value} strokeWidth="3"/>
        <text x={left.x + left.width / 2} y={left.y + 22} textAnchor="middle" fontSize="13" fill={c.ocean.value}>3</text>
        <text x={left.x - 14} y={left.y - left.height / 2} textAnchor="middle" fontSize="13" fill={c.ocean.value}>4</text>
        <text x={left.x + left.width / 2 + 12} y={left.y - left.height / 2} fontSize="13" fill={c.ocean.value}>5</text>
        <polygon points={`${right.x},${right.y} ${right.x + right.width},${right.y} ${right.x},${right.y - right.height}`} fill={c.skyPale.value} stroke={c.teal.value} strokeWidth="3"/>
        <text x={right.x + right.width / 2} y={right.y + 22} textAnchor="middle" fontSize="13" fill={r.primaryDark}>{3 * factor}</text>
        <text x={right.x - 16} y={right.y - right.height / 2} textAnchor="middle" fontSize="13" fill={r.primaryDark}>{4 * factor}</text>
        <text x={right.x + right.width / 2 + 14} y={right.y - right.height / 2} fontSize="13" fill={r.primaryDark}>{5 * factor}</text>
        <text x={left.x + 25} y={left.y - left.height - 18} fontSize="15" fontWeight="800" fill={c.ocean.value}>SEGITIGA ASAL</text>
        <text x={right.x + 8} y={right.y - right.height - 18} fontSize="15" fontWeight="800" fill={r.primaryDark}>SEGITIGA HASIL</text>
      </svg>
    </div>
    <div className="similarityGrid">
      <div><small>Sisi 3 menjadi</small><strong>{3 * factor}</strong></div>
      <div><small>Sisi 4 menjadi</small><strong>{4 * factor}</strong></div>
      <div><small>Sisi 5 menjadi</small><strong>{5 * factor}</strong></div>
      <div><small>Perbandingan keliling</small><strong>{perimeterRatio.toFixed(1).replace('.', ',')} : 1</strong></div>
      <div><small>Perbandingan luas</small><strong>{areaRatio.toFixed(2).replace('.', ',')} : 1</strong></div>
      <div><small>Besar sudut</small><strong>Tetap</strong></div>
    </div>
    <p className="microNote">💡 Panjang sisi berbanding dengan faktor skala, tetapi luas berbanding dengan kuadrat faktor skala.</p>
  </section>;
}
