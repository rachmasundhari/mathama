import React, {useState} from 'react';

const price = 3000;

export default function RatioLab() {
  const [mode, setMode] = useState<'senilai' | 'berbalik'>('senilai');
  const [amount, setAmount] = useState(4);
  const totalWork = 24;
  const days = totalWork / amount;

  if (mode === 'berbalik') {
    return <section className="labCard" aria-label="Perbandingan berbalik nilai">
      <div className="labHeader"><div><span className="eyebrow teal">PERBANDINGAN BERBALIK NILAI</span><h3>Menambah pekerja, mengurangi waktu</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
      <p className="labIntro">Sebuah dinding butuh 24 hari-orang untuk diselesaikan. Atur jumlah pekerja dan lihat waktu yang dibutuhkan.</p>
      <div className="opTabs" role="group" aria-label="Jenis perbandingan">
        <button type="button" className="opTab" onClick={() => setMode('senilai')}>Senilai</button>
        <button type="button" className="opTab active" aria-pressed="true" onClick={() => setMode('berbalik')}>Berbalik nilai</button>
      </div>
      <div className="sliderRow"><label htmlFor="ratio-workers">Banyak pekerja</label><strong className="valueChip">{amount} orang</strong></div>
      <input id="ratio-workers" className="rangeInput" type="range" min="1" max="8" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
      <div className="workerScene" aria-hidden="true">
        {Array.from({length: amount}, (_, index) => <span key={index}>=w</span>)}
      </div>
      <div className="equationSummary"><span>{amount} pekerja × {days.toFixed(1).replace('.', ',')} hari</span><span className="equals">=</span><strong>24 hari-orang</strong></div>
      <p className="microNote">💡 Saat pekerja bertambah, waktu berkurang. Hasil kali kedua besaran tetap: <strong>{amount} × {days.toFixed(1).replace('.', ',')} = 24</strong>.</p>
    </section>;
  }

  return <section className="labCard" aria-label="Perbandingan senilai">
    <div className="labHeader"><div><span className="eyebrow teal">PERBANDINGAN SENILAI</span><h3>Semakin banyak buku, bagaimana harganya?</h3></div><span className="livePill"><span className="liveDot"/> Interaktif</span></div>
    <p className="labIntro">Harga satu buku tulis Rp3.000. Atur jumlah bukunya dan amati total harganya.</p>
    <div className="opTabs" role="group" aria-label="Jenis perbandingan">
      <button type="button" className="opTab active" aria-pressed="true" onClick={() => setMode('senilai')}>Senilai</button>
      <button type="button" className="opTab" onClick={() => setMode('berbalik')}>Berbalik nilai</button>
    </div>
    <div className="sliderRow"><label htmlFor="ratio-books">Banyak buku</label><strong className="valueChip">{amount} buku</strong></div>
    <input id="ratio-books" className="rangeInput" type="range" min="1" max="8" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
    <div className="rangeMarks"><span>1 buku</span><span>8 buku</span></div>
    <div className="bookShelf">{Array.from({length: amount}, (_, index) => <div className="bookIcon" key={index}><div className="bookInner">N<span>{index + 1}</span></div></div>)}</div>
    <div className="equationSummary"><span>{amount} × Rp3.000</span><span className="equals">=</span><strong>Rp{(amount * price).toLocaleString('id-ID')}</strong></div>
    <p className="microNote">💡 Ketika jumlah buku menjadi dua kali lipat, total harga juga menjadi dua kali lipat. Itulah <strong>perbandingan senilai</strong>.</p>
  </section>;
}
