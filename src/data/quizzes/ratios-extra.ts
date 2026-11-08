import type {Quiz} from '../questions';

export const ratioExtraQuizzes: Record<string, Quiz> = {
  'ratio-proportion': {
    title: 'Rasio Senilai dan Proporsi',
    description: 'Menyederhanakan rasio, menyelesaikan proporsi, dan memakai perbandingan senilai.',
    questions: [
      {
        id: 'rp-01',
        kind: 'multiple-choice',
        topic: 'Rasio Senilai',
        prompt: 'Bentuk paling sederhana dari $18 : 12$ adalah ...',
        options: [
          {id: 'a', label: '9 : 6'},
          {id: 'b', label: '3 : 2'},
          {id: 'c', label: '2 : 3'},
          {id: 'd', label: '6 : 4'},
        ],
        answer: 'b',
        hint: 'Bagi kedua bilangan dengan faktor persekutuan terbesarnya, yaitu 6.',
        explanation: '$18 \\div 6 = 3$ dan $12 \\div 6 = 2$, jadi bentuk paling sederhananya $3 : 2$.',
      },
      {
        id: 'rp-02',
        kind: 'number',
        topic: 'Resep',
        prompt: 'Resep minuman memakai 2 gelas sirop untuk 3 gelas air. Jika memakai 18 gelas air, berapa gelas sirop yang dibutuhkan? (tulis angkanya saja)',
        answer: 12,
        hint: 'Rasio sirop dan air harus tetap $2 : 3$. Air menjadi 6 kali lipat.',
        explanation: '$18 \\div 3 = 6$, jadi sirop $2 \\times 6 = 12$ gelas. Periksa: $12 : 18 = 2 : 3$.',
      },
      {
        id: 'rp-03',
        kind: 'number',
        topic: 'Proporsi',
        prompt: 'Jika $\\frac{3}{5} = \\frac{x}{20}$, berapa nilai $x$?',
        answer: 12,
        hint: 'Kalikan silang: $3 \\times 20 = 5 \\times x$.',
        explanation: '$3 \\times 20 = 60$, sehingga $5x = 60$ dan $x = 12$.',
      },
      {
        id: 'rp-04',
        kind: 'number',
        topic: 'Perbandingan Senilai',
        prompt: 'Harga 4 buku tulis adalah Rp12.000. Berapa harga 7 buku tulis dengan harga satuan yang sama? (tulis angkanya saja)',
        answer: 21000,
        hint: 'Cari harga satu buku lebih dulu, lalu kalikan 7.',
        explanation: 'Harga satu buku $12.000 \\div 4 = 3.000$. Harga 7 buku $7 \\times 3.000 = 21.000$.',
      },
      {
        id: 'rp-05',
        kind: 'number',
        topic: 'Denah',
        prompt: 'Pada denah, 5 cm mewakili 8 m. Jika lebar aula digambar 10 cm, berapa meter lebar sebenarnya? (tulis angkanya saja)',
        answer: 16,
        hint: 'Panjang gambar menjadi dua kali lipat, maka ukuran sebenarnya juga dua kali lipat.',
        explanation: '$10 \\div 5 = 2$, jadi lebar sebenarnya $8 \\times 2 = 16$ m. Periksa: $5 : 8 = 10 : 16$.',
      },
    ],
  },
};
