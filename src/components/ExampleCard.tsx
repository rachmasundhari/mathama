import React, {type ReactNode} from 'react';
import {Pencil} from 'lucide-react';

type ExampleCardProps = {
  label: string;
  children?: ReactNode;
};

export default function ExampleCard({label, children}: ExampleCardProps) {
  return (
    <section className="exampleCard" aria-label={label}>
      <span className="cardChip">
        <Pencil size={12} aria-hidden="true" /> {label}
      </span>
      {children}
    </section>
  );
}
