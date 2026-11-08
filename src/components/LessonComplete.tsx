import React from 'react';
import {useLessonProgress} from '../hooks/useLessonProgress';

export default function LessonComplete({lessonId}: {lessonId: string}) {
  const {completed, loaded, markCompleted} = useLessonProgress();
  const done = completed.includes(lessonId);
  return <div className="lessonComplete">
    <div><strong>Sudah paham dengan materi ini?</strong><p>Tandai selesai untuk menyimpan progres belajar pada perangkat ini.</p></div>
    <button className={done ? 'button successButton' : 'button primaryButton'} type="button" disabled={!loaded || done} onClick={() => markCompleted(lessonId)}>
      {done ? '✓ Sudah diselesaikan' : '✓ Tandai selesai'}
    </button>
  </div>;
}
