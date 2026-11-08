import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {coreColors, designTokens} from '../design/tokens.generated';
import '../css/palette.css';

type Swatch = {name: string; hex: string; role: string; note: string; dark?: boolean};

const core: Swatch[] = coreColors.map((color) => ({
  name: color.name,
  hex: color.value,
  role: color.role,
  note: color.note,
  dark: color.key === 'white',
}));

const gradients = [
  {name: 'Langit pagi', value: 'linear-gradient(180deg,#EAF5FA 0%,#CFE8F3 55%,#FFFFFF 100%)', note: 'Header, hero, dan ilustrasi langit.'},
  {name: 'Laut dangkal', value: 'linear-gradient(180deg,#A7D8CD 0%,#62C4C3 50%,#1A9DB5 100%)', note: 'Diagram data dan latar laut.'},
  {name: 'Laut dalam', value: 'linear-gradient(180deg,#1A9DB5 0%,#0F6B8F 55%,#0A4F6B 100%)', note: 'Panel gelap dan ajakan bertindak.'},
  {name: 'Es', value: 'linear-gradient(180deg,#FFFFFF 0%,#F4FAFD 48%,#EAF5FA 100%)', note: 'Kartu dan panel netral.'},
];

const groups = [
  {title: 'Putih & es', colors: ['#FFFFFF', '#F4FAFD', '#EAF5FA', '#CFE8F3'], note: 'Basis terang untuk hampir seluruh halaman.'},
  {title: 'Laut & langit', colors: ['#A7D8CD', '#62C4C3', '#7EC6C9', '#1A9DB5', '#0F6B8F', '#0A4F6B'], note: 'Dari air dangkal sampai laut dalam.'},
  {title: 'Tinta', colors: ['#173A46', '#5F747B', '#86979C'], note: 'Teks dan metadata.'},
];

const typeLabels: Record<string, string> = {
  hero: 'Hero',
  page: 'Judul halaman',
  section: 'Judul bagian',
  cardTitle: 'Judul kartu',
  body: 'Teks bacaan',
  bodySmall: 'Teks UI',
  metadata: 'Metadata',
  caption: 'Caption',
  label: 'Label',
  number: 'Angka besar',
};

const typeScale = Object.entries(designTokens.typography)
  .filter(([, value]) => typeof value === 'object')
  .map(([key, value]) => [key, value as {size: string; weight: number; lineHeight: number; tracking: string}] as [string, {size: string; weight: number; lineHeight: number; tracking: string}]);

function SwatchCard({swatch, onCopy}: {swatch: Swatch; onCopy: (hex: string) => void}) {
  return <button type="button" className="swatch" onClick={() => onCopy(swatch.hex)} title={`Salin ${swatch.hex}`}>
    <span className="swatchColor" style={{background: swatch.hex, color: swatch.dark === false ? '#173a46' : undefined}}><span>{swatch.hex}</span></span>
    <span className="swatchBody"><strong>{swatch.name}</strong><small>{swatch.role}</small><em>{swatch.note}</em></span>
  </button>;
}

function Horizon() {
  return <div className="paletteHorizon" aria-hidden="true">
    <div className="horizonSky"/>
    <div className="horizonSun"/>
    <div className="horizonCloud cloudOne"/>
    <div className="horizonCloud cloudTwo"/>
    <div className="horizonSea"><i/><i/><i/></div>
    <div className="horizonSand"/>
    <div className="horizonCaption"><span>LANGIT</span><span>LAUT</span><span>TEPI</span></div>
  </div>;
}

