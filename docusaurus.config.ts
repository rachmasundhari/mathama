import type {Config} from '@docusaurus/types';
import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Mathama: Matematika Kelas 7',
  tagline: 'Pelajari konsepnya, coba sendiri, lalu jadi paham.',
  favicon: 'img/mathama-favicon.svg',
  url: 'https://rachmasundhari.github.io',
  baseUrl: '/mathama/',
  organizationName: 'rachmasundhari',
  projectName: 'mathama',
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'id', locales: ['id']},
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'learn',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: false,
          editUrl: undefined,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      },
    ],
  ],
  stylesheets: [
    {href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css', type: 'text/css'},
  ],
  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false},
    navbar: {
      title: 'mathama.',
      logo: {alt: 'Mathama', src: 'img/mathama-mark.svg'},
      hideOnScroll: false,
      items: [
        {to: '/courses', label: 'Jelajahi materi', position: 'left'},
        {to: '/learn/', label: 'Buku belajar', position: 'left'},
        {to: '/practice', label: 'Latihan soal', position: 'left'},
        {
          to: '/learn/grade-7/integers/number-line',
          label: 'Mulai belajar ↗',
          position: 'right',
          className: 'navbar__cta',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {title: 'Belajar', items: [
          {label: 'Katalog materi', to: '/courses'},
          {label: 'Bilangan bulat', to: '/learn/grade-7/integers/number-line'},
          {label: 'Latihan', to: '/practice'},
        ]},
        {title: 'Tentang', items: [
          {label: 'Panduan', to: '/learn/'},
          {label: 'Tokoh & cerita', to: '/about'},
          {label: 'Palet warna', to: '/palette'},
          {label: 'Tentang proyek', to: '/about'},
        ]},
      ],
      copyright: `© ${new Date().getFullYear()} Mathama. Matematika yang bisa dicoba.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  },
};

export default config;
