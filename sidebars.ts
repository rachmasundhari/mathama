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
          label: 'Bab 1 · Bilangan Bulat',
          collapsed: true,
          items: [
            'grade-7/integers/number-line',
            'grade-7/integers/operations',
            'grade-7/integers/factors',
          ],
        },
        {
          type: 'category',
          label: 'Bab 2 · Bilangan Rasional',
          collapsed: true,
          items: [
            'grade-7/rational/between',
            'grade-7/rational/compare',
            'grade-7/rational/operations',
          ],
        },
        {
          type: 'category',
          label: 'Bab 3 · Rasio',
          collapsed: true,
          items: [
            'grade-7/ratios/ratios',
            'grade-7/ratios/scale',
            'grade-7/ratios/rates',
          ],
        },
        {
          type: 'category',
          label: 'Bab 4 · Bentuk Aljabar',
          collapsed: true,
          items: [
            'grade-7/algebra/variables',
            'grade-7/algebra/like-terms',
            'grade-7/algebra/distributive',
            'grade-7/algebra/modeling',
          ],
        },
        {
          type: 'category',
          label: 'Bab 5 · Kesebangunan',
          collapsed: true,
          items: [
            'grade-7/similarity/angles',
            'grade-7/similarity/meaning',
            'grade-7/similarity/triangles',
          ],
        },
        {
          type: 'category',
          label: 'Bab 6 · Data dan Diagram',
          collapsed: true,
          items: [
            'grade-7/data/investigation',
            'grade-7/data/types',
            'grade-7/data/diagrams',
          ],
        },
      ],
    },
    {type: 'category', label: 'Kelas 8', items: ['grade-8/overview']},
    {type: 'category', label: 'Kelas 9', items: ['grade-9/overview']},
  ],
};
export default sidebars;
