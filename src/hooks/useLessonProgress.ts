import {useCallback, useEffect, useState} from 'react';

const STORAGE_KEY = 'mathama:completed-lessons:v1';
const SCORE_KEY = 'mathama:quiz-scores:v1';

export function useLessonProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setCompleted(saved.filter((id) => typeof id === 'string'));
    } catch { /* Browser storage can be disabled. */ }
    setLoaded(true);
  }, []);

  const markCompleted = useCallback((lessonId: string) => {
    setCompleted((previous) => {
      const next = previous.includes(lessonId) ? previous : [...previous, lessonId];
      try {window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));} catch { /* optional */ }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCompleted([]);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* optional */ }
  }, []);

  return {completed, loaded, markCompleted, resetProgress};
}

export function saveBestScore(quizId: string, score: number, total: number) {
  try {
    const scores = JSON.parse(window.localStorage.getItem(SCORE_KEY) || '{}');
    const percentage = Math.round((score / total) * 100);
    scores[quizId] = Math.max(Number(scores[quizId] || 0), percentage);
    window.localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
  } catch { /* Browser storage is optional. */ }
}
