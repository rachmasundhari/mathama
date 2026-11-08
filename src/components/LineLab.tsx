import React, {useState} from 'react';
import LabHeader from './LabHeader';
import {designTokens} from '../design/tokens.generated';

const c = designTokens.color;
type Relation = 'sejajar' | 'berpotongan' | 'tegak lurus';
const relations: Relation[] = ['sejajar', 'berpotongan', 'tegak lurus'];

export default function LineLab() {
  const [relation, setRelation] = useState<Relation>('sejajar');
  const [angle, setAngle] = useState(35);
  const cross = relation === 'tegak lurus' ? 90 : angle;
  const dx = Math.cos((cross * Math.PI) / 180) * 190;
  const dy = Math.sin((cross * Math.PI) / 180) * 190;

  return <section className="labCard" aria-label="Laboratorium kedudukan dua garis">
    <LabHeader title="Bertemu, sejajar, atau tegak lurus?" />
    <p className="labIntro">Pilih hubungan dua garis. Pada garis berpotongan, geser sudutnya untuk melihat kapan kedua garis menjadi tegak lurus.</p>
    <div className="opTabs" role="group" aria-label="Pilih kedudukan garis">
      {relations.map(item => <button key={item} type="button" className={`opTab ${relation === item ? 'active' : ''}`} aria-pressed={relation === item} onClick={() => setRelation(item)}>{item}</button>)}
    </div>
    {relation === 'berpotongan' && <>
      <div className="sliderRow"><label htmlFor="line-angle">Sudut perpotongan</label><strong className="valueChip">{angle}°</strong></div>
      <input id="line-angle" className="rangeInput" type="range" min="15" max="80" value={angle} onChange={event => setAngle(Number(event.target.value))}/>
    </>}
    <div style={{maxWidth: 520, margin: '0 auto'}} aria-hidden="true">
      <svg viewBox="0 0 520 300" role="img" aria-label={`Dua garis ${relation}`}>
        <rect x="10" y="10" width="500" height="280" rx="16" fill={c.ice.value}/>
        {relation === 'sejajar' && <>
          <line x1="70" y1="100" x2="450" y2="100" stroke={c.ocean.value} strokeWidth="4"/>
          <line x1="70" y1="200" x2="450" y2="200" stroke={c.teal.value} strokeWidth="4"/>
          <text x="260" y="160" textAnchor="middle" fontSize="15" fill={c.muted.value} fontWeight="700">jarak tetap</text>
        </>}
        {relation !== 'sejajar' && <>
          <line x1="260" y1="50" x2="260" y2="250" stroke={c.ocean.value} strokeWidth="4"/>
          <line x1={260 - dx} y1={150 - dy} x2={260 + dx} y2={150 + dy} stroke={c.teal.value} strokeWidth="4"/>
          <text x="278" y="72" fontSize="14" fill={c.muted.value} fontWeight="700">{cross}°</text>
        </>}
      </svg>
    </div>
    <p className="microNote">{relation === 'sejajar' ? 'Dua garis sejajar tidak pernah bertemu, walaupun diperpanjang.' : relation === 'tegak lurus' ? 'Dua garis tegak lurus berpotongan membentuk sudut 90°.' : `Dua garis berpotongan di satu titik dan membentuk sudut ${angle}°.`}</p>
  </section>;
}
