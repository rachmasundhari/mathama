import type {Quiz} from '../questions';

export const dataExtraQuizzes: Record<string, Quiz> = {
  'data-interpretation': {
    title: 'Membaca Data dan Diagram',
    description: 'Membandingkan tabel, diagram batang, dan diagram lingkaran untuk menarik kesimpulan.',
    questions: [
      {
        id: 'di-01',
        kind: 'number',
        topic: 'Total Data',
        prompt: 'Hasil survei: Robotik 12 siswa, Coding 10 siswa, Pertunjukan sains 10 siswa, Kuis matematika 8 siswa. Berapa total siswa yang menjawab? (tulis angkanya saja)',
        answer: 40,
        hint: 'Jumlahkan keempat banyak pilihan.',
        explanation: '$12 + 10 + 10 + 8 = 40$ siswa.',
      },
      {
        id: 'di-02',
        kind: 'number',
        topic: 'Persentase',
        prompt: 'Dari 40 siswa, 12 siswa memilih Robotik. Berapa persen siswa yang memilih Robotik? (tulis angkanya saja)',
        answer: 30,
        hint: 'Bagi 12 dengan 40, lalu kalikan 100%.',
        explanation: '$12 \\div 40 = 0{,}3 = 30\\%$.',
      },
      {
        id: 'di-03',
        kind: 'number',
        topic: 'Sudut Lingkaran',
        prompt: 'Sebanyak 8 dari 40 siswa memilih Kuis matematika. Berapa derajat besar sudut sektor Kuis pada diagram lingkaran? (tulis angkanya saja)',
        answer: 72,
        hint: 'Cari persentasenya lebih dulu, lalu kalikan 360°.',
        explanation: '$8 \\div 40 = 20\\%$. Sudutnya $20\\% \\times 360^\\circ = 72^\\circ$.',
      },
      {
        id: 'di-04',
        kind: 'multiple-choice',
        topic: 'Membandingkan',
        prompt: 'Berdasarkan data Robotik 12, Coding 10, Pertunjukan sains 10, dan Kuis 8, kegiatan yang paling banyak dipilih adalah ...',
        options: [
          {id: 'a', label: 'Robotik'},
          {id: 'b', label: 'Coding'},
          {id: 'c', label: 'Pertunjukan sains'},
          {id: 'd', label: 'Kuis matematika'},
        ],
        answer: 'a',
        hint: 'Bandingkan angka pada tabel, bukan lebar potongan yang digambar tangan.',
        explanation: 'Robotik dipilih 12 siswa, paling banyak di antara keempat kegiatan.',
      },
      {
        id: 'di-05',
        kind: 'multiple-choice',
        topic: 'Menarik Kesimpulan',
        prompt: 'Kesimpulan mana yang benar menurut data Robotik 12, Coding 10, Pertunjukan sains 10, dan Kuis 8?',
        options: [
          {id: 'a', label: 'Robotik dipilih dua kali lebih banyak daripada Coding.'},
          {id: 'b', label: 'Coding dan Pertunjukan sains dipilih sama banyak.'},
          {id: 'c', label: 'Kuis matematika paling banyak dipilih.'},
          {id: 'd', label: 'Keempat kegiatan dipilih sama banyak.'},
        ],
        answer: 'b',
        hint: 'Bandingkan angka pada setiap kategori, bukan tinggi batang pada diagram yang sumbunya dipotong.',
        explanation: 'Coding dan Pertunjukan sains masing-masing dipilih 10 siswa. Robotik 12, bukan dua kali 10.',
      },
    ],
  },
};
