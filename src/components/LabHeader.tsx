import React from 'react';
import {FlaskConical} from 'lucide-react';

type LabHeaderProps = {
  title: React.ReactNode;
  status?: React.ReactNode;
};

export default function LabHeader({title, status}: LabHeaderProps) {
  return (
    <div className="labHeader">
      <div>
        <span className="cardChip">
          <FlaskConical size={12} aria-hidden="true" /> Lab Interaktif
        </span>
        <h3>{title}</h3>
      </div>
      {status ? <div className="labHeaderStatus">{status}</div> : null}
    </div>
  );
}
