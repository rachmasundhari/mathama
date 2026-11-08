import React from 'react';

type NumberLineFigureProps = {
  min?: number;
  max?: number;
  points?: number[];
  ariaLabel?: string;
};

export default function NumberLineFigure({min = -6, max = 4, points = [], ariaLabel}: NumberLineFigureProps) {
  const values = Array.from({length: max - min + 1}, (_, index) => min + index);
  const pointX = (value: number) => 60 + (value - min) * (480 / (max - min));
  const label = ariaLabel ?? `Garis bilangan dari ${min} sampai ${max}`;
  return <figure className="numberLineFigure">
    <svg viewBox="0 0 600 140" role="img" aria-label={label}>
      <line x1={pointX(0)} y1="10" x2={pointX(0)} y2="98" stroke="var(--c-muted)" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.45"/>
      <line x1="40" y1="80" x2="560" y2="80" stroke="var(--c-ink)" strokeWidth="3"/>
      <path d="M40 80l12-7v14z" fill="var(--c-ink)"/>
      <path d="M560 80l-12-7v14z" fill="var(--c-ink)"/>
      {values.map(value => {
        const x = pointX(value);
        return <g key={value}>
          <line x1={x} y1="73" x2={x} y2="87" stroke="var(--c-ink)" strokeWidth="1.8"/>
          <text x={x} y="108" textAnchor="middle" fontSize="14" fontWeight={value === 0 ? '700' : '400'} fill={value === 0 ? 'var(--c-ocean)' : 'var(--c-muted)'}>{value}</text>
        </g>;
      })}
      {points.map(value => <circle key={`point-${value}`} cx={pointX(value)} cy="80" r="7" fill="var(--c-teal)" stroke="var(--c-white)" strokeWidth="2"/>)}
      <text x="60" y="28" fontSize="13" fill="var(--c-muted)">bilangan negatif</text>
      <text x="540" y="28" textAnchor="end" fontSize="13" fill="var(--c-muted)">bilangan positif</text>
    </svg>
  </figure>;
}
