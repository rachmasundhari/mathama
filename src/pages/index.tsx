import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Waves from '../components/Waves';
import BoidsFlock from '../components/BoidsFlock';
import {ArrowUpRight, BookOpen, CircleCheckBig, FlaskConical} from 'lucide-react';
import {useLessonProgress} from '../hooks/useLessonProgress';
import useBaseUrl from '@docusaurus/useBaseUrl';

const chapters: {num:string;name:string;desc:string;label:string;symbol:string;url:string}[] = [
  {num:'01',name:'Bilangan dan operasinya',desc:'Bilangan bulat, pecahan, pangkat, dan faktor.',label:'8 pelajaran',symbol:'−3 + 5',url:'/learn/grade-7/integers/number-line'},
  {num:'02',name:'Perbandingan, rasio, proporsi, dan skala',desc:'Rasio ekuivalen, proporsi, peta, dan laju.',label:'4 pelajaran',symbol:'2 : 3',url:'/learn/grade-7/ratios/ratios'},
  {num:'03',name:'Aritmetika sosial',desc:'Harga, untung, diskon, pajak, dan bunga.',label:'4 pelajaran',symbol:'Rp',url:'/learn/grade-7/social/percent'},
  {num:'04',name:'Pola dan bentuk aljabar',desc:'Variabel, suku sejenis, pola, dan bentuk ekuivalen.',label:'6 pelajaran',symbol:'2x + 3',url:'/learn/grade-7/algebra/variables'},
  {num:'05',name:'Persamaan dan pertidaksamaan linear',desc:'Timbangan, batas anggaran, dan garis bilangan.',label:'4 pelajaran',symbol:'x = ?',url:'/learn/grade-7/equations/meaning'},
  {num:'06',name:'Garis dan sudut',desc:'Garis sejajar, transversal, dan sudut istimewa.',label:'4 pelajaran',symbol:'∠',url:'/learn/grade-7/geometry/lines'},
  {num:'07',name:'Segitiga dan segiempat',desc:'Sifat bangun, keliling, luas, dan gabungan.',label:'4 pelajaran',symbol:'◺',url:'/learn/grade-7/shapes/triangles'},
  {num:'08',name:'Himpunan',desc:'Notasi, Diagram Venn, irisan, dan gabungan.',label:'4 pelajaran',symbol:'{ }',url:'/learn/grade-7/sets/concept'},
  {num:'09',name:'Pengumpulan dan penyajian data',desc:'Survei, tabel, diagram batang, dan lingkaran.',label:'4 pelajaran',symbol:'▥',url:'/learn/grade-7/data/investigation'},
];

const characters = [
  {name:'Raka',role:'Si penggambar',desc:'Memahami soal lewat sketsa. Diam dulu, lalu bilang "Oh".',img:'/img/characters/final/raka.webp',position:'center center'},
  {name:'Nara',role:'Si penyusun',desc:'Menulis langkah dan tabel. Berani merevisi kalau buktinya lain.',img:'/img/characters/final/nara.webp',position:'center center'},
  {name:'Bima',role:'Si penguji',desc:'Baru percaya kalau sudah diuji. "Teorinya boleh bagus, tapi coba dulu."',img:'/img/characters/final/bima.webp',position:'center center'},
  {name:'Kiki',role:'Si penanya',desc:'Bertanya hal yang "jelas", dan justru membuka jebakan konsep.',img:'/img/characters/final/kiki.webp',position:'center center'},
  {name:'Pak Rahmat',role:'Guru pembina',desc:'Punya termos dan pertanyaan yang lebih berguna daripada jawaban.',img:'/img/characters/final/pak-rahmat.webp',position:'center center'},
];

// Cast cards are hidden for now. Flip this to true to show the club section
// again once the character art and the story framing are settled.
const showCast = false;

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

function Marbles({count, group}:{count:number;group:string}) {
  return <div>{Array.from({length:count},(_,i)=><span key={`${group}-${count}-${i}`} style={{animationDelay:`${Math.min(i,6)*45}ms`}}/>)}</div>;
}

