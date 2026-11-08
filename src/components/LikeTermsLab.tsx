import React, {useState} from 'react';

const examples = [
  {terms: ['3x', '2y', '4x'], question:'Suku mana yang bisa digabung?', answer: ['3x','4x'], result:'7x + 2y', explanation:'3x dan 4x sama-sama memiliki variabel x.'},
  {terms: ['5a', '3', '2a'], question:'Kelompokkan suku sejenis.', answer: ['5a','2a'], result:'7a + 3', explanation:'5a dan 2a punya variabel a; angka 3 adalah konstanta.'},
];
export default function LikeTermsLab() {
  const [example, setExample] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const data = examples[example];
  const correct = picked.length === data.answer.length && data.answer.every(term => picked.includes(term));
  const choose = (term:string) => {if(checked) return; setPicked(old=>old.includes(term)?old.filter(t=>t!==term):[...old,term]);};
  return <section className="labCard">
    <div className="labHeader"><div><span className="eyebrow teal">PILIH SUKU SEJENIS</span><h3>{data.question}</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Pilih dua suku yang bisa langsung dijumlahkan.</p>
    <div className="termChooser">{data.terms.map(term=><button type="button" key={term} className={`termTile ${picked.includes(term)?'picked':''}`} aria-pressed={picked.includes(term)} disabled={checked} onClick={()=>choose(term)}>{term}</button>)}</div>
    {checked && <div role="status" className={`feedback ${correct?'feedbackCorrect':'feedbackIncorrect'}`}><strong>{correct?'✓ Benar!':'Belum tepat.'}</strong><p>{data.explanation} Bentuk sederhananya: <strong>{data.result}</strong>.</p></div>}
    <div className="quizActions"><button type="button" className="textButton" onClick={()=>{setExample((example+1)%examples.length);setPicked([]);setChecked(false);}}>↻ Ganti contoh</button><button type="button" className="button primaryButton" onClick={()=>setChecked(true)} disabled={picked.length===0||checked}>Periksa pilihan →</button></div>
  </section>;
}
