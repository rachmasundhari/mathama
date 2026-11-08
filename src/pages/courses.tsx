import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';

type Course = {grade:number;label:string;name:string;description:string;icon:string;status:'Tersedia'|'Segera hadir';url:string;chapter:string;lessons?:number};
const courses:Course[] = [
  {grade:7,label:'BAB 01',name:'Bilangan Bulat',description:'Papan pasang surut, urutan, operasi, faktor, KPK, dan FPB.',icon:'−3 + 5',status:'Tersedia',url:'/learn/grade-7/integers/number-line',chapter:'01',lessons:3},
  {grade:7,label:'BAB 02',name:'Bilangan Rasional',description:'Pecahan, desimal, persen, dan resep untuk seratus orang.',icon:'3/4',status:'Tersedia',url:'/learn/grade-7/rational/between',chapter:'02',lessons:3},
  {grade:7,label:'BAB 03',name:'Rasio',description:'Peta festival, skala, laju, dan perbandingan berbalik nilai.',icon:'2 : 3',status:'Tersedia',url:'/learn/grade-7/ratios/ratios',chapter:'03',lessons:3},
  {grade:7,label:'BAB 04',name:'Bentuk Aljabar',description:'Variabel, suku sejenis, distributif, dan kotak misterius.',icon:'2x + 3',status:'Tersedia',url:'/learn/grade-7/algebra/variables',chapter:'04',lessons:4},
  {grade:7,label:'BAB 05',name:'Kesebangunan',description:'Sudut, bangun sebangun, dan layang-layang raksasa.',icon:'◺',status:'Tersedia',url:'/learn/grade-7/similarity/angles',chapter:'05',lessons:3},
  {grade:7,label:'BAB 06',name:'Data dan Diagram',description:'Survei warga, jenis data, diagram batang, dan lingkaran.',icon:'▥',status:'Tersedia',url:'/learn/grade-7/data/investigation',chapter:'06',lessons:3},
  {grade:8,label:'MENYUSUL',name:'Pola Bilangan',description:'Temukan keteraturan pada barisan bilangan.',icon:'2,4,8…',status:'Segera hadir',url:'/learn/grade-8/overview',chapter:'01'},
  {grade:8,label:'MENYUSUL',name:'Persamaan Linear',description:'Mencari nilai yang belum diketahui.',icon:'y = 2x',status:'Segera hadir',url:'/learn/grade-8/overview',chapter:'02'},
  {grade:9,label:'MENYUSUL',name:'Transformasi Geometri',description:'Translasi, refleksi, rotasi, dan dilatasi.',icon:'↗ ◇',status:'Segera hadir',url:'/learn/grade-9/overview',chapter:'03'},
  {grade:9,label:'MENYUSUL',name:'Persamaan Kuadrat',description:'Bentuk, akar, dan grafik kuadrat.',icon:'x² + 2',status:'Segera hadir',url:'/learn/grade-9/overview',chapter:'04'},
];

const totals:Record<number,number> = {7: courses.filter(course=>course.grade===7).reduce((sum,course)=>sum + (course.lessons ?? 0),0), 8: 0, 9: 0};

export default function Courses():React.ReactNode {
  const [grade,setGrade] = useState(7);
  return <Layout>
    <Head><title>Jelajahi materi</title><meta name="description" content="Katalog pelajaran matematika SMP Kelas 7-9"/></Head>
    <main className="subPage"><div className="pageContainer">
      <div className="catalogHero"><span className="eyebrow teal">PERPUSTAKAAN MATERI</span><h1>Mau belajar topik apa?</h1><p>Enam bab Kelas 7 sudah lengkap: cerita, laboratorium interaktif, contoh bertahap, dan latihan dengan pembahasan.</p></div>
      <div className="gradeTabs" role="tablist" aria-label="Pilih kelas">{[7,8,9].map(g=><button type="button" role="tab" aria-selected={grade===g} className={grade===g?'gradeTab active':'gradeTab'} key={g} onClick={()=>setGrade(g)}>Kelas {g}</button>)}</div>
      <div className="catalogMeta"><strong>Kelas {grade}</strong><span>{grade===7 ? `${totals[7]} pelajaran dalam 6 bab` : 'Materi sedang disiapkan'}</span></div>
      <div className="catalogGrid">{courses.filter(c=>c.grade===grade).map(course=><Link to={course.url} key={course.name} className="catalogCard"><div className="catalogArt" data-chapter={course.chapter}><span className="catalogMath">{course.icon}</span><span className="catalogStatus">{course.status}</span></div><div className="catalogCardBody"><small>{course.label} · KELAS {grade}</small><h3>{course.name}</h3><p>{course.description}</p><span className="catalogCardAction">{course.status==='Tersedia'?`${course.lessons} pelajaran · Mulai ↗`:'Lihat informasi ↗'}</span></div></Link>)}</div>
      <div className="catalogFooter">✧ Materi baru ditambahkan sebagai file MDX dan komponen interaktif yang bisa dipakai ulang.</div>
    </div></main>
  </Layout>;
}