function HeroExperiment() {
  const [x, setX] = useState(3);
  const demoRef = useRef<HTMLDivElement>(null);
  const yieldedRef = useRef(false);

  // The demo counts by itself until the visitor takes the slider, so the value
  // never changes under their hand. Offscreen, hidden, and reduced-motion
  // sessions stay still.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = demoRef.current;
    let visible = true;
    const observer = node && 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; }, {threshold: 0.3})
      : null;
    if (observer && node) observer.observe(node);
    const timer = window.setInterval(() => {
      if (yieldedRef.current || !visible || document.hidden) return;
      setX(value => (value % 6) + 1);
    }, 2600);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
    };
  }, []);

  const takeOver = () => { yieldedRef.current = true; };

  return <div className="heroDemo" ref={demoRef} aria-label="Contoh eksperimen matematika interaktif">
    <div className="heroDemoTop"><span><i className="greenCircle"/> LAB INTERAKTIF</span><span className="demoDots" aria-hidden="true">● ● ●</span></div>
    <div className="demoIntro">Di papan tulis: jika setiap kotak berisi <strong>x</strong> kelereng...</div>
    <div className="heroEquation"><span>2x + 3</span><span className="heroEquationEquals">=</span><strong key={x} className="heroEquationValue">{2*x+3}</strong></div>
    <div className="heroGroups" aria-hidden="true"><div className="heroGroup"><small>x</small><Marbles count={x} group="a"/></div><div className="heroGroup"><small>x</small><Marbles count={x} group="b"/></div><span className="plusSign">+</span><div className="heroGroup constants"><small>3</small><Marbles count={3} group="k"/></div></div>
    <div className="heroDemoSlider"><div><label htmlFor="hero-x">Geser isi kotak</label><strong>x = {x}</strong></div><input id="hero-x" type="range" min="1" max="6" value={x} onPointerDown={takeOver} onFocus={takeOver} onKeyDown={takeOver} onChange={e=>{takeOver();setX(Number(e.target.value));}}/><div className="heroDemoScale"><span>1</span><span>6</span></div></div>
  </div>;
}

