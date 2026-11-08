import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import QuizRunner from '../components/QuizRunner';
import {quizBank} from '../data/questions';

const chapterOf = (id: string) => {
  if (id.startsWith('integer') || id.startsWith('rational') || id.startsWith('number')) return 'Bab 1 · Bilangan dan operasinya';
  if (id.startsWith('ratio')) return 'Bab 2 · Perbandingan dan skala';
  if (id.startsWith('social')) return 'Bab 3 · Aritmetika sosial';
  if (id.startsWith('algebra')) return 'Bab 4 · Pola dan bentuk aljabar';
  if (id.startsWith('equation')) return 'Bab 5 · PLSV dan PtLSV';
  if (id.startsWith('geometry')) return 'Bab 6 · Garis dan sudut';
  if (id.startsWith('shape')) return 'Bab 7 · Segitiga dan segiempat';
  if (id.startsWith('set')) return 'Bab 8 · Himpunan';
  if (id.startsWith('data')) return 'Bab 9 · Pengumpulan dan penyajian data';
  if (id.startsWith('angle') || id.startsWith('similarity')) return 'Pengayaan · Kesebangunan';
  return 'Kelas 7';
};

const iconOf = (id: string) => {
  if (id.startsWith('integer') || id.startsWith('number')) return '±';
  if (id.startsWith('rational')) return '¾';
  if (id.startsWith('ratio')) return '∶';
  if (id.startsWith('social')) return 'Rp';
  if (id.startsWith('algebra')) return 'x';
  if (id.startsWith('equation')) return '=';
  if (id.startsWith('geometry')) return '∠';
  if (id.startsWith('shape')) return '◺';
  if (id.startsWith('set')) return '{ }';
  if (id.startsWith('data')) return '▥';
  if (id.startsWith('angle') || id.startsWith('similarity')) return '∼';
  return '✦';
};

export default function Practice():React.ReactNode {
  const quizzes = useMemo(() => Object.entries(quizBank), []);
  const [quiz,setQuiz] = useState('integer-basics');
  const [query,setQuery] = useState('');
  const filtered = quizzes.filter(([,data]) => `${data.title} ${data.description}`.toLowerCase().includes(query.toLowerCase()));

  return <Layout>
    <Head><title>Latihan soal</title><meta name="description" content="Latihan matematika interaktif dengan petunjuk dan pembahasan langsung."/></Head>
    <main className="subPage"><div className="pageContainer practicePage">
      <div className="catalogHero"><span className="eyebrow teal">TEMPAT LATIHAN</span><h1>Berani mencoba?</h1><p>Setiap soal punya petunjuk dan pembahasan. Salah itu bagian dari cerita; yang penting kamu tahu alasannya.</p></div>
      <div className="practiceGrid">
        <aside className="practiceSidebar">
          <h3>Pilih latihan</h3>
          <label className="practiceSearch"><span>Cari latihan</span><input className="mathTextInput" type="search" aria-label="Cari latihan" value={query} onChange={event => setQuery(event.target.value)} placeholder="Misal: pecahan" /></label>
          <div className="practiceList">
            {filtered.map(([id,data]) => <button type="button" key={id} aria-pressed={quiz===id} className={`practiceSelect ${quiz===id?'active':''}`} onClick={()=>setQuiz(id)}><span>{iconOf(id)}</span><span><strong>{data.title}</strong><small>{chapterOf(id)} · {data.questions.length} soal</small></span></button>)}
            {filtered.length === 0 && <p className="practiceEmpty">Belum ada latihan yang cocok. Coba kata lain.</p>}
          </div>
          <p>Nilai terbaik disimpan di browser perangkat ini, bukan di server.</p>
        </aside>
        <div key={quiz}><QuizRunner quizId={quiz}/></div>
      </div>
    </div></main>
  </Layout>;
}
