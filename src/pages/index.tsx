import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Waves from '../components/Waves';
import {ArrowUpRight, BookOpen, CircleCheckBig, FlaskConical} from 'lucide-react';
import {useLessonProgress} from '../hooks/useLessonProgress';

const chapters: {num:string;name:string;desc:string;label:string;symbol:string;url:string}[] = [
  {num:'01',name:'Bilangan bulat',desc:'Naik-turun pasang surut, tanda, dan urutan.',label:'3 pelajaran',symbol:'−3 + 5',url:'/learn/grade-7/integers/number-line'},
  {num:'02',name:'Bilangan rasional',desc:'Pecahan, desimal, persen, dan resep pasar.',label:'3 pelajaran',symbol:'3/4',url:'/learn/grade-7/rational/between'},
  {num:'03',name:'Rasio',desc:'Peta, skala, dan laju di festival.',label:'3 pelajaran',symbol:'2 : 3',url:'/learn/grade-7/ratios/ratios'},
  {num:'04',name:'Bentuk aljabar',desc:'Variabel, suku sejenis, dan kotak misterius.',label:'4 pelajaran',symbol:'2x + 3',url:'/learn/grade-7/algebra/variables'},
  {num:'05',name:'Kesebangunan',desc:'Sudut, layang-layang, dan bentuk yang setia.',label:'3 pelajaran',symbol:'◺',url:'/learn/grade-7/similarity/angles'},
  {num:'06',name:'Data & diagram',desc:'Suara warga, tabel, dan cerita di balik angka.',label:'3 pelajaran',symbol:'▥',url:'/learn/grade-7/data/investigation'},
];

const characters = [
  {name:'Ari',role:'Si penggambar',desc:'Memahami soal lewat sketsa. Diam dulu, lalu bilang "Oh".',img:'/img/characters/ari.webp'},
  {name:'Naya',role:'Si penyusun',desc:'Menulis langkah dan tabel. Kadang terlalu yakin, lalu merevisi.',img:'/img/characters/naya.webp'},
  {name:'Bima',role:'Si pembuat',desc:'Baru percaya kalau sudah diuji. "Teorinya boleh bagus, tapi coba dulu."',img:'/img/characters/bima.webp'},
  {name:'Kak Rani',role:'Mentor',desc:'Punya teko teh dan pertanyaan yang lebih berguna daripada jawaban.',img:'/img/characters/kak-rani.webp'},
];

function SimilarityMark() {
  return <svg className="chapterMark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path d="M4 56 32 4l28 52Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M22 56 32 36l10 20Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
  </svg>;
}

function DataMark() {
  return <svg className="chapterMark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path d="M6 56h52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <rect x="10" y="34" width="10" height="17" rx="1.5" fill="currentColor"/>
    <rect x="27" y="22" width="10" height="29" rx="1.5" fill="currentColor"/>
    <rect x="44" y="10" width="10" height="41" rx="1.5" fill="currentColor"/>
  </svg>;
}

function HeroExperiment() {
  const [x, setX] = useState(3);
  return <div className="heroDemo" aria-label="Contoh eksperimen matematika interaktif">
    <div className="heroDemoTop"><span><i className="greenCircle"/> LAB INTERAKTIF</span><span className="demoDots">● ● ●</span></div>
    <div className="demoIntro">Naya menulis: jika setiap kotak berisi <strong>x</strong> kelereng...</div>
    <div className="heroEquation"><span>2x + 3</span><span className="heroEquationEquals">=</span><strong>{2*x+3}</strong></div>
    <div className="heroGroups"><div className="heroGroup"><small>x</small><div>{Array.from({length:x},(_,i)=><span key={i}/>)}</div></div><div className="heroGroup"><small>x</small><div>{Array.from({length:x},(_,i)=><span key={i}/>)}</div></div><span className="plusSign">+</span><div className="heroGroup constants"><small>3</small><div><span/><span/><span/></div></div></div>
    <div className="heroDemoSlider"><div><label htmlFor="hero-x">Geser isi kotak</label><strong>x = {x}</strong></div><input id="hero-x" type="range" min="1" max="6" value={x} onChange={e=>setX(Number(e.target.value))}/><div className="heroDemoScale"><span>1</span><span>6</span></div></div>
    <div className="heroDemoFoot"><span>✦</span> Ari menggambar, Bima menguji, kamu menyimpulkan.</div>
  </div>;
}