export default function Home(): React.ReactNode {
  const {completed, loaded} = useLessonProgress();
  const base = useBaseUrl('/');
  return <Layout>
    <Head><title>Mathama: Matematika Kelas 7</title><meta name="description" content="Belajar Matematika SMP Kelas 7: materi bertahap, laboratorium interaktif, latihan dengan pembahasan, dan satu cerita di akhir tiap bab."/></Head>
    <main className="siteMain">
      <section className="heroSection">
        <BoidsFlock />
        <div className="pageContainer heroGrid">
        <div className="heroCopy"><div className="announcement"><span>✳</span> Matematika SMP</div>
          <h1>Belajar Matematika, <em>Mulai dari Sini</em></h1>
          <div className="heroButtons"><Link to="/learn/grade-7/integers/number-line" className="button primaryButton bigButton">Mulai belajar <span>↗</span></Link><Link to="/courses" className="button outlineButton bigButton">Jelajahi materi <span>→</span></Link></div>
          <div className="heroTrust"><div className="tinyAvatars"><span>∑</span><span>π</span><span>∞</span></div><div><strong>9 bab · 45 pelajaran · 40 latihan</strong><small>Kurikulum Merdeka SMP</small></div></div>
        </div>
        <div className="heroVisual"><div className="floatingNote noteTop"><span>✧</span> Coba, bukan cuma baca</div><HeroExperiment/><div className="floatingNote noteBottom">✦ "Oh, ternyata begitu."</div></div>
      </div></section>

      <section className="stepsSection"><div className="pageContainer"><div className="sectionHeading compactHeading"><div><span className="eyebrow">CARA BELAJARNYA</span><h2>Tiga langkah, lebih paham.</h2></div><p>Setiap bab dimulai dari satu masalah. Materi lalu menjelaskan apa yang tadi kamu tebak.</p></div>
        <div className="stepsGrid"><div className="stepCard"><div className="stepIcon"><BookOpen size={24}/></div><span>01 / MULAI DARI MASALAH</span><h3>Lihat dulu soalnya</h3><p>Kamu menebak dulu sebelum rumusnya muncul, lalu memeriksa tebakan itu lewat contoh.</p></div><div className="stepCard"><div className="stepIcon"><FlaskConical size={24}/></div><span>02 / EKSPLORASI</span><h3>Coba di meja kerja</h3><p>Geser nilai, putar bangun 3D, dan ubah data. Konsepnya terlihat, bukan cuma dihafal.</p></div><div className="stepCard"><div className="stepIcon"><CircleCheckBig size={24}/></div><span>03 / LATIH</span><h3>Uji pemahaman</h3><p>Kerjakan latihan, baca pembahasan, dan tandai pelajaran yang sudah kamu kuasai.</p></div></div>
      </div></section>

      <section className="chaptersSection"><div className="pageContainer"><div className="sectionHeading"><div><span className="eyebrow">SEMBILAN BAB KELAS 7</span><h2>Belajar apa hari ini?</h2></div><Link to="/courses" className="sectionLink">Lihat semua materi ↗</Link></div>
        <div className="chapterGrid">{chapters.map(ch=><Link to={ch.url} className="chapterCard" data-chapter={ch.num} key={ch.num}><div className="chapterHeader"><span>BAB {ch.num} · KELAS 7</span><span className="chapterArrow"><ArrowUpRight size={17}/></span></div><div className="chapterSymbol" aria-hidden="true">{ch.num==='07' ? <SimilarityMark/> : ch.num==='09' ? <DataMark/> : ch.symbol}</div><div><h3>{ch.name}</h3><p>{ch.desc}</p><span className="chapterCount">{ch.label} · Buka ↗</span></div></Link>)}</div>
      </div></section>

      {showCast && <section className="castSection"><div className="pageContainer"><div className="sectionHeading"><div><span className="eyebrow">TOKOH CERITA</span><h2>Kenalan dengan Klub Matematika.</h2></div><Link to="/about" className="sectionLink">Baca karakter lengkap ↗</Link></div>
        <div className="castGrid">{characters.map(person=><article className="castCard" key={person.name}><div className="castPortrait"><img src={`${base}${person.img.replace(/^\//, '')}`} alt={`Ilustrasi ${person.name}, ${person.role.toLowerCase()}`} loading="lazy" style={{objectPosition: person.position}}/></div><div className="castName"><h3>{person.name}</h3></div></article>)}</div>
      </div></section>}

      <section className="spotlightSection"><div className="pageContainer"><div className="spotlightBox"><div className="spotlightWaves" aria-hidden="true"><Waves lineColor="#a7d8cd" accentColor="#62c4c3" backgroundColor="transparent" lineStyle="solid" spacing={22} lineWidth={1} rotation={-4} amplitude={12} scale={1.2} twist={0.5} speed={0.35} variation={4} mouseInteraction={false} clickRipple={false} intro={true} fade={0.5} opacity={0.3} /></div><div className="spotlightCopy"><span className="eyebrow">MISI BAB 4 · POLA DAN BENTUK ALJABAR</span><h2>Kotak yang belum dihitung.</h2><p>Kiki menemukan kotak hadiah bertuliskan "2x + 3". Isinya berapa? Huruf x bukan monster. Ia cuma kotak yang belum diisi.</p><Link to="/learn/grade-7/algebra/variables" className="button lightButton">Masuk ke bab aljabar ↗</Link></div><div className="spotlightVisual"><div className="spotBox">x <span>● ● ●</span></div><div className="spotPlus">+</div><div className="spotBox">x <span>● ● ●</span></div><div className="spotResult">= 2x</div></div></div></div></section>

      <section className="bottomCta"><div className="pageContainer bottomCtaInner"><div><span className="eyebrow">BELAJAR SESUAI RITMEMU</span><h2>Sedikit demi sedikit, kamu pasti bisa.</h2><p>{loaded && completed.length ? `Kamu telah menyelesaikan ${completed.length} materi di perangkat ini. Lanjutkan belajarnya!` : 'Tak perlu terburu-buru. Mulai dari materi pertama, lalu lanjut ke bab berikutnya.'}</p></div><Link to="/courses" className="button primaryButton bigButton">Pilih materi ↗</Link></div></section>
    </main>
  </Layout>;
}
