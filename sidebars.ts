import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {type: 'doc', id: 'intro', label: 'Mulai dari sini'},
    {
      type: 'category',
      label: 'Kelas 7',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Bab 1 · Bilangan dan Operasinya',
          collapsed: true,
          items: [
            'grade-7/integers/number-line',
            'grade-7/integers/operations',
            'grade-7/integers/factors',
            'grade-7/rational/between',
            'grade-7/rational/compare',
            'grade-7/rational/operations',
            'grade-7/numbers/powers',
            'grade-7/numbers/mixed-operations',
            {type: 'doc', id: 'grade-7/integers/cerita', label: 'Cerita Bab 1'},
          ],
        },
        {
          type: 'category',
          label: 'Bab 2 · Perbandingan, Rasio, Proporsi, dan Skala',
          collapsed: true,
          items: [
            'grade-7/ratios/ratios',
            'grade-7/ratios/scale',
            'grade-7/ratios/proportion',
            'grade-7/ratios/rates',
          ],
        },
        {
          type: 'category',
          label: 'Bab 3 · Aritmetika Sosial',
          collapsed: true,
          items: [
            'grade-7/social/percent',
            'grade-7/social/profit-loss',
            'grade-7/social/discount-tax',
            'grade-7/social/net-weight-interest',
          ],
        },
        {
          type: 'category',
          label: 'Bab 4 · Pola dan Bentuk Aljabar',
          collapsed: true,
          items: [
            'grade-7/algebra/variables',
            'grade-7/algebra/like-terms',
            'grade-7/algebra/distributive',
            'grade-7/algebra/modeling',
            'grade-7/algebra/patterns',
            'grade-7/algebra/multiply-divide',
          ],
        },
        {
          type: 'category',
          label: 'Bab 5 · Persamaan dan Pertidaksamaan Linear Satu Variabel',
          collapsed: true,
          items: [
            'grade-7/equations/meaning',
            'grade-7/equations/add-subtract',
            'grade-7/equations/multiply-divide',
            'grade-7/equations/inequality',
          ],
        },
        {
          type: 'category',
          label: 'Bab 6 · Garis dan Sudut',
          collapsed: true,
          items: [
            'grade-7/geometry/lines',
            'grade-7/geometry/angle-types',
            'grade-7/geometry/angle-pairs',
            'grade-7/geometry/parallel-transversal',
          ],
        },
        {
          type: 'category',
          label: 'Bab 7 · Segitiga dan Segiempat',
          collapsed: true,
          items: [
            'grade-7/shapes/triangles',
            'grade-7/shapes/quadrilaterals',
            'grade-7/shapes/area-perimeter',
            'grade-7/shapes/combined-area',
          ],
        },
        {
          type: 'category',
          label: 'Bab 8 · Himpunan',
          collapsed: true,
          items: [
            'grade-7/sets/concept',
            'grade-7/sets/subsets',
            'grade-7/sets/venn',
            'grade-7/sets/operations',
          ],
        },
        {
          type: 'category',
          label: 'Bab 9 · Pengumpulan, Penyajian, dan Interpretasi Data',
          collapsed: true,
          items: [
            'grade-7/data/investigation',
            'grade-7/data/types',
            'grade-7/data/diagrams',
            'grade-7/data/interpretation',
          ],
        },
        {
          type: 'category',
          label: 'Pengayaan · Kesebangunan',
          collapsed: true,
          items: [
            'grade-7/similarity/angles',
            'grade-7/similarity/meaning',
            'grade-7/similarity/triangles',
          ],
        },
      ],
    },
    {type: 'category', label: 'Kelas 8', items: ['grade-8/overview']},
    {type: 'category', label: 'Kelas 9', items: ['grade-9/overview']},
  ],
};
export default sidebars;