export default function Home(): React.ReactNode {
  const {completed, loaded} = useLessonProgress();
  return <Layout>
    <Head><title>Cakrawala: Matematika lewat cerita</title><meta name="description" content="Belajar Matematika SMP Kelas 7 lewat cerita Klub Cakrawala, eksperimen interaktif, dan latihan soal."/></Head>
    <main className="siteMain">
      <section className="heroSection">
        <div className="pageContainer heroGrid">
        <div className="heroCopy"><div className="announcement"><span>✳</span> KELAS 7 · SATU SEMESTER, SATU CERITA</div>
          <h1>Matematika yang <em>punya cerita.</em></h1>
          <p>Ikuti Ari, Naya, Bima, dan Odi di Klub Cakrawala. Mereka memecahkan masalah warga Tanjung Cakrawala, dan matematika jadi alat yang benar-benar dipakai.</p>
          <div className="heroButtons"><Link to="/learn/grade-7/integers/number-line" className="button primaryButton bigButton">Mulai cerita <span>↗</span></Link><Link to="/courses" className="button outlineButton bigButton">Jelajahi materi <span>→</span></Link></div>
          <div className="heroTrust"><div className="tinyAvatars"><span>∑</span><span>π</span><span>∞</span></div><div><strong>6 bab · 19 pelajaran · 14 latihan</strong><small>Kurikulum Merdeka Kelas 7</small></div></div>
        </div>
        <div className="heroVisual"><div className="floatingNote noteTop"><span>✧</span> Coba, bukan cuma baca</div><HeroExperiment/><div className="floatingNote noteBottom">✦ "Oh, ternyata begitu."</div></div>
      </div></section>

      <section className="stepsSection"><div className="pageContainer"><div className="sectionHeading compactHeading"><div><span className="eyebrow">CARA BELAJARNYA</span><h2>Tiga langkah, lebih paham.</h2></div><p>Setiap bab dimulai dengan masalah, bukan definisi. Kamu ikut berpikir bersama tokohnya.</p></div>
        <div className="stepsGrid"><div className="stepCard"><div className="stepIcon"><BookOpen size={24}/></div><span>01 / IKUTI CERITA</span><h3>Pahami masalahnya</h3><p>Dengar percakapan, lihat percobaan pertama yang belum berhasil, lalu temukan pertanyaannya.</p></div><div className="stepCard"><div className="stepIcon"><FlaskConical size={24}/></div><span>02 / EKSPLORASI</span><h3>Coba di meja kerja</h3><p>Geser nilai, putar bangun 3D, dan ubah data. Konsepnya terlihat, bukan cuma dihafal.</p></div><div className="stepCard"><div className="stepIcon"><CircleCheckBig size={24}/></div><span>03 / LATIH</span><h3>Uji pemahaman</h3><p>Kerjakan latihan, baca pembahasan, dan tandai pelajaran yang sudah kamu kuasai.</p></div></div>
      </div></section>

      <section className="chaptersSection"><div className="pageContainer"><div className="sectionHeading"><div><span className="eyebrow">ENAM BAB KELAS 7</span><h2>Belajar apa hari ini?</h2></div><Link to="/courses" className="sectionLink">Lihat semua materi ↗</Link></div>
        <div className="chapterGrid">{chapters.map(ch=><Link to={ch.url} className="chapterCard" data-chapter={ch.num} key={ch.num}><div className="chapterHeader"><span>BAB {ch.num} · KELAS 7</span><span className="chapterArrow"><ArrowUpRight size={17}/></span></div><div className="chapterSymbol" aria-hidden="true">{ch.num==='05' ? <SimilarityMark/> : ch.num==='06' ? <DataMark/> : ch.symbol}</div><div><h3>{ch.name}</h3><p>{ch.desc}</p><span className="chapterCount">{ch.label} · Buka ↗</span></div></Link>)}</div>
      </div></section>

      <section className="castSection"><div className="pageContainer"><div className="sectionHeading"><div><span className="eyebrow">TOKOH CERITA</span><h2>Kenalan dengan Klub Cakrawala.</h2></div><Link to="/about" className="sectionLink">Baca karakter lengkap ↗</Link></div>
        <div className="castGrid">{characters.map(person=><article className="castCard" key={person.name}><div className="castPortrait"><img src={person.img} alt={`Ilustrasi ${person.name}`} loading="lazy"/></div><div><span>{person.role}</span><h3>{person.name}</h3><p>{person.desc}</p></div></article>)}</div>
        <p className="castFoot">Mereka tidak selalu benar. Justru dari kesalahan pertama itulah konsepnya jadi jelas.</p>
      </div></section>

      <section className="spotlightSection"><div className="pageContainer"><div className="spotlightBox"><div className="spotlightWaves" aria-hidden="true"><Waves lineColor="#a7d8cd" accentColor="#62c4c3" backgroundColor="transparent" lineStyle="solid" spacing={22} lineWidth={1} rotation={-4} amplitude={12} scale={1.2} twist={0.5} speed={0.35} variation={4} mouseInteraction={false} clickRipple={false} intro={true} fade={0.5} opacity={0.3} /></div><div className="spotlightCopy"><span className="eyebrow">MISI BAB 4 · KOTAK MISTERIUS</span><h2>Kotak tiket yang belum terbuka.</h2><p>Naya menemukan catatan: "Tiket dewasa dua kali tiket anak. Total 90 lembar." Berapa masing-masing? Huruf x bukan monster. Ia cuma kotak yang belum diisi.</p><Link to="/learn/grade-7/algebra/variables" className="button lightButton">Masuk ke bab aljabar ↗</Link></div><div className="spotlightVisual"><div className="spotBox">x <span>● ● ●</span></div><div className="spotPlus">+</div><div className="spotBox">x <span>● ● ●</span></div><div className="spotResult">= 2x</div></div></div></div></section>

      <section className="bottomCta"><div className="pageContainer bottomCtaInner"><div><span className="eyebrow">BELAJAR SESUAI RITMEMU</span><h2>Sedikit demi sedikit, kamu pasti bisa.</h2><p>{loaded && completed.length ? `Kamu telah menyelesaikan ${completed.length} materi di perangkat ini. Lanjutkan ceritanya!` : 'Tak perlu terburu-buru. Mulai dari papan pasang surut, lalu ikuti ceritanya sampai akhir semester.'}</p></div><Link to="/courses" className="button primaryButton bigButton">Pilih materi ↗</Link></div></section>
    </main>
  </Layout>;
}
