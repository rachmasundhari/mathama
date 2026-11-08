import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';

type Course = {grade:number;label:string;name:string;description:string;icon:string;status:'Tersedia'|'Segera hadir';url:string;chapter:string;lessons?:number};
const courses:Course[] = [
  {grade:7,label:'BAB 01',name:'Bilangan dan operasinya',description:'Bilangan bulat, pecahan, desimal, persen, pangkat, akar, KPK, dan FPB.',icon:'−3 + 5',status:'Tersedia',url:'/learn/grade-7/integers/number-line',chapter:'01',lessons:8},
  {grade:7,label:'BAB 02',name:'Perbandingan, rasio, proporsi, dan skala',description:'Rasio ekuivalen, proporsi, skala peta, laju, dan perbandingan berbalik nilai.',icon:'2 : 3',status:'Tersedia',url:'/learn/grade-7/ratios/ratios',chapter:'02',lessons:4},
  {grade:7,label:'BAB 03',name:'Aritmetika sosial',description:'Persentase, untung rugi, diskon, pajak, bruto neto tara, dan bunga tunggal.',icon:'Rp',status:'Tersedia',url:'/learn/grade-7/social/percent',chapter:'03',lessons:4},
  {grade:7,label:'BAB 04',name:'Pola dan bentuk aljabar',description:'Variabel, suku sejenis, distributif, pola bilangan, dan bentuk ekuivalen.',icon:'2x + 3',status:'Tersedia',url:'/learn/grade-7/algebra/variables',chapter:'04',lessons:6},
  {grade:7,label:'BAB 05',name:'Persamaan dan pertidaksamaan linear',description:'PLSV, PtLSV, garis bilangan, dan model masalah anggaran.',icon:'x = ?',status:'Tersedia',url:'/learn/grade-7/equations/meaning',chapter:'05',lessons:4},
  {grade:7,label:'BAB 06',name:'Garis dan sudut',description:'Kedudukan garis, jenis sudut, sudut berpenyiku, dan garis transversal.',icon:'∠',status:'Tersedia',url:'/learn/grade-7/geometry/lines',chapter:'06',lessons:4},
  {grade:7,label:'BAB 07',name:'Segitiga dan segiempat',description:'Sifat bangun, sudut segitiga, keliling, luas, dan bangun gabungan.',icon:'◺',status:'Tersedia',url:'/learn/grade-7/shapes/triangles',chapter:'07',lessons:4},
  {grade:7,label:'BAB 08',name:'Himpunan',description:'Notasi himpunan, himpunan bagian, Diagram Venn, dan operasi himpunan.',icon:'{ }',status:'Tersedia',url:'/learn/grade-7/sets/concept',chapter:'08',lessons:4},
  {grade:7,label:'BAB 09',name:'Pengumpulan dan penyajian data',description:'Pertanyaan survei, jenis data, tabel, diagram batang, dan diagram lingkaran.',icon:'▥',status:'Tersedia',url:'/learn/grade-7/data/investigation',chapter:'09',lessons:4},
  {grade:7,label:'PENGAYAAN',name:'Kesebangunan',description:'Sudut pada garis sejajar, bangun sebangun, dan segitiga sebangun.',icon:'∼',status:'Tersedia',url:'/learn/grade-7/similarity/meaning',chapter:'10',lessons:3},
  {grade:8,label:'MENYUSUL',name:'Bilangan berpangkat',description:'Pangkat bulat, bentuk akar, dan notasi ilmiah.',icon:'aⁿ',status:'Segera hadir',url:'/learn/grade-8/overview',chapter:'01'},
  {grade:8,label:'MENYUSUL',name:'Teorema Pythagoras',description:'Hubungan sisi pada segitiga siku-siku.',icon:'a² + b²',status:'Segera hadir',url:'/learn/grade-8/overview',chapter:'02'},
  {grade:9,label:'MENYUSUL',name:'Fungsi kuadrat',description:'Bentuk, akar, dan grafik fungsi kuadrat.',icon:'x² + 2',status:'Segera hadir',url:'/learn/grade-9/overview',chapter:'03'},
  {grade:9,label:'MENYUSUL',name:'Transformasi geometri',description:'Translasi, refleksi, rotasi, dan dilatasi.',icon:'↗ ◇',status:'Segera hadir',url:'/learn/grade-9/overview',chapter:'04'},
];

const totals:Record<number,number> = {7: courses.filter(course=>course.grade===7).reduce((sum,course)=>sum + (course.lessons ?? 0),0), 8: 0, 9: 0};

export default function Courses():React.ReactNode {
  const [grade,setGrade] = useState(7);
  return <Layout>
    <Head><title>Jelajahi materi</title><meta name="description" content="Katalog pelajaran matematika SMP Kelas 7-9"/></Head>
    <main className="subPage"><div className="pageContainer">
      <div className="catalogHero"><span className="eyebrow teal">PERPUSTAKAAN MATERI</span><h1>Mau belajar topik apa?</h1><p>Sembilan bab Kelas 7 mengikuti ATP, ditambah satu bab pengayaan. Setiap bab berisi materi, laboratorium interaktif, contoh bertahap, latihan, dan satu cerita di akhir bab.</p></div>
      <div className="gradeTabs" role="tablist" aria-label="Pilih kelas">{[7,8,9].map(g=><button type="button" role="tab" aria-selected={grade===g} className={grade===g?'gradeTab active':'gradeTab'} key={g} onClick={()=>setGrade(g)}>Kelas {g}</button>)}</div>
      <div className="catalogMeta"><strong>Kelas {grade}</strong><span>{grade===7 ? `${totals[7]} pelajaran dalam 9 bab dan 1 pengayaan` : 'Materi sedang disiapkan'}</span></div>
      <div className="catalogGrid">{courses.filter(c=>c.grade===grade).map(course=><Link to={course.url} key={course.name} className="catalogCard"><div className="catalogArt" data-chapter={course.chapter}><span className="catalogMath">{course.icon}</span><span className="catalogStatus">{course.status}</span></div><div className="catalogCardBody"><small>{course.label} · KELAS {grade}</small><h3>{course.name}</h3><p>{course.description}</p><span className="catalogCardAction">{course.status==='Tersedia'?`${course.lessons} pelajaran · Mulai ↗`:'Lihat informasi ↗'}</span></div></Link>)}</div>
      <div className="catalogFooter">✧ Materi baru ditambahkan sebagai file MDX dan komponen interaktif yang bisa dipakai ulang.</div>
    </div></main>
  </Layout>;
}