export default function Palette(): React.ReactNode {
  const [copied, setCopied] = useState('');
  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied(''), 1400);
    } catch {setCopied('');}
  };

  return <Layout>
    <Head><title>Palet warna Mathama</title><meta name="description" content="Panduan visual palet Mathama: putih, langit biru, laut, dan toska."/></Head>
    <main className="palettePage"><div className="pageContainer">
      <div className="paletteHero">
        <span className="eyebrow teal">PANDUAN VISUAL</span>
        <h1>Palet Mathama.</h1>
        <p>Putih polos, langit biru, dan laut toska. Tidak ada krem atau beige: latar tetap putih, lalu biru dipakai untuk kedalaman dan toska untuk titik hidup.</p>
        <div className="paletteMeta"><span>Putih polos</span><span>Langit biru</span><span>Laut</span><span>Toska</span></div>
      </div>

      <Horizon/>

      <section className="paletteSection">
        <h2>Palet inti</h2>
        <p>Klik kartu untuk menyalin kode hex. Rasio yang disarankan: 60% putih dan es, 30% langit serta air dangkal, 10% laut dan toska.</p>
        <div className="swatchGrid">{core.map(item => <SwatchCard key={item.hex} swatch={item} onCopy={copy}/>)}</div>
        {copied && <p className="paletteNote" role="status">{copied} tersalin ke papan klip.</p>}
      </section>

      <section className="paletteSection">
        <h2>Kelompok warna</h2>
        <p>Tiga keluarga ini cukup. Jangan menambah warna hangat: kontrasnya akan memecah suasana laut.</p>
        <div className="paletteRow">{groups.map(group => <div className="gradientCard" key={group.title}>
          <div className="gradientBar" style={{background: `linear-gradient(90deg, ${group.colors.join(', ')})`}}/>
          <div><strong>{group.title}</strong><small>{group.note}</small>
            <div className="paletteCode">{group.colors.map(color => <code key={color}>{color}</code>)}</div>
          </div>
        </div>)}</div>
      </section>

      <section className="paletteSection">
        <h2>Gradien</h2>
        <p>Gradien hanya untuk latar besar. Arah vertikal mengikuti langit ke laut; jangan memakai gradien di belakang teks panjang.</p>
        <div className="paletteRow">{gradients.map(item => <div className="gradientCard" key={item.name}><div className="gradientBar" style={{background: item.value}}/><div><strong>{item.name}</strong><small>{item.note}</small></div></div>)}</div>
      </section>

      <section className="paletteSection">
        <h2>Aturan pemakaian</h2>
        <div className="paletteUsage">
          <div className="usageCard"><strong>60%</strong><b>Putih & es</b><p>Latar halaman, ruang baca, dan area kosong. Putih polos, tanpa krem.</p></div>
          <div className="usageCard"><strong>30%</strong><b>Langit & air</b><p>Kartu, panel, dan blok data. Biru pucat memisahkan tanpa garis keras.</p></div>
          <div className="usageCard"><strong>10%</strong><b>Laut & toska</b><p>Tombol utama, angka penting, grafik, dan satu sorotan per layar.</p></div>
        </div>
        <div className="paletteNote">Teks utama selalu Tinta (#173A46) di atas putih. Laut Dalam (#0A4F6B) aman untuk teks dan tombol. Toska hanya untuk aksen, bukan latar besar.</div>
      </section>

      <section className="paletteSection">
        <h2>Contoh penerapan</h2>
        <div className="paletteSample">
          <div className="sampleCard">
            <span className="eyebrow teal">BAB 3 · RASIO</span>
            <h3>Peta yang tidak bohong</h3>
            <p>Bima membentangkan peta festival di meja. Satu sentimeter di kertas mewakili seratus meter di jalan. "Kalau salah skala, tamu bisa nyasar ke pantai lain."</p>
            <div className="sampleButtons"><span className="samplePrimary">Mulai belajar</span><span className="sampleSky">Coba lab</span><span className="sampleOutline">Lihat peta</span></div>
            <div className="sampleBadges"><span className="badgeSky">Laut</span><span className="badgeWarm">Toska</span><span className="badgeSand">Es</span></div>
            <div className="sampleChart"><span style={{height: '52%'}}/><span style={{height: '78%'}}/><span style={{height: '38%'}}/><span style={{height: '64%'}}/></div>
          </div>
          <div className="sampleCard" style={{background: 'linear-gradient(180deg,#EAF5FA,#FFFFFF)'}}>
            <h3>Langit di atas, putih di bawah.</h3>
            <p>Header memakai langit pucat. Isi memakai putih. Laut dan toska muncul di tombol serta data, bukan di seluruh halaman.</p>
            <div className="paletteNote" style={{background: '#FFFFFF'}}>Putih membuat halaman terasa lapang. Biru dan toska memberi kedalaman tanpa menghangatkan layar.</div>
          </div>
        </div>
      </section>

      <section className="paletteSection">
        <h2>Tipografi</h2>
        <p>Satu skala untuk seluruh halaman. Ukuran, ketebalan, dan jarak baris diambil dari <code>design/tokens.json</code>, bukan ditulis per komponen.</p>
        <div className="typeScale">
          {typeScale.map(([key, value]) => <div className="typeRow" key={key}>
            <div className="typeMeta">
              <strong>{typeLabels[key] ?? key}</strong>
              <code>{value.size} · {value.weight} · {value.lineHeight}</code>
            </div>
            <p className="typeSample" style={{fontSize: value.size, fontWeight: value.weight, lineHeight: value.lineHeight, letterSpacing: value.tracking, textTransform: key === 'label' ? 'uppercase' : undefined}}>
              {key === 'hero' || key === 'page' || key === 'section' ? 'Bilangan bulat.' : 'Bilangan bulat dipakai untuk mencatat suhu di bawah nol.'}
            </p>
          </div>)}
        </div>
      </section>

      <section className="paletteSection">
        <h2>Token CSS</h2>
        <p>Gunakan variabel ini di komponen baru. Jangan menulis hex langsung kecuali untuk ilustrasi.</p>
        <div className="paletteCode">
          {coreColors.map(color => <code key={color.key}>{`--c-${color.key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${color.value}`}</code>)}
        </div>
      </section>
    </div></main>
  </Layout>;
}
